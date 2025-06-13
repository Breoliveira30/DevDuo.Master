"use client"

import Link from "next/link"
import { AuthGuard } from "@/components/admin/auth-guard"
import { ProjectForm } from "@/components/admin/project-form"
import { ArrowLeft } from "lucide-react"

export default function NewProject() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <Link href="/admin/projects" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Novo Projeto</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <ProjectForm />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
