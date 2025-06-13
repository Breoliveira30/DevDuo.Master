"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"

// Lista de tecnologias
const technologies = [
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "bg-blue-500",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "bg-yellow-500",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "bg-blue-600",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "bg-cyan-500",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "bg-black",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "bg-green-600",
  },
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "bg-orange-500",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "bg-cyan-400",
  },
]

export function TechCarousel() {
  // Create autoplay plugin with 2 second delay
  const autoplayPlugin = AutoPlay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
    playOnInit: true,
  })

  // Configure carousel with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [autoplayPlugin],
  )

  // State to track if carousel is mounted
  const [isMounted, setIsMounted] = useState(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {technologies.map((tech, index) => (
          <div key={index} className="flex-[0_0_16.666%] min-w-0 px-2 md:flex-[0_0_12.5%]">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 h-full">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  tech.color === "bg-black" ? "bg-white" : tech.color
                }`}
              >
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-xs font-medium text-white text-center">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
