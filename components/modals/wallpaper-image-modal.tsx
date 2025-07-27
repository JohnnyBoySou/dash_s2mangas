"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { WallpaperImage } from "@/types/database"
import type { WallpaperImageCreateRequest } from "@/services/wallpaper-service"

interface WallpaperImageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageData: WallpaperImageCreateRequest) => Promise<void>
  onUpdate?: (imageId: string, imageData: WallpaperImageCreateRequest) => Promise<void>
  image?: WallpaperImage | null
  wallpaperId: string
}

export function WallpaperImageModal({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  image,
  wallpaperId,
}: WallpaperImageModalProps) {
  const [formData, setFormData] = useState<WallpaperImageCreateRequest>({
    url: "",
    wallpaperId: wallpaperId,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (image) {
      setFormData({
        url: image.url,
        wallpaperId: wallpaperId,
      })
    } else {
      setFormData({
        url: "",
        wallpaperId: wallpaperId,
      })
    }
  }, [image, wallpaperId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (image && onUpdate) {
        await onUpdate(image.id, formData)
      } else {
        await onSave(formData)
      }
      onClose()
    } catch (error) {
      console.error("Erro ao salvar imagem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      url: "",
      wallpaperId: wallpaperId,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {image ? "Editar Imagem" : "Adicionar Nova Imagem"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL da Imagem
              </Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
                className="col-span-3"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            </div>
            
            {formData.url && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Preview</Label>
                <div className="col-span-3">
                  <img
                    src={formData.url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}