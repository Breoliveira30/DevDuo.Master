"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Code,
  Smartphone,
  Zap,
  Palette,
  Globe,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  ArrowRight,
  X,
  Star,
  SparkleIcon as Spark,
  Rocket,
  Eye,
  Mail,
  Icon,
} from "lucide-react"
import { PortfolioCarousel } from "@/components/portfolio-carousel"
import { TechCarousel } from "@/components/tech-carousel"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Evita problemas de hidratação
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fecha o menu quando a tela é redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Impede a rolagem quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  // Efeito 3D para a imagem principal
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-2 animate-bounce-in">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DevDuo
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#services"
              className="text-sm font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              Serviços
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              Sobre Nós
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              Portfólio
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              Contato
            </Link>
          </nav>
          <Button
            asChild
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 animate-pulse-glow"
          >
            <Link href="#contact">
              <Spark className="mr-2 h-4 w-4" />
              Fale Conosco
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-purple-200 hover:bg-purple-50"
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-purple-600" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-purple-600"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </Button>
        </div>
      </header>

      {/* Menu móvel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-lg pt-16 md:hidden">
          <div className="container flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-8 text-lg">
              <Link
                href="#services"
                className="font-medium text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                onClick={closeMenu}
              >
                Serviços
              </Link>
              <Link
                href="#about"
                className="font-medium text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                onClick={closeMenu}
              >
                Sobre Nós
              </Link>
              <Link
                href="#portfolio"
                className="font-medium text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                onClick={closeMenu}
              >
                Portfólio
              </Link>
              <Link
                href="#contact"
                className="font-medium text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                onClick={closeMenu}
              >
                Contato
              </Link>
              <Button
                asChild
                size="lg"
                className="mt-4 w-full bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700"
              >
                <Link href="#contact" onClick={closeMenu}>
                  <Spark className="mr-2 h-4 w-4" />
                  Fale Conosco
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 relative">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] max-w-7xl">
              <div className="flex flex-col justify-center space-y-4 animate-slide-in">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      #1 em Sites e Landing Pages
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                    Transforme sua presença digital com Sites e Landing Pages
                    <span className="block text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
                      EXTRAORDINÁRIAS! 🚀
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 text-base md:text-xl leading-relaxed">
                    Somos dois desenvolvedores júnior apaixonados por tecnologia e design, prontos para criar
                    experiências digitais que
                    <span className="font-bold text-purple-600"> convertem visitantes em clientes!</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link href="https://wa.me/5561995194338?text=Olá!Gostaria de conversar um pouco para entendermos juntos qual serviço da DevDuo melhor se encaixa no que estou procurando. Podem me ajudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Solicitar Orçamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
                  >
                    <Link href="#portfolio">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Portfólio
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[400px] lg:max-w-none lg:order-last animate-fade-in">
                <div
                  className="relative perspective-1000"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Efeito 3D avançado */}
                  <div
                    className="relative transition-transform duration-200 ease-out transform-gpu preserve-3d"
                    style={{
                      transform: `
                        rotateY(${mousePosition.x * 20}deg) 
                        rotateX(${-mousePosition.y * 20}deg)
                        translateZ(20px)
                      `,
                    }}
                  >
                    {/* Camada de sombra 3D */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-xl blur-xl"
                      style={{
                        transform: `translateZ(-20px) scale(0.9)`,
                        opacity: 0.7 + Math.abs(mousePosition.x + mousePosition.y) * 0.5,
                      }}
                    ></div>

                    {/* Reflexo superior */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-xl"
                      style={{
                        transform: `translateZ(5px) rotateX(${-mousePosition.y * 40}deg)`,
                        opacity: 0.3 + Math.abs(mousePosition.y) * 0.5,
                      }}
                    ></div>

                    {/* Borda brilhante */}
                    <div
                      className="absolute inset-0 rounded-xl border-2 border-white/30"
                      style={{
                        transform: `translateZ(10px)`,
                        boxShadow: `
                          0 0 20px 2px rgba(139, 92, 246, ${0.3 + Math.abs(mousePosition.x) * 0.2}),
                          inset 0 0 20px rgba(139, 92, 246, ${0.1 + Math.abs(mousePosition.y) * 0.1})
                        `,
                      }}
                    ></div>

                    {/* Imagem principal */}
                    <div className="relative overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm bg-white/5">
                      <Image
                        src="/images/lg_dev.png"
                        width={550}
                        height={550}
                        alt="DevDuo - Desenvolvimento de Landing Pages"
                        className="relative w-full h-auto object-cover"
                        style={{ transform: `translateZ(30px)` }}
                      />

                      {/* Overlay com gradiente que se move com o mouse */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"
                        style={{
                          transform: `translateZ(40px)`,
                          backgroundPosition: `${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%`,
                        }}
                      ></div>

                      {/* Partículas flutuantes */}
                      <div className="absolute inset-0" style={{ transform: `translateZ(50px)` }}>
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping"></div>
                        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-pink-400/50 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resto do código permanece igual... */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50"
        >
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm text-white font-medium shadow-lg">
                    <Spark className="inline mr-2 h-4 w-4" />
                    Nossos Serviços
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    O que oferecemos
                  </h2>
                  <p className="max-w-[900px] text-gray-600 text-base md:text-xl/relaxed">
                    Criamos Sites e Landing Pages profissionais e personalizadas que
                    <span className="font-bold text-purple-600"> fazem seu negócio brilhar</span> na internet
                  </p>
                </div>
              </div>
              <div className="mx-auto grid items-center gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Smartphone,
                    title: "Design Responsivo",
                    desc: "Páginas que funcionam perfeitamente em qualquer dispositivo, do celular ao desktop.",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Zap,
                    title: "Alta Performance",
                    desc: "Sites rápidos e otimizados para melhor experiência do usuário e SEO.",
                    color: "from-yellow-500 to-orange-500",
                  },
                  {
                    icon: Palette,
                    title: "Design Personalizado",
                    desc: "Layouts criados de acordo com a identidade visual do seu negócio.",
                    color: "from-pink-500 to-purple-500",
                  },
                  {
                    icon: Globe,
                    title: "Integração Social",
                    desc: "Conexão com WhatsApp, redes sociais e outras plataformas.",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: MessageSquare,
                    title: "Formulários de Contato",
                    desc: "Capture leads e mensagens diretamente do seu site.",
                    color: "from-indigo-500 to-blue-500",
                  },
                  {
                    icon: Code,
                    title: "Suporte Técnico",
                    desc: "Atendimento próximo durante todo o projeto e após a entrega.",
                    color: "from-red-500 to-pink-500",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 p-6 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`rounded-full bg-gradient-to-r ${service.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-white to-purple-50">
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm text-white font-medium shadow-lg">
                    <Star className="inline mr-2 h-4 w-4" />
                    Sobre Nós
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Quem Somos
                  </h2>
                  <p className="max-w-[900px] text-gray-600 text-base md:text-xl/relaxed">
                    Conheça a dupla de desenvolvedores por trás dos projetos que
                    <span className="font-bold text-cyan-600"> transformam ideias em realidade digital</span>
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-10 py-12 grid-cols-1 md:grid-cols-2">
                {[
                  {
                    image: "/images/brenno.jpeg",
                    title: "Dev e QA",
                    desc: "Desenvolvedor front-end com foco na criação de interfaces claras e funcionais. Atuo também como QA, minha área de especialização atual, realizando testes manuais e automatizados nas aplicações web dos clientes da DevDuo para garantir estabilidade e qualidade.",
                    gradient: "from-purple-500 to-pink-500",
                    github: "https://github.com/Breoliveira30",
                    linkedin: "https://www.linkedin.com/in/brenno-oliveira-5264b9265/",
                  },
                  {
                    image: "/images/gabriel.jpeg",
                    title: "Desenvolvedor",
                    desc: "Designer e desenvolvedor com olhar apurado para detalhes, transformando conceitos em experiências visuais impactantes.",
                    gradient: "from-cyan-500 to-blue-500",
                    github: "https://github.com/Gabriel-NSantos",
                    linkedin: "https://www.linkedin.com/in/gabriel-alves-7a1617263/",
                  },
                ].map((person, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 animate-bounce-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative group">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${person.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                      ></div>
                      <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                        <Image
                          src={person.image || "/placeholder.svg"}
                          alt={person.title}
                          width={200}
                          height={200}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3
                      className={`text-2xl font-bold bg-gradient-to-r ${person.gradient} bg-clip-text text-transparent`}
                    >
                      {person.title}
                    </h3>
                    <p className="text-center text-gray-600 max-w-[350px] leading-relaxed">{person.desc}</p>
                    <div className="flex space-x-4">
                      <Link
                        href={person.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">Github</span>
                      </Link>
                      <Link
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden"
        >
          {/* Elementos decorativos com padrão de pontos */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, #9C92AC 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          {/* Partículas flutuantes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div
              className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="container px-4 md:px-6 flex justify-center relative z-10">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm text-black font-bold shadow-lg animate-pulse">
                    <Rocket className="inline mr-2 h-4 w-4" />
                    Portfólio Interativo
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Nossos Projetos
                    <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      REVOLUCIONÁRIOS! 🚀
                    </span>
                  </h2>
                  <p className="max-w-[900px] text-gray-300 text-base md:text-xl/relaxed">
                    Explore nossos projetos inovadores e veja como transformamos ideias em soluções digitais incríveis!
                  </p>
                </div>
              </div>

              <div className="py-12">
                <PortfolioCarousel />
              </div>

              {/* Seção de estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 animate-fade-in">
                {[
                  { number: "100%", label: "Clientes Satisfeitos", icon: Star },
                  { number: "24/7", label: "Suporte Técnico", icon: MessageSquare },
                  { number: "3x", label: "Mais Conversões", icon: Zap },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Seção de tecnologias com carrossel */}
              <div className="mt-16 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Nossas <span className="text-yellow-400">Tecnologias</span> Favoritas
                </h3>
                <div className="max-w-4xl mx-auto">
                  <TechCarousel />
                </div>
              </div>

              {/* Call to action melhorado */}
              <div className="text-center mt-16 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Gostou do que viu?
                  <span className="block text-yellow-400">Vamos criar algo incrível juntos!</span>
                </h3>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl font-bold"
                  >
                    <Link href="#portfolio">
                      <Spark className="mr-2 h-5 w-5" />
                      Ver Todos os Projetos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm text-white font-medium shadow-lg">
                    <MessageSquare className="inline mr-2 h-4 w-4" />
                    Contato
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Fale Conosco
                  </h2>
                  <p className="max-w-[900px] text-gray-600 text-base md:text-xl/relaxed">
                    Entre em contato para solicitar um orçamento ou tirar dúvidas sobre nossos serviços
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-2xl py-12">
                <div className="space-y-8 animate-slide-in text-center">
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-x-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-4 shadow-lg mb-4">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">WhatsApp</h3>
                        <p className="text-gray-600 mb-4">(61) 99519-4338</p>
                        <Button
                          size="lg"
                          asChild
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <Link
                            href="https://wa.me/5561995194338?text=Olá! Gostaria de conversar um pouco para entendermos juntos qual serviço da DevDuo melhor se encaixa no que estou procurando. Podem me ajudar?"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Conversar no WhatsApp
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-x-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 shadow-lg mb-4">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Email</h3>
                        <p className="text-gray-600 mb-4">devduo.solution@gmail.com</p>
                        <Button
                          size="lg"
                          asChild
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <Link href="mailto:devduo.solution@gmail.com?subject=Interesse%20em%20servi%C3%A7o%20de%20site%20ou%20landing%20page&body=Ol%C3%A1%2C%20gostaria%20de%20marcar%20uma%20conversa%20com%20voc%C3%AAs.%20Tenho%20interesse%20em%20desenvolver%20um%20site%20ou%20uma%20landing%20page.">
                            <Mail className="mr-2 h-5 w-5" />
                            Enviar Email
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4 text-gray-800">Onde VOCÊ pode nos encontrar</h3>
                    <div className="flex justify-center space-x-4">
                      {[
                        { icon: Instagram, color: "from-pink-500 to-purple-500", href: "https://www.instagram.com/devduo.solution/?igsh=MWhibWloZGJvb21nbg%3D%3D#" },
                        { icon: Facebook, color: "from-blue-500 to-blue-600", href: "#" },
                        {icon: Smartphone, color:"from-green-500 to-green-600", href: "https://wa.me/5561995194338?text=Olá!Gostaria de conversar um pouco para entendermos juntos qual serviço da DevDuo melhor se encaixa no que estou procurando. Podem me ajudar?" },
                        { icon: Mail, color: "from-gray-500 to-gray-600", href: "mailto:devduo.solution@gmail.com?subject=Interesse%20em%20servi%C3%A7o%20de%20site%20ou%20landing%20page&body=Ol%C3%A1%2C%20gostaria%20de%20marcar%20uma%20conversa%20com%20voc%C3%AAs.%20Tenho%20interesse%20em%20desenvolver%20um%20site%20ou%20uma%20landing%20page." },
                      ].map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          target={social.href.startsWith("http") ? "_blank" : undefined}
                          rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className={`rounded-full bg-gradient-to-r ${social.color} p-4 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
                        >
                          <social.icon className="h-6 w-6" />
                          <span className="sr-only">{social.icon.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>

          <div className="container px-4 md:px-6 flex justify-center relative z-10">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center animate-bounce-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                    Pronto para transformar sua presença digital?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-base md:text-xl/relaxed text-white/90">
                    Solicite um orçamento sem compromisso e vamos criar juntos seu Site ou landing page perfeita para o seu
                    negócio.
                  </p>
                </div>
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-purple-600 hover:bg-yellow-400 hover:text-purple-700 w-full sm:w-auto transform hover:scale-110 transition-all duration-300 shadow-2xl font-bold animate-pulse-glow"
                >
                  <Link href="https://wa.me/5561995194338?text=Olá!Gostaria de conversar um pouco para entendermos juntos qual serviço da DevDuo melhor se encaixa no que estou procurando. Podem me ajudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <Rocket className="mr-2 h-5 w-5" />
                    Solicitar Orçamento AGORA!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-gradient-to-r from-gray-900 to-purple-900 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <Link href="/admin/login" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DevDuo
            </span>
          </Link>
          <p className="text-center text-sm leading-loose text-gray-300 md:text-left">
            &copy; {new Date().getFullYear()} DevDuo. Todos os direitos reservados.
          </p>
          <div className="flex items-center">
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:text-purple-400 transition-colors underline-offset-4">
                Termos
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-purple-400 transition-colors underline-offset-4">
                Privacidade
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
