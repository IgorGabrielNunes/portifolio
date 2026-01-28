import { DEVELOPMENT, PRODUCTION } from "../../helpers/constants"

const GITHUB_API = "https://api.github.com"

const GITHUB_ORG = import.meta.env.VITE_GITHUB_ORG
const GITHUB_USER = import.meta.env.VITE_GITHUB_USER

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  topics?: string[]
}

export interface PortfolioRepo {
  name: string
  repoUrl: string
  inProduction: boolean
}

export interface PortfolioProject {
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
    console.error("GitHub API error:", error)
    throw new Error(error.message || "Erro ao acessar GitHub API")
  }

  return res.json()
}

function getProjectTopic(topics: string[] = []): string | null {
  const projectTopic = topics.find(t => t.startsWith("project-"))
  return projectTopic ? projectTopic.replace("project-", "") : null
}

function extractFirstParagraph(markdown: string): string {
  const lines = markdown
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)

  for (const line of lines) {
    if (line.startsWith("#")) continue

    return line
  }

  return ""
}


async function getRepoDescriptionFromReadme(
  owner: string,
  repoName: string
): Promise<string | null> {
  try {
    const res = await fetchJson<{ content: string }>(
      `${GITHUB_API}/repos/${owner}/${repoName}/readme`
    )

    const decoded = atob(res.content.replace(/\n/g, ""))
    const firstParagraph = extractFirstParagraph(decoded)

    return firstParagraph || null
  } catch {
    return null
  }
}

function isFrontendRepo(repoName: string): boolean {
  return repoName.toLowerCase().startsWith("frontend-")
}

async function fetchReposAsOrg(): Promise<GithubRepo[]> {
  if (!GITHUB_ORG) throw new Error("ORG não definida")

  return fetchJson<GithubRepo[]>(
    `${GITHUB_API}/orgs/${GITHUB_ORG}/repos?per_page=100`
  )
}

async function fetchReposAsUser(): Promise<GithubRepo[]> {
  if (!GITHUB_USER) throw new Error("USER não definido")

  return fetchJson<GithubRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USER}/repos?per_page=100`
  )
}

async function getRepos(): Promise<GithubRepo[]> {
  if (GITHUB_ORG) return fetchReposAsOrg()
  if (GITHUB_USER) return fetchReposAsUser()

  throw new Error("Nenhuma ORG ou USER configurado")
}

async function hasDeploy(repoName: string): Promise<boolean> {
  const owner = GITHUB_ORG || GITHUB_USER
  if (!owner) return false

  try {
    const deployments = await fetchJson<any[]>(
      `${GITHUB_API}/repos/${owner}/${repoName}/deployments?per_page=1`
    )

    return deployments.length > 0
  } catch {
    return false
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const repos = await getRepos()
  const owner = GITHUB_ORG || GITHUB_USER!
  const projectMap = new Map<string, PortfolioProject>()
  const projectReposMap = new Map<string, GithubRepo[]>()

  for (const repo of repos) {
    const projectKey = getProjectTopic(repo.topics)
    if (!projectKey) continue

    if (!projectReposMap.has(projectKey)) {
      projectReposMap.set(projectKey, [])
    }

    projectReposMap.get(projectKey)!.push(repo)
  }

  for (const [projectKey, projectRepos] of projectReposMap) {
  const reposWithDeploy = await Promise.all(
    projectRepos.map(async (repo) => {
      const inProduction = await hasDeploy(repo.name)

      return {
        name: repo.name,
        repoUrl: repo.html_url,
        inProduction,
      }
    })
  )

  const status = reposWithDeploy.some(r => r.inProduction)
    ? PRODUCTION
    : DEVELOPMENT

  const frontendRepo =
    projectRepos.find(r => isFrontendRepo(r.name)) ?? projectRepos[0]

  const description =
    (await getRepoDescriptionFromReadme(owner, frontendRepo.name)) ??
    frontendRepo.description ??
    "Projeto pessoal"

  projectMap.set(projectKey, {
    projectKey,
    name: projectKey.replace(/-/g, " "),
    description,
    repos: reposWithDeploy,
    status,
  })
}

  return Array.from(projectMap.values())
}
