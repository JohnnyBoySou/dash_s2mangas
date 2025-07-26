"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Manga } from "@/types/manga"

interface MangaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (manga: Manga) => void
  manga: Manga | null
}

export function MangaModal({ isOpen, onClose, onSave, manga }: MangaModalProps) {
  const [formData, setFormData] = useState<Manga>({
    id: "",
    title: "",
    author: "",
    genre: "",
    status: "Ongoing",
    description: "",
    coverImage: "",
    views: 0,
    rating: 0,
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (manga) {
      setFormData(manga)
    } else {
      setFormData({
        id: "",
        title: "",
        author: "",
        genre: "",
        status: "Ongoing",
        description: "",
        coverImage: "",
        views: 0,
        rating: 0,
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [manga])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, updatedAt: new Date().toISOString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{manga ? "Edit Manga" : "Add New Manga"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input id="author" value={formData.author} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">
              Genre
            </Label>
            <Input id="genre" value={formData.genre} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <select id="status" value={formData.status} onChange={handleChange} className="col-span-3 input-field">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Hiatus">Hiatus</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coverImage" className="text-right">
              Cover Image URL
            </Label>
            <Input id="coverImage" value={formData.coverImage} onChange={handleChange} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
