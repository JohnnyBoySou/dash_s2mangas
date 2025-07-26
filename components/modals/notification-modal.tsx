"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Notification } from "@/types/database"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (notification: Notification) => void
  notification: Notification | null
}

export function NotificationModal({ isOpen, onClose, onSave, notification }: NotificationModalProps) {
  const [formData, setFormData] = useState<Notification>({
    id: "",
    userId: "",
    type: "info",
    message: "",
    isRead: false,
    createdAt: "",
  })

  useEffect(() => {
    if (notification) {
      setFormData(notification)
    } else {
      setFormData({
        id: "",
        userId: "",
        type: "info",
        message: "",
        isRead: false,
        createdAt: "",
      })
    }
  }, [notification])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, createdAt: formData.createdAt || new Date().toISOString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{notification ? "Edit Notification" : "Add New Notification"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              User ID
            </Label>
            <Input id="userId" value={formData.userId} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select id="type" value={formData.type} onChange={handleChange} className="col-span-3 input-field">
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isRead" className="text-right">
              Is Read
            </Label>
            <input
              id="isRead"
              type="checkbox"
              checked={formData.isRead}
              onChange={handleCheckboxChange}
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
