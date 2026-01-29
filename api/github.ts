import type { VercelRequest, VercelResponse } from "@vercel/node"

const PRODUCTION = 'PRODUCTION'
const DEVELOPMENT = 'DEVELOPMENT'

const GITHUB_API = "https://api.github.com"

const GITHUB_ORG = process.env.GITHUB_ORG
const GITHUB_USER = process.env.GITHUB_USER
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  Authorization: `Bearer ${GITHUB_TOKEN}`,
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  topics?: string[]
}

interface PortfolioRepo {
  name: string
  repoUrl: string
  inProduction: boolean
}

interface PortfolioProject {
  projectKey: string
  name: string
  description: string
  repos: PortfolioRepo[]
  status: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Erro ao acessar GitHub API")
  }

  return res.json()
}

function getProjectTopic(topics: string[] = []): string | null {
  const topic = topics.find(t => t.startsWith("project-"))
  return topic ? topic.replace("project-", "") : null
}

function extractFirstParagraph(markdown: string): string {
  const lines = markdown
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  return lines.find(l => !l.startsWith("#")) ?? ""
}

async function getRepoDescriptionFromReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const res = await fetchJson<{ content: string }>(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`
    )

    const decoded = Buffer.from(res.content, "base64").toString("utf-8")
    return extractFirstParagraph(decoded) || null
  } catch {
    return null
  }
}

function isFrontendRepo(name: string): boolean {
  return name.toLowerCase().startsWith("frontend-")
}

async function fetchRepos(): Promise<GithubRepo[]> {
  if (GITHUB_ORG) {
    return fetchJson(
      `${GITHUB_API}/orgs/${GITHUB_ORG}/repos?per_page=100`
    )
  }

  if (GITHUB_USER) {
    return fetchJson(
      `${GITHUB_API}/users/${GITHUB_USER}/repos?per_page=100`
    )
  }

  throw new Error("GITHUB_ORG ou GITHUB_USER não definido")
}

async function hasDeploy(owner: string, repo: string): Promise<boolean> {
  try {
    const deployments = await fetchJson<any[]>(
      `${GITHUB_API}/repos/${owner}/${repo}/deployments?per_page=1`
    )
    return deployments.length > 0
  } catch {
    return false
  }
}

export default async function handler(
  _: VercelRequest,
  res: VercelResponse
) {
  try {
    const repos = await fetchRepos()
    const owner = GITHUB_ORG || GITHUB_USER!
    const projectMap = new Map<string, PortfolioProject>()
    const grouped = new Map<string, GithubRepo[]>()

    for (const repo of repos) {
      const key = getProjectTopic(repo.topics)
      if (!key) continue

      if (!grouped.has(key)) grouped.set(key, [])
      grouped.get(key)!.push(repo)
    }

    for (const [key, repos] of grouped) {
      const reposWithDeploy = await Promise.all(
        repos.map(async r => ({
          name: r.name,
          repoUrl: r.html_url,
          inProduction: await hasDeploy(owner, r.name),
        }))
      )

      const status = reposWithDeploy.some(r => r.inProduction)
        ? PRODUCTION
        : DEVELOPMENT

      const frontend =
        repos.find(r => isFrontendRepo(r.name)) ?? repos[0]

      const description =
        (await getRepoDescriptionFromReadme(owner, frontend.name)) ??
        frontend.description ??
        "Projeto pessoal"

      projectMap.set(key, {
        projectKey: key,
        name: key.replace(/-/g, " "),
        description,
        repos: reposWithDeploy,
        status,
      })
    }

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    )

    res.status(200).json([...projectMap.values()])
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
