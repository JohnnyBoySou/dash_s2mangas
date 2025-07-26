"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/chapters-table/columns"
import { ChapterModal } from "@/components/modals/chapter-modal"
import type { Chapter } from "@/types/database"

export default function ChaptersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  // Mock data for chapters
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      mangaId: "manga-1",
      chapterNumber: 1,
      title: "The Beginning",
      releaseDate: "2023-01-01",
      views: 1200,
      pages: ["page1.jpg", "page2.jpg"],
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2",
      mangaId: "manga-1",
      chapterNumber: 2,
      title: "New Horizons",
      releaseDate: "2023-01-15",
      views: 950,
      pages: ["page3.jpg", "page4.jpg"],
      createdAt: "2023-01-15T10:00:00Z",
      updatedAt: "2023-01-15T10:00:00Z",
    },
    {
      id: "3",
      mangaId: "manga-2",
      chapterNumber: 1,
      title: "First Contact",
      releaseDate: "2023-02-01",
      views: 1500,
      pages: ["page5.jpg", "page6.jpg"],
      createdAt: "2023-02-01T10:00:00Z",
      updatedAt: "2023-02-01T10:00:00Z",
    },
  ])

  const addChapter = (chapter: Chapter) => {
    setChapters((prev) => [
      ...prev,
      {
        ...chapter,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateChapter = (updatedChapter: Chapter) => {
    setChapters((prev) => prev.map((chapter) => (chapter.id === updatedChapter.id ? updatedChapter : chapter)))
  }

  const deleteChapter = (id: string) => {
    setChapters((prev) => prev.filter((chapter) => chapter.id !== id))
  }

  const handleAddClick = () => {
    setSelectedChapter(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedChapter(null)
  }

  const handleSaveChapter = (chapter: Chapter) => {
    if (selectedChapter) {
      updateChapter(chapter)
    } else {
      addChapter(chapter)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapters</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Chapter
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteChapter)} data={chapters} />
      <ChapterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveChapter}
        chapter={selectedChapter}
      />
    </div>
  )
}
