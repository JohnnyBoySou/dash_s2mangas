"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Playlist } from "@/types/database"

interface PlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (playlist: Playlist) => void
  playlist: Playlist | null
}

export function PlaylistModal({ isOpen, onClose, onSave, playlist }: PlaylistModalProps) {
  const [formData, setFormData] = useState<Playlist>({
    id: "",
    userId: "",
    name: "",
    description: "",
    coverImage: "",
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (playlist) {
      setFormData(playlist)
    } else {
      setFormData({
        id: "",
        userId: "",
        name: "",
        description: "",
        coverImage: "",
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [playlist])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <DialogTitle>{playlist ? "Edit Playlist" : "Add New Playlist"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              User ID
            </Label>
            <Input id="userId" value={formData.userId} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
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
