"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Wallpaper } from "@/types/database"
import type { WallpaperCreateRequest } from "@/services/wallpaper-service"

interface WallpaperModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (wallpaper: WallpaperCreateRequest) => void
  wallpaper: Wallpaper | null
}

export function WallpaperModal({ isOpen, onClose, onSave, wallpaper }: WallpaperModalProps) {
  const [formData, setFormData] = useState<WallpaperCreateRequest>({
    name: "",
    cover: "",
  })

  useEffect(() => {
    if (wallpaper) {
      setFormData({
        name: wallpaper.name,
        cover: wallpaper.cover,
      })
    } else {
      setFormData({
        name: "",
        cover: "",
      })
    }
  }, [wallpaper])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{wallpaper ? "Editar Wallpaper" : "Adicionar novo Wallpaper"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover" className="text-right">
              Cover URL
            </Label>
            <Input id="cover" value={formData.cover} onChange={handleChange} className="col-span-3" required />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
