"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/languages-table/columns"
import { LanguageModal } from "@/components/modals/language-modal"
import type { Language } from "@/types/database"

export default function LanguagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)

  // Mock data for languages
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: "1",
      name: "English",
      code: "en",
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2",
      name: "Japanese",
      code: "ja",
      createdAt: "2023-01-05T10:00:00Z",
      updatedAt: "2023-01-05T10:00:00Z",
    },
    {
      id: "3",
      name: "Spanish",
      code: "es",
      createdAt: "2023-01-10T10:00:00Z",
      updatedAt: "2023-01-10T10:00:00Z",
    },
  ])

  const addLanguage = (language: Language) => {
    setLanguages((prev) => [
      ...prev,
      {
        ...language,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateLanguage = (updatedLanguage: Language) => {
    setLanguages((prev) => prev.map((language) => (language.id === updatedLanguage.id ? updatedLanguage : language)))
  }

  const deleteLanguage = (id: string) => {
    setLanguages((prev) => prev.filter((language) => language.id !== id))
  }

  const handleAddClick = () => {
    setSelectedLanguage(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (language: Language) => {
    setSelectedLanguage(language)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedLanguage(null)
  }

  const handleSaveLanguage = (language: Language) => {
    if (selectedLanguage) {
      updateLanguage(language)
    } else {
      addLanguage(language)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Languages</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Language
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteLanguage)} data={languages} />
      <LanguageModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveLanguage}
        language={selectedLanguage}
      />
    </div>
  )
}
