"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/collections-table/columns"
import { CollectionModal } from "@/components/modals/collection-modal"
import type { Collection } from "@/types/database"

export default function CollectionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)

  // Mock data for collections
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "1",
      userId: "user-1",
      name: "My Favorites",
      description: "A collection of my most beloved mangas.",
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2",
      userId: "user-1",
      name: "To Read Next",
      description: "Mangas I plan to read in the near future.",
      createdAt: "2023-01-10T10:00:00Z",
      updatedAt: "2023-01-10T10:00:00Z",
    },
    {
      id: "3",
      userId: "user-2",
      name: "Action Packed",
      description: "High-octane action mangas.",
      createdAt: "2023-02-01T10:00:00Z",
      updatedAt: "2023-02-01T10:00:00Z",
    },
  ])

  const addCollection = (collection: Collection) => {
    setCollections((prev) => [
      ...prev,
      {
        ...collection,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateCollection = (updatedCollection: Collection) => {
    setCollections((prev) =>
      prev.map((collection) => (collection.id === updatedCollection.id ? updatedCollection : collection)),
    )
  }

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id))
  }

  const handleAddClick = () => {
    setSelectedCollection(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (collection: Collection) => {
    setSelectedCollection(collection)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCollection(null)
  }

  const handleSaveCollection = (collection: Collection) => {
    if (selectedCollection) {
      updateCollection(collection)
    } else {
      addCollection(collection)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Collections</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Collection
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteCollection)} data={collections} />
      <CollectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCollection}
        collection={selectedCollection}
      />
    </div>
  )
}
