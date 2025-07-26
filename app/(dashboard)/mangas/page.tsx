"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/mangas-table/columns"
import { MangaModal } from "@/components/modals/manga-modal"
import { useMangas } from "@/hooks/use-mangas"
import type { Manga } from "@/types/manga"

export default function MangasPage() {
  const { mangas, addManga, updateManga, deleteManga } = useMangas()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null)

  const handleAddClick = () => {
    setSelectedManga(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (manga: Manga) => {
    setSelectedManga(manga)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedManga(null)
  }

  const handleSaveManga = (manga: Manga) => {
    if (selectedManga) {
      updateManga(manga)
    } else {
      addManga(manga)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mangas</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Manga
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteManga)} data={mangas} />
      <MangaModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSaveManga} manga={selectedManga} />
    </div>
  )
}
