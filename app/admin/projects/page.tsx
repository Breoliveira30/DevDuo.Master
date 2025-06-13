"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProjects } from "@/lib/project-context"
import { useAuth } from "@/components/admin/auth-context"
import { AuthGuard } from "@/components/admin/auth-guard"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ArrowLeft, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminProjects() {
  const { projects, deleteProject } = useProjects()
  const { logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const router = useRouter()

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (id: string) => {
    setConfirmDelete(id)
  }

  const handleConfirmDelete = (id: string) => {
    deleteProject(id)
    setConfirmDelete(null)
  }

  const handleCancelDelete = () => {
    setConfirmDelete(null)
  }

  const handleNewProject = () => {
    router.push("/admin/projects/new")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Projetos</h1>
            </div>
            <Button variant="ghost" onClick={logout}>
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Buscar projetos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleNewProject}>
              <Plus className="h-5 w-5 mr-2" /> Novo Projeto
            </Button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Projetos</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{filteredProjects.length} projetos encontrados</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Filter className="h-4 w-4 mr-1" /> Filtrar
              </div>
            </div>
            <div className="border-t border-gray-200">
              {filteredProjects.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <li key={project.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-12 w-12 rounded-md bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold`}
                          >
                            {project.title.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{project.category}</span>
                              <span className="mx-2">•</span>
                              <span>{project.tech.slice(0, 2).join(", ")}</span>
                              {project.tech.length > 2 && <span className="ml-1">+{project.tech.length - 2}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {confirmDelete === project.id ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-red-600">Confirmar?</span>
                              <Button size="sm" variant="destructive" onClick={() => handleConfirmDelete(project.id)}>
                                Sim
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelDelete}>
                                Não
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/admin/projects/${project.id}`)}
                              >
                                <Pencil className="h-4 w-4 mr-1" /> Editar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDeleteClick(project.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Excluir
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum projeto encontrado. Crie um novo projeto!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
