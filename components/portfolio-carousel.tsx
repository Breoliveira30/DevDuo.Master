"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { useProjects } from "@/lib/project-context"
import useEmblaCarousel from "embla-carousel-react"
// Only import AutoPlay if we're going to use it
import AutoPlay from "embla-carousel-autoplay"

export function PortfolioCarousel() {
  const { projects, loading } = useProjects()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [autoplayActive, setAutoplayActive] = useState(false)

  // Create autoplay plugin instance only if we have multiple projects
  const autoplayPlugin =
    projects.length > 1
      ? AutoPlay({
          delay: 4000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          stopOnFocusIn: false,
          playOnInit: true,
          // Don't use rootNode option as it's causing issues
        })
      : undefined

  // Configuração do carrossel com slides de tamanho uniforme
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: projects.length > 1, // Só ativa loop se houver mais de 1 projeto
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    },
    // Only add AutoPlay plugin if we have more than one project
    projects.length > 1 ? [autoplayPlugin] : undefined,
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

    // Set autoplay status based on project count
    setAutoplayActive(projects.length > 1)

    // Basic carousel setup
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect, projects.length])

  const goToSlide = (index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }

  // Função para abrir o site do projeto
  const openProjectSite = (url: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <div className="text-white text-lg">Carregando projetos...</div>
        </div>
      </div>
    )
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="text-white text-xl mb-4">Nenhum projeto encontrado</div>
          <div className="text-gray-300">Os projetos serão carregados em breve...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
              onMouseEnter={() => setSelectedProject(project.id)}
              onMouseLeave={() => setSelectedProject(null)}
            >
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-full min-h-[600px] flex flex-col card-hover">
                {/* Efeito de brilho animado */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 transition-all duration-500`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Badge de categoria */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg animate-shimmer`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Indicador de status */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-2 glass rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">ATIVO</span>
                  </div>
                </div>

                {/* Imagem do projeto com overlay interativo */}
                <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    priority={index < 3} // Prioridade para os primeiros 3 cards
                  />

                  {/* Overlay com efeitos especiais */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${
                      selectedProject === project.id ? "opacity-100" : "opacity-60"
                    }`}
                  ></div>

                  {/* Botões de ação com animações - SEMPRE VISÍVEL */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 z-30">
                    {project.demo && project.demo !== "#" ? (
                      <button
                        onClick={(e) => openProjectSite(project.demo, e)}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg transform hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer z-50"
                        style={{ pointerEvents: "auto" }}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Visitar Site
                      </button>
                    ) : (
                      <button
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg cursor-not-allowed shadow-xl"
                        disabled
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Em Breve
                      </button>
                    )}
                  </div>

                  {/* Efeito de scan line */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -skew-x-12 transition-all duration-1000 pointer-events-none ${
                      selectedProject === project.id ? "translate-x-full" : "-translate-x-full"
                    }`}
                  ></div>

                  {/* Efeito de partículas */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                    <div
                      className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>

                {/* Conteúdo do card - flex-grow para ocupar espaço restante */}
                <div className="p-6 space-y-4 relative z-10 flex-grow flex flex-col">
                  <div className="space-y-2 flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
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
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
                          <span className="text-xs text-gray-300 line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags de tecnologia com animações */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Barra de progresso */}
                  <div className="space-y-1 mt-auto">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progresso do Projeto</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${project.color} h-1.5 rounded-full transition-all duration-1000 relative overflow-hidden`}
                        style={{ width: `${project.progress}%` }}
                      >
                        {/* Efeito de brilho na barra de progresso */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  {/* Botão adicional no rodapé do card */}
                  <div className="pt-4 border-t border-white/10">
                    {project.demo && project.demo !== "#" ? (
                      <button
                        onClick={(e) => openProjectSite(project.demo, e)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Acessar Projeto
                      </button>
                    ) : (
                      <button
                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Em Desenvolvimento
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de posição - baseados nos projetos originais */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-yellow-400 w-6 shadow-glow" : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Informações do carrossel */}
      <div className="text-center mt-4">
        <p className="text-gray-300 text-sm">
          Projeto {selectedIndex + 1} de {projects.length} • Rolagem automática {autoplayActive ? "ativa" : "inativa"}
        </p>
      </div>
    </div>
  )
}
