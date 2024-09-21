import { NextResponse } from 'next/server';
import { summarizeReadme } from './chain';
import { validateApiKey, incrementApiKeyUsage } from '../../lib/apiKeyUtils';
import { getRepoInfo } from '../../lib/githubUtils';

export async function POST(req) {
  const { githubUrl } = await req.json();
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ message: 'API key is required' }, { status: 400 });
  }

  try {
    const apiKeyData = await validateApiKey(apiKey);

    if (!apiKeyData) {
      return NextResponse.json({ message: 'Invalid API key' }, { status: 401 });
    }

    const { success, message } = await incrementApiKeyUsage(apiKeyData);

    if (!success) {
      return NextResponse.json({ message }, { status: 429 });
    }

    // Fetch repo info first
    const repoInfo = await getRepoInfo(githubUrl);

    // Then run summarization in parallel with other tasks
    const [summary] = await Promise.all([
      summarizeReadme(repoInfo.readmeContent),
      // Add any other parallel tasks here if needed
    ]);

    return NextResponse.json({
      ...summary,
      stars: repoInfo.stars,
      latestVersion: repoInfo.latestVersion,
      websiteUrl: repoInfo.websiteUrl,
      licenseType: repoInfo.licenseType,
    }, { status: 200 });
  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}


