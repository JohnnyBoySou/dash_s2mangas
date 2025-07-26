"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Chapter } from "@/types/database"

interface ChapterModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (chapter: Chapter) => void
  chapter: Chapter | null
}

export function ChapterModal({ isOpen, onClose, onSave, chapter }: ChapterModalProps) {
  const [formData, setFormData] = useState<Chapter>({
    id: "",
    mangaId: "",
    chapterNumber: 0,
    title: "",
    releaseDate: "",
    views: 0,
    pages: [],
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (chapter) {
      setFormData(chapter)
    } else {
      setFormData({
        id: "",
        mangaId: "",
        chapterNumber: 0,
        title: "",
        releaseDate: "",
        views: 0,
        pages: [],
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [chapter])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const handlePagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, pages: value.split(",").map((s) => s.trim()) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, updatedAt: new Date().toISOString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{chapter ? "Edit Chapter" : "Add New Chapter"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mangaId" className="text-right">
              Manga ID
            </Label>
            <Input id="mangaId" value={formData.mangaId} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chapterNumber" className="text-right">
              Chapter Number
            </Label>
            <Input
              id="chapterNumber"
              type="number"
              value={formData.chapterNumber}
              onChange={handleNumberChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="releaseDate" className="text-right">
              Release Date
            </Label>
            <Input
              id="releaseDate"
              type="date"
              value={formData.releaseDate}
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
            <Label htmlFor="pages" className="text-right">
              Pages (comma-separated URLs)
            </Label>
            <Textarea
              id="pages"
              value={formData.pages.join(", ")}
              onChange={handlePagesChange}
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
