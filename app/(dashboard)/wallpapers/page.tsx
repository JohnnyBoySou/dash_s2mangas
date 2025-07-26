"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/wallpapers-table/columns"
import { WallpaperModal } from "@/components/modals/wallpaper-modal"
import { useWallpapers } from "@/hooks/use-wallpapers"
import type { Wallpaper } from "@/types/database"

export default function WallpapersPage() {
  const { wallpapers, addWallpaper, updateWallpaper, deleteWallpaper } = useWallpapers()
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

  const handleSaveWallpaper = (wallpaper: Wallpaper) => {
    if (selectedWallpaper) {
      updateWallpaper(wallpaper)
    } else {
      addWallpaper(wallpaper)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wallpapers</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Wallpaper
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteWallpaper)} data={wallpapers} />
      <WallpaperModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveWallpaper}
        wallpaper={selectedWallpaper}
      />
    </div>
  )
}
