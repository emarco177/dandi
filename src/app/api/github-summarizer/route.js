import { NextResponse } from 'next/server';
import { summarizeReadme } from './chain';
import { validateApiKey, incrementApiKeyUsage } from '../../lib/apiKeyUtils';

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

    const readmeContent = await getReadmeContent(githubUrl);
    const summary = await summarizeReadme(readmeContent);

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

async function getReadmeContent(githubUrl) {
  const owner = githubUrl.split('/')[3];
  const repo = githubUrl.split('/')[4];
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.statusText}`);
  }

  return await response.text();
}


