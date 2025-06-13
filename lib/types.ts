export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[] // Será armazenado como JSON no SQLite
  color: string
  demo: string
  category: string
  features: string[] // Será armazenado como JSON no SQLite
  progress: number
  createdAt?: string | Date // Opcional para compatibilidade
  updatedAt?: string | Date // Opcional para compatibilidade
  created_at?: string | Date // Supabase usa snake_case por padrão
  updated_at?: string | Date // Supabase usa snake_case por padrão
}
