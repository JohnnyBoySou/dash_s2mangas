"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Language } from "@/types/database"

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (language: Language) => void
  language: Language | null
}

export function LanguageModal({ isOpen, onClose, onSave, language }: LanguageModalProps) {
  const [formData, setFormData] = useState<Language>({
    id: "",
    name: "",
    code: "",
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    if (language) {
      setFormData(language)
    } else {
      setFormData({
        id: "",
        name: "",
        code: "",
        createdAt: "",
        updatedAt: "",
      })
    }
  }, [language])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <DialogTitle>{language ? "Edit Language" : "Add New Language"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input id="code" value={formData.code} onChange={handleChange} className="col-span-3" required />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
