"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Comment } from "@/types/database"

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (comment: Comment) => void
  comment: Comment | null
}

export function CommentModal({ isOpen, onClose, onSave, comment }: CommentModalProps) {
  const [formData, setFormData] = useState<Comment>({
    id: "",
    mangaId: "",
    userId: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (comment) {
      setFormData(comment)
    } else {
      setFormData({
        id: "",
        mangaId: "",
        userId: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [comment])

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
          <DialogTitle>{comment ? "Edit Comment" : "Add New Comment"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mangaId" className="text-right">
              Manga ID
            </Label>
            <Input id="mangaId" value={formData.mangaId} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              User ID
            </Label>
            <Input id="userId" value={formData.userId} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea id="content" value={formData.content} onChange={handleChange} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
