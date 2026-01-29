import { DEVELOPMENT, PRODUCTION } from "../../helpers/constants"


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
  status: typeof DEVELOPMENT | typeof PRODUCTION
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const res = await fetch("/api/github")

  if (!res.ok) {
    throw new Error("Erro ao buscar projetos da API")
  }

  const projects = await res.json() as PortfolioProject[]

  return projects
}