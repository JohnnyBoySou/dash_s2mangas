"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/categories-table/columns"
import { CategoryModal } from "@/components/modals/category-modal"
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal"
import type { Category } from "@/types/database"

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string, name: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mock data for categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Action",
      description: "Manga with high-energy sequences and combat.",
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2",
      name: "Adventure",
      description: "Manga focused on journeys and exploration.",
      createdAt: "2023-01-05T10:00:00Z",
      updatedAt: "2023-01-05T10:00:00Z",
    },
    {
      id: "3",
      name: "Fantasy",
      description: "Manga set in magical or mythical worlds.",
      createdAt: "2023-01-10T10:00:00Z",
      updatedAt: "2023-01-10T10:00:00Z",
    },
  ])

  const addCategory = (category: Category) => {
    setCategories((prev) => [
      ...prev,
      {
        ...category,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateCategory = (updatedCategory: Category) => {
    setCategories((prev) => prev.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)))
  }

  const deleteCategory = (id: string, name: string) => {
    setCategoryToDelete({ id, name })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return
    
    setIsDeleting(true)
    try {
      setCategories((prev) => prev.filter((category) => category.id !== categoryToDelete.id))
      setIsDeleteModalOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      console.error('Erro ao deletar categoria:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setCategoryToDelete(null)
  }

  const handleAddClick = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  const handleSaveCategory = (category: Category) => {
    if (selectedCategory) {
      updateCategory(category)
    } else {
      addCategory(category)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteCategory)} data={categories} />
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCategory}
        category={selectedCategory}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={categoryToDelete?.name || ""}
        isLoading={isDeleting}
      />
    </div>
  )
}
