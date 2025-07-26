"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/manga-lists-table/columns"
import { MangaListModal } from "@/components/modals/manga-list-modal"
import type { MangaList } from "@/types/database"

export default function MangaListsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMangaList, setSelectedMangaList] = useState<MangaList | null>(null)

  // Mock data for manga lists
  const [mangaLists, setMangaLists] = useState<MangaList[]>([
    {
      id: "1",
      userId: "user-1",
      name: "Reading Now",
      description: "Mangas I'm currently reading.",
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2",
      userId: "user-1",
      name: "Completed",
      description: "Mangas I have finished reading.",
      createdAt: "2023-01-15T10:00:00Z",
      updatedAt: "2023-01-15T10:00:00Z",
    },
    {
      id: "3",
      userId: "user-2",
      name: "Dropped",
      description: "Mangas I started but didn't finish.",
      createdAt: "2023-02-01T10:00:00Z",
      updatedAt: "2023-02-01T10:00:00Z",
    },
  ])

  const addMangaList = (mangaList: MangaList) => {
    setMangaLists((prev) => [
      ...prev,
      {
        ...mangaList,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateMangaList = (updatedMangaList: MangaList) => {
    setMangaLists((prev) => prev.map((list) => (list.id === updatedMangaList.id ? updatedMangaList : list)))
  }

  const deleteMangaList = (id: string) => {
    setMangaLists((prev) => prev.filter((list) => list.id !== id))
  }

  const handleAddClick = () => {
    setSelectedMangaList(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (mangaList: MangaList) => {
    setSelectedMangaList(mangaList)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedMangaList(null)
  }

  const handleSaveMangaList = (mangaList: MangaList) => {
    if (selectedMangaList) {
      updateMangaList(mangaList)
    } else {
      addMangaList(mangaList)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manga Lists</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Manga List
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteMangaList)} data={mangaLists} />
      <MangaListModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveMangaList}
        mangaList={selectedMangaList}
      />
    </div>
  )
}
