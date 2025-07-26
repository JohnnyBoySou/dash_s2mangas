"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Review } from "@/types/database"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (review: Review) => void
  review: Review | null
}

export function ReviewModal({ isOpen, onClose, onSave, review }: ReviewModalProps) {
  const [formData, setFormData] = useState<Review>({
    id: "",
    mangaId: "",
    userId: "",
    rating: 0,
    comment: "",
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (review) {
      setFormData(review)
    } else {
      setFormData({
        id: "",
        mangaId: "",
        userId: "",
        rating: 0,
        comment: "",
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [review])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, rating: Number(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, updatedAt: new Date().toISOString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{review ? "Edit Review" : "Add New Review"}</DialogTitle>
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
            <Label htmlFor="rating" className="text-right">
              Rating (1-5)
            </Label>
            <Input
              id="rating"
              type="number"
              value={formData.rating}
              onChange={handleRatingChange}
              min="1"
              max="5"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea id="comment" value={formData.comment} onChange={handleChange} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
