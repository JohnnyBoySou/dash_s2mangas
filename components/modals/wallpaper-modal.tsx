"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Wallpaper } from "@/types/database"

interface WallpaperModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (wallpaper: Wallpaper) => void
  wallpaper: Wallpaper | null
}

export function WallpaperModal({ isOpen, onClose, onSave, wallpaper }: WallpaperModalProps) {
  const [formData, setFormData] = useState<Wallpaper>({
    id: "",
    title: "",
    imageUrl: "",
    category: "",
    tags: [],
    uploaderId: "",
    views: 0,
    downloads: 0,
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (wallpaper) {
      setFormData(wallpaper)
    } else {
      setFormData({
        id: "",
        title: "",
        imageUrl: "",
        category: "",
        tags: [],
        uploaderId: "",
        views: 0,
        downloads: 0,
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [wallpaper])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, tags: value.split(",").map((s) => s.trim()) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, updatedAt: new Date().toISOString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{wallpaper ? "Edit Wallpaper" : "Add New Wallpaper"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" value={formData.category} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags (comma-separated)
            </Label>
            <Textarea id="tags" value={formData.tags.join(", ")} onChange={handleTagsChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uploaderId" className="text-right">
              Uploader ID
            </Label>
            <Input
              id="uploaderId"
              value={formData.uploaderId}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="views" className="text-right">
              Views
            </Label>
            <Input
              id="views"
              type="number"
              value={formData.views}
              onChange={handleNumberChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="downloads" className="text-right">
              Downloads
            </Label>
            <Input
              id="downloads"
              type="number"
              value={formData.downloads}
              onChange={handleNumberChange}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
