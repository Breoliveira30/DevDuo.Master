"use client"

import Link from "next/link"
import { useProjects } from "@/lib/project-context"
import { useAuth } from "@/components/admin/auth-context"
import { AuthGuard } from "@/components/admin/auth-guard"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, LogOut, Plus, ArrowRight, Eye, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const { projects, loading, error } = useProjects()
  const { logout } = useAuth()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" /> Sair
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mensagem de erro se houver problemas com a API */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Erro de conexão</h3>
                <p className="text-sm text-red-600">{error}</p>
                <p className="text-sm text-red-600 mt-1">
                  Usando dados locais como fallback. Algumas alterações podem não ser salvas no banco de dados.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <FolderKanban className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Projetos</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {loading ? "Carregando..." : projects.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/admin/projects/view"
                    className="font-medium text-purple-600 hover:text-purple-500 flex items-center"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    Ver todos os projetos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <LayoutDashboard className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Gerenciar Projetos</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">Adicionar ou editar projetos</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/admin/projects/new"
                    className="font-medium text-pink-600 hover:text-pink-500 flex items-center"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar novo projeto
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Projetos Recentes</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Últimos projetos adicionados ou atualizados</p>
            </div>
            <div className="border-t border-gray-200">
              {loading ? (
                <div className="px-4 py-8 text-center text-gray-500">Carregando projetos...</div>
              ) : projects.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {projects.slice(0, 5).map((project) => (
                    <li key={project.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold`}
                          >
                            {project.title.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500">{project.category}</div>
                          </div>
                        </div>
                        <div>
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Editar
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  Nenhum projeto encontrado. Adicione seu primeiro projeto!
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
