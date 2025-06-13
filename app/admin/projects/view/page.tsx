"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useProjects } from "@/lib/project-context"
import { useAuth } from "@/components/admin/auth-context"
import { AuthGuard } from "@/components/admin/auth-guard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, ExternalLink, Edit, Trash2 } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"

export default function ViewProjects() {
  const { projects, deleteProject } = useProjects()
  const { logout } = useAuth()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Configuração do carrossel simples com autoplay contínuo
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      AutoPlay({
        delay: 3000, // 3 segundos para dar tempo de visualizar cada projeto
        stopOnInteraction: false,
        stopOnMouseEnter: true, // Para quando o mouse estiver sobre o carrossel
        stopOnFocusIn: false,
        playOnInit: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ],
  )

  // Estado para controlar a posição dos slides
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)

    // Garantir que o autoplay continue funcionando
    const autoplay = emblaApi.plugins().autoplay
    if (autoplay) {
      autoplay.play()
    }

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const handleDeleteClick = (id: string) => {
    setConfirmDelete(id)
  }

  const handleConfirmDelete = async (id: string) => {
    try {
      await deleteProject(id)
      setConfirmDelete(null)
    } catch (error) {
      console.error("Erro ao deletar projeto:", error)
    }
  }

  const handleCancelDelete = () => {
    setConfirmDelete(null)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-white hover:text-yellow-400 transition-colors" />
              </Link>
              <h1 className="text-2xl font-bold text-white">Visualizar Projetos</h1>
            </div>
            <Button variant="ghost" onClick={logout} className="text-white hover:text-yellow-400">
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nossos Projetos
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                REVOLUCIONÁRIOS! 🚀
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Explore todos os projetos criados pela equipe DevDuo</p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Nenhum projeto encontrado</h3>
                <p className="text-gray-300 mb-6">Comece criando seu primeiro projeto!</p>
                <Button asChild className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                  <Link href="/admin/projects/new">Criar Primeiro Projeto</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-7xl mx-auto">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="flex-none w-full md:w-1/2 lg:w-1/3"
                      onMouseEnter={() => setSelectedProject(project.id)}
                      onMouseLeave={() => setSelectedProject(null)}
                    >
                      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-full">
                        {/* Efeito de brilho animado */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-40 transition-all duration-500`}
                        ></div>

                        {/* Badge de categoria */}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg`}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Indicador de status */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                            <span className="text-xs text-green-400 font-medium">ATIVO</span>
                          </div>
                        </div>

                        {/* Imagem do projeto */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            width={600}
                            height={400}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />

                          {/* Overlay com efeitos especiais */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${
                              selectedProject === project.id ? "opacity-100" : "opacity-60"
                            }`}
                          ></div>

                          {/* Botões de ação */}
                          <div
                            className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${
                              selectedProject === project.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                            }`}
                          >
                            {project.demo !== "#" ? (
                              <Button
                                size="sm"
                                asChild
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                              >
                                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            ) : null}

                            <Button
                              size="sm"
                              asChild
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                            >
                              <Link href={`/admin/projects/${project.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>

                            {confirmDelete === project.id ? (
                              <div className="flex gap-1">
                                <Button size="sm" variant="destructive" onClick={() => handleConfirmDelete(project.id)}>
                                  Sim
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelDelete}
                                  className="text-white border-white/20"
                                >
                                  Não
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(project.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Conteúdo do card */}
                        <div className="p-6 space-y-4 relative z-10">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
                              {project.description}
                            </p>
                          </div>

                          {/* Features destacadas */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                              Principais Features:
                            </h4>
                            <div className="grid grid-cols-1 gap-1">
                              {project.features.slice(0, 3).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                  <span className="text-xs text-gray-300">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tags de tecnologia */}
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Barra de progresso */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Progresso</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`bg-gradient-to-r ${project.color} h-1.5 rounded-full transition-all duration-1000`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores de posição */}
              <div className="flex justify-center gap-2 mt-6">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? "bg-yellow-400 w-6" : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Informações do carrossel */}
              <div className="text-center mt-4">
                <p className="text-gray-300 text-sm">
                  Projeto {selectedIndex + 1} de {projects.length} • Rolagem automática ativa
                </p>
              </div>
            </div>
          )}

          {/* Botão para adicionar novo projeto */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl font-bold"
            >
              <Link href="/admin/projects/new">
                <Star className="mr-2 h-5 w-5" />
                Adicionar Novo Projeto
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
