interface RepoInfo {
  readmeContent: string;
  stars: number;
  latestVersion: string;
  websiteUrl: string | null;
  licenseType: string | null;
}

export async function getRepoInfo(githubUrl: string): Promise<RepoInfo> {
  const [owner, repo] = githubUrl.split('/').slice(3, 5);
  const apiBaseUrl = `https://api.github.com/repos/${owner}/${repo}`;

  const [readmeResponse, repoInfoResponse, releasesResponse] = await Promise.all([
    fetch(`${apiBaseUrl}/readme`, {
      headers: { 'Accept': 'application/vnd.github.v3.raw' },
    }),
    fetch(apiBaseUrl),
    fetch(`${apiBaseUrl}/releases/latest`),
  ]);

  if (!readmeResponse.ok || !repoInfoResponse.ok) {
    throw new Error(`Failed to fetch repository information: ${readmeResponse.statusText || repoInfoResponse.statusText}`);
  }

  const [readmeContent, repoInfo, latestRelease] = await Promise.all([
    readmeResponse.text(),
    repoInfoResponse.json(),
    releasesResponse.ok ? releasesResponse.json() : null,
  ]);

  return {
    readmeContent,
    stars: repoInfo.stargazers_count,
    latestVersion: latestRelease ? latestRelease.tag_name : 'No releases found',
    websiteUrl: repoInfo.homepage || null,
    licenseType: repoInfo.license ? repoInfo.license.spdx_id : null,
  };
}