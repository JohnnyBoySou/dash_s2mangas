"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useWallpaper } from "@/hooks/use-wallpapers"
import { WallpaperImageModal } from "@/components/modals/wallpaper-image-modal"
import type { WallpaperImage } from "@/types/database"
import type { WallpaperImageCreateRequest } from "@/services/wallpaper-service"

export default function WallpaperDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const wallpaperId = params.id as string

  const {
    wallpaper,
    pagination,
    currentPage,
    isLoading,
    error,
    addImage,
    updateImage,
    toggleImage,
    goToPage,
    nextPage,
    prevPage,
  } = useWallpaper(wallpaperId)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<WallpaperImage | null>(null)

  const handleAddImage = () => {
    setSelectedImage(null)
    setIsModalOpen(true)
  }

  const handleEditImage = (image: WallpaperImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleToggleImage = async (imageId: string) => {
    if (confirm("Tem certeza que deseja fazer toggle desta imagem?")) {
      try {
        await toggleImage(imageId)
      } catch (error) {
        console.error("Erro ao fazer toggle da imagem:", error)
      }
    }
  }

  const handleSaveImage = async (imageData: WallpaperImageCreateRequest) => {
    try {
      await addImage(imageData)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error)
      throw error
    }
  }

  const handleUpdateImage = async (imageId: string, imageData: WallpaperImageCreateRequest) => {
    try {
      await updateImage(imageId, imageData)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Erro: {error.message}</div>
      </div>
    )
  }

  if (!wallpaper) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Wallpaper não encontrado</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">{wallpaper.name}</h1>
        </div>
        <Button onClick={handleAddImage}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Imagem
        </Button>
      </div>

      {/* Wallpaper Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações do Wallpaper</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Nome:</strong> {wallpaper.name}</p>
              <p><strong>Total de Imagens:</strong> {wallpaper.totalImages}</p>
              <p><strong>Criado em:</strong> {new Date(wallpaper.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p><strong>Capa:</strong></p>
              <img
                src={wallpaper.cover}
                alt={wallpaper.name}
                className="w-32 h-32 object-cover rounded-md border mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Imagens</CardTitle>
            <Badge variant="secondary">
              {wallpaper.images?.length || 0} imagens nesta página
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {wallpaper.images && wallpaper.images.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {wallpaper.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={`Imagem ${image.id}`}
                      className="w-full h-48 object-cover rounded-md border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEditImage(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                         size="sm"
                         variant="destructive"
                         onClick={() => handleToggleImage(image.id)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && (pagination.prev || pagination.next) && (
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={!pagination.prev}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Página {currentPage} de {pagination.totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={!pagination.next}
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhuma imagem encontrada neste wallpaper.
              </p>
              <Button onClick={handleAddImage}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Imagem
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <WallpaperImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveImage}
        onUpdate={handleUpdateImage}
        image={selectedImage}
        wallpaperId={wallpaperId}
      />
    </div>
  )
}