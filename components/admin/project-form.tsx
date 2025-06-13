"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@/lib/types"
import { useProjects } from "@/lib/project-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X, Plus, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ProjectFormProps {
  project?: Project
  isEditing?: boolean
}

const gradientOptions = [
  {
    value: "from-emerald-500 to-teal-500",
    label: "Verde Esmeralda",
    preview: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  { value: "from-blue-500 to-cyan-500", label: "Azul Oceano", preview: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  {
    value: "from-amber-500 to-orange-500",
    label: "Laranja Vibrante",
    preview: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
  {
    value: "from-purple-500 to-pink-500",
    label: "Roxo Místico",
    preview: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  { value: "from-red-500 to-pink-500", label: "Vermelho Paixão", preview: "bg-gradient-to-r from-red-500 to-pink-500" },
  {
    value: "from-yellow-500 to-amber-500",
    label: "Amarelo Solar",
    preview: "bg-gradient-to-r from-yellow-500 to-amber-500",
  },
  {
    value: "from-indigo-500 to-purple-500",
    label: "Índigo Real",
    preview: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    value: "from-green-500 to-emerald-500",
    label: "Verde Natureza",
    preview: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
]

const categoryOptions = [
  "Sistema Web",
  "E-commerce",
  "Landing Page",
  "Dashboard",
  "Mobile App",
  "IoT & Monitoramento",
  "API & Backend",
  "Blog & CMS",
  "Portfolio",
  "Outro",
]

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const { addProject, updateProject } = useProjects()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "/placeholder.svg?height=400&width=600",
    tech: project?.tech || [""],
    color: project?.color || "from-blue-500 to-cyan-500",
    demo: project?.demo || "#",
    category: project?.category || "",
    features: project?.features || [""],
    progress: project?.progress || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Categoria é obrigatória"
    }

    const validTech = formData.tech.filter((tech) => tech.trim() !== "")
    if (validTech.length === 0) {
      newErrors.tech = "Pelo menos uma tecnologia é obrigatória"
    }

    const validFeatures = formData.features.filter((feature) => feature.trim() !== "")
    if (validFeatures.length === 0) {
      newErrors.features = "Pelo menos uma feature é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...formData.tech]
    newTech[index] = value
    setFormData((prev) => ({ ...prev, tech: newTech }))

    if (errors.tech) {
      setErrors((prev) => ({ ...prev, tech: "" }))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: newFeatures }))

    if (errors.features) {
      setErrors((prev) => ({ ...prev, features: "" }))
    }
  }

  const addTech = () => {
    setFormData((prev) => ({ ...prev, tech: [...prev.tech, ""] }))
  }

  const removeTech = (index: number) => {
    if (formData.tech.length > 1) {
      const newTech = [...formData.tech]
      newTech.splice(index, 1)
      setFormData((prev) => ({ ...prev, tech: newTech }))
    }
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = [...formData.features]
      newFeatures.splice(index, 1)
      setFormData((prev) => ({ ...prev, features: newFeatures }))
    }
  }

  const handleProgressChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, progress: value[0] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Formulário inválido",
        description: "Por favor, corrija os erros no formulário antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Remover itens vazios
      const cleanedData = {
        ...formData,
        tech: formData.tech.filter((item) => item.trim() !== ""),
        features: formData.features.filter((item) => item.trim() !== ""),
      }

      if (isEditing && project) {
        await updateProject({ ...cleanedData, id: project.id })
        toast({
          title: "Projeto atualizado!",
          description: "O projeto foi atualizado com sucesso.",
        })
      } else {
        await addProject(cleanedData)
        toast({
          title: "Projeto criado!",
          description: "O novo projeto foi criado com sucesso.",
        })
      }

      router.push("/admin/projects")
    } catch (error) {
      console.error("Erro ao salvar projeto:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o projeto. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isEditing ? "Editar Projeto" : "Criar Novo Projeto"}
          </h2>
          <p className="text-gray-600">Preencha todos os campos para {isEditing ? "atualizar" : "criar"} seu projeto</p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Sistema de Agendamento Médico"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 ${errors.category ? "border-red-500" : ""}`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o projeto, suas funcionalidades e objetivos..."
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>

          {/* Mídia e Links */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mídia e Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <p className="text-sm text-gray-500">Cole a URL de uma imagem que represente seu projeto</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo">URL de Demonstração</Label>
                <Input
                  id="demo"
                  name="demo"
                  value={formData.demo}
                  onChange={handleChange}
                  placeholder="https://meu-projeto.vercel.app"
                />
                <p className="text-sm text-gray-500">Link para visualizar o projeto online (deixe # se não houver)</p>
              </div>
            </div>
          </div>

          {/* Estilo Visual */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estilo Visual</h3>

            <div className="space-y-4">
              <Label>Cor do Gradiente</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gradientOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all ${
                      formData.color === option.value
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={option.value}
                      checked={formData.color === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`h-8 w-full rounded-md ${option.preview} mb-2`}></div>
                    <p className="text-xs font-medium text-gray-700 text-center">{option.label}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tecnologias */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologias *</h3>

            <div className="space-y-3">
              {formData.tech.map((tech, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={tech}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="Ex: React, TypeScript, Node.js"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTech(index)}
                    disabled={formData.tech.length <= 1}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {errors.tech && <p className="text-red-500 text-sm">{errors.tech}</p>}

              <Button type="button" variant="outline" size="sm" onClick={addTech} className="mt-3">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Tecnologia
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Principais Features *</h3>

            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Ex: Dashboard em tempo real, Sistema de notificações"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length <= 1}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}

              <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-3">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Feature
              </Button>
            </div>
          </div>

          {/* Progresso */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Projeto</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Progresso: {formData.progress}%</Label>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    formData.progress === 100
                      ? "bg-green-100 text-green-800"
                      : formData.progress >= 75
                        ? "bg-blue-100 text-blue-800"
                        : formData.progress >= 50
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {formData.progress === 100
                    ? "Concluído"
                    : formData.progress >= 75
                      ? "Quase pronto"
                      : formData.progress >= 50
                        ? "Em desenvolvimento"
                        : "Iniciando"}
                </span>
              </div>

              <Slider
                value={[formData.progress]}
                max={100}
                step={5}
                onValueChange={handleProgressChange}
                className="w-full"
              />

              <div className={`h-3 w-full rounded-full bg-gradient-to-r ${formData.color} opacity-20`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${formData.color} transition-all duration-500`}
                  style={{ width: `${formData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Atualizar Projeto" : "Criar Projeto"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
