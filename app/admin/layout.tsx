import type React from "react"
import { StorageStatus } from "@/components/admin/storage-status"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StorageStatus />
    </>
  )
}
