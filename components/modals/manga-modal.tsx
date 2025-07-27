"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Manga, MangaCreateRequest, MangaUpdateRequest } from "@/types/manga"

interface MangaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (manga: MangaCreateRequest | MangaUpdateRequest) => Promise<void>
  manga: Manga | null
  isLoading?: boolean
}

export function MangaModal({ isOpen, onClose, onSave, manga, isLoading = false }: MangaModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: "",
    status: "ongoing" as "ongoing" | "completed" | "hiatus" | "cancelled",
    type: "manga" as "manga" | "manhwa" | "manhua" | "novel",
    manga_uuid: "",
    categories: [] as string[],
    translations: [] as { language: string; name: string; description: string }[],
    languages: [] as string[],
  })

  useEffect(() => {
    if (manga) {
      setFormData({
        title: manga.title || "",
        description: manga.description || "",
        cover: manga.cover || "",
        status: (manga.status as "ongoing" | "completed" | "hiatus" | "cancelled") || "ongoing",
        type: (manga.type as "manga" | "manhwa" | "manhua" | "novel") || "manga",
        manga_uuid: manga.manga_uuid || "",
        categories: manga.categories?.map(cat => cat.id) || [],
        translations: manga.translations || [],
        languages: manga.languages?.map(lang => lang.id) || [],
      })
    } else {
      setFormData({
        title: "",
        description: "",
        cover: "",
        status: "ongoing",
        type: "manga",
        manga_uuid: "",
        categories: [],
        translations: [],
        languages: [],
      })
    }
  }, [manga])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('=== FORM SUBMIT START ===')
    console.log('Form submitted with data:', formData)
    console.log('Manga prop:', manga)
    
    // Teste simples primeiro
    const testData = {
      cover: "https://example.com/cover.jpg",
      status: "ongoing",
      type: "manga",
      releaseDate: new Date().toISOString(),
      manga_uuid: `test-${Date.now()}`,
      categories: [],
      translations: [
        {
          language: "pt-BR",
          name: "Teste Manga",
          description: "Descrição de teste"
        }
      ]
    }
    
    try {
      if (manga) {
        // Para atualização
        const updateData: MangaUpdateRequest = {
          id: manga.id,
          ...testData
        }
        console.log('=== CALLING onSave WITH UPDATE DATA ===')
        console.log('updateData:', updateData)
        await onSave(updateData)
      } else {
        // Para criação
        const createData: MangaCreateRequest = testData
        console.log('=== CALLING onSave WITH CREATE DATA ===')
        console.log('createData:', createData)
        await onSave(createData)
      }
      console.log('=== onSave COMPLETED SUCCESSFULLY ===')
    } catch (error) {
      console.error('=== ERROR IN onSave ===')
      console.error('Error:', error)
    }
    
    console.log('=== FORM SUBMIT END ===')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{manga ? "Editar Mangá" : "Adicionar Novo Mangá"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manga_uuid" className="text-right">
              UUID
            </Label>
            <Input id="manga_uuid" value={formData.manga_uuid} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <select id="type" value={formData.type} onChange={handleChange} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="manga">Manga</option>
              <option value="manhwa">Manhwa</option>
              <option value="manhua">Manhua</option>
              <option value="novel">Novel</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <select id="status" value={formData.status} onChange={handleChange} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="ongoing">Em Andamento</option>
              <option value="completed">Completo</option>
              <option value="hiatus">Hiato</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover" className="text-right">
              URL da Capa
            </Label>
            <Input id="cover" value={formData.cover} onChange={handleChange} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
