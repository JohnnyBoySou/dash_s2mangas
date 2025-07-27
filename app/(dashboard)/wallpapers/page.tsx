"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/wallpapers-table/columns"
import { WallpaperModal } from "@/components/modals/wallpaper-modal"
import { useWallpapers } from "@/hooks/use-wallpapers"
import type { Wallpaper } from "@/types/database"
import type { WallpaperCreateRequest } from "@/services/wallpaper-service"

export default function WallpapersPage() {
  const { 
    wallpapers, 
    pagination,
    currentPage,
    isLoading,
    addWallpaper, 
    updateWallpaper, 
    deleteWallpaper,
    goToPage,
    nextPage,
    prevPage
  } = useWallpapers()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null)

  const handleAddClick = () => {
    setSelectedWallpaper(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedWallpaper(null)
  }

  const handleSaveWallpaper = async (wallpaperData: WallpaperCreateRequest) => {
    try {
      if (selectedWallpaper) {
        await updateWallpaper({
          ...selectedWallpaper,
          name: wallpaperData.name,
          cover: wallpaperData.cover,
        })
      } else {
        await addWallpaper(wallpaperData)
      }
      handleModalClose()
    } catch (error) {
      console.error('Error saving wallpaper:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading wallpapers...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wallpapers</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Wallpaper
        </Button>
      </div>
      
      <DataTable columns={columns(handleEditClick, deleteWallpaper)} data={wallpapers} />
      
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {pagination.totalPages} ({pagination.total} total wallpapers)
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={!pagination.prev}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!pagination.next}
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <WallpaperModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveWallpaper}
        wallpaper={selectedWallpaper}
      />
    </div>
  )
}
