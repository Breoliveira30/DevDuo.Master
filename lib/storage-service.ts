import type { Project } from "./types"

// Chave para armazenar os projetos no localStorage
const PROJECTS_STORAGE_KEY = "devduo-projects"

// Dados iniciais para quando não houver dados salvos
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Sistema de Agendamento Médico",
    description:
      "Plataforma completa para agendamento de consultas médicas com calendário interativo, notificações automáticas e gestão de pacientes",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["TypeScript", "React", "TailwindCSS", "Node.js"],
    color: "from-emerald-500 to-teal-500",
    demo: "#",
    category: "Sistema Web",
    features: ["TypeScript para tipagem segura", "CSS responsivo", "JavaScript para interatividade", "API RESTful"],
    progress: 100,
  },
  {
    id: "2",
    title: "WaterGuardian - Monitor de Consumo de Água IoT",
    description:
      "Sistema completo de monitoramento em tempo real do consumo de água com sensores IoT, dashboard interativo, alertas de vazamento e relatórios de economia desenvolvido com TypeScript, CSS e JavaScript",
    image: "/images/waterguardian-screenshot.png",
    tech: ["TypeScript", "CSS Modules", "JavaScript", "WebSockets", "Chart.js"],
    color: "from-blue-500 to-cyan-500",
    demo: "https://waterguardian.vercel.app/",
    category: "IoT & Monitoramento",
    features: ["Dashboard em tempo real", "Sensores IoT integrados", "Alertas inteligentes", "Relatórios de economia"],
    progress: 100,
  },
  {
    id: "3",
    title: "Landing Page Loja de Móveis",
    description:
      "Landing page moderna e elegante para loja de móveis com catálogo interativo, visualizador 3D e sistema de orçamentos",
    image: "/images/carvalho-moveis.png",
    tech: ["TypeScript", "TailwindCSS", "Next.js", "Framer Motion"],
    color: "from-amber-500 to-orange-500",
    demo: "https://lading-page-moveis.vercel.app/",
    category: "E-commerce",
    features: [
      "TypeScript para componentes",
      "CSS com animações",
      "JavaScript para interatividade",
      "Renderização otimizada",
    ],
    progress: 100,
  },
]

// Função para obter todos os projetos
export function getProjects(): Project[] {
  // Verificar se estamos no navegador
  if (typeof window === "undefined") {
    return initialProjects
  }

  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY)
    if (storedProjects) {
      return JSON.parse(storedProjects)
    }
    // Se não houver projetos salvos, salvar os iniciais
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(initialProjects))
    return initialProjects
  } catch (error) {
    console.error("Erro ao obter projetos do localStorage:", error)
    return initialProjects
  }
}

// Função para obter um projeto específico
export function getProject(id: string): Project | undefined {
  const projects = getProjects()
  return projects.find((project) => project.id === id)
}

// Função para adicionar um novo projeto
export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects()

  // Criar um novo projeto com ID único
  const newProject: Project = {
    ...project,
    id: Date.now().toString(), // Usar timestamp como ID único
  }

  // Adicionar ao início da lista
  const updatedProjects = [newProject, ...projects]

  // Salvar no localStorage
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects))

  return newProject
}

// Função para atualizar um projeto existente
export function updateProject(project: Project): Project {
  const projects = getProjects()

  // Encontrar e atualizar o projeto
  const updatedProjects = projects.map((p) => (p.id === project.id ? project : p))

  // Salvar no localStorage
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects))

  return project
}

// Função para excluir um projeto
export function deleteProject(id: string): boolean {
  const projects = getProjects()

  // Filtrar o projeto a ser excluído
  const updatedProjects = projects.filter((project) => project.id !== id)

  // Se o número de projetos não mudou, o projeto não foi encontrado
  if (updatedProjects.length === projects.length) {
    return false
  }

  // Salvar no localStorage
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects))

  return true
}

// Função para reiniciar os dados para o estado inicial
export function resetProjects(): void {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(initialProjects))
}
