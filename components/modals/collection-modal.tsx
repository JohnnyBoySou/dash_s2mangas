"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Collection } from "@/types/database"

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (collection: Collection) => void
  collection: Collection | null
}

export function CollectionModal({ isOpen, onClose, onSave, collection }: CollectionModalProps) {
  const [formData, setFormData] = useState<Collection>({
    id: "",
    userId: "",
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (collection) {
      setFormData(collection)
    } else {
      setFormData({
        id: "",
        userId: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [collection])

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
          <DialogTitle>{collection ? "Edit Collection" : "Add New Collection"}</DialogTitle>
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
