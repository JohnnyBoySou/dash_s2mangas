"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X } from "lucide-react"
import type { Playlist } from "@/types/database"
import type { PlaylistCreateRequest } from "@/services/playlist-service"
import { useTags } from "@/hooks/use-tags"

interface PlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (playlist: Playlist | PlaylistCreateRequest) => void
  playlist: Playlist | null
}

export function PlaylistModal({ isOpen, onClose, onSave, playlist }: PlaylistModalProps) {
  const { tags, isLoading: isLoadingTags } = useTags()
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<PlaylistCreateRequest>({
    name: "",
    cover: "",
    link: "",
    description: "",
    tags: [],
  })

  useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist.name,
        cover: playlist.cover,
        link: playlist.link,
        description: playlist.description,
        tags: playlist.tags?.map(tag => tag.id) || [],
      })
    } else {
      setFormData({
        name: "",
        cover: "",
        link: "",
        description: "",
        tags: [],
      })
    }
    // Reset search term when modal opens/closes
    setSearchTerm("")
  }, [playlist, isOpen])

  // Filter tags based on search term
  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return tags
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [tags, searchTerm])

  // Get selected tags for display
  const selectedTags = useMemo(() => {
    return tags.filter(tag => formData.tags?.includes(tag.id))
  }, [tags, formData.tags])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...(prev.tags || []), tagId]
    }))
  }

  const handleRemoveTag = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter(id => id !== tagId) || []
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playlist) {
      // Editando playlist existente - incluir as tags
      const selectedTags = tags.filter(tag => formData.tags?.includes(tag.id)) || []
      const updatedPlaylist: Playlist = {
        ...playlist,
        name: formData.name,
        cover: formData.cover,
        link: formData.link,
        description: formData.description,
        updatedAt: new Date().toISOString(),
        // Incluir as tags selecionadas como objetos Tag
        tags: selectedTags
      }
      onSave(updatedPlaylist)
    } else {
      // Criando nova playlist
      onSave(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{playlist ? "Editar Playlist" : "Adicionar Nova Playlist"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="col-span-3" 
                placeholder="Nome da playlist"
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cover" className="text-right">
                Capa (URL)
              </Label>
              <Input 
                id="cover" 
                value={formData.cover} 
                onChange={handleChange} 
                className="col-span-3" 
                placeholder="https://exemplo.com/imagem.jpg"
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input 
                id="link" 
                value={formData.link} 
                onChange={handleChange} 
                className="col-span-3" 
                placeholder="https://open.spotify.com/playlist/..."
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={handleChange} 
                className="col-span-3" 
                placeholder="Descrição da playlist"
                rows={3}
              />
            </div>
            
            {/* Seção de Tags */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Tags
              </Label>
              <div className="col-span-3 space-y-3">
                {/* Tags Selecionadas */}
                {selectedTags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags Selecionadas:</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="default"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            backgroundColor: tag.color || undefined,
                            borderColor: tag.color || undefined 
                          }}
                          onClick={() => handleRemoveTag(tag.id)}
                        >
                          {tag.name}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Campo de Pesquisa */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Buscar Tags:</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Digite para buscar tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Lista de Tags Disponíveis */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tags Disponíveis:</Label>
                  {isLoadingTags ? (
                    <p className="text-sm text-muted-foreground">Carregando tags...</p>
                  ) : filteredTags.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {searchTerm ? "Nenhuma tag encontrada" : "Nenhuma tag disponível"}
                    </p>
                  ) : (
                    <ScrollArea className="h-32 w-full border rounded-md p-2">
                      <div className="flex flex-wrap gap-2">
                        {filteredTags.map((tag) => {
                          const isSelected = formData.tags?.includes(tag.id)
                          return (
                            <Badge
                              key={tag.id}
                              variant={isSelected ? "default" : "outline"}
                              className="cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105"
                              style={{ 
                                backgroundColor: isSelected 
                                  ? tag.color || undefined 
                                  : tag.color ? `${tag.color}20` : undefined,
                                borderColor: tag.color || undefined 
                              }}
                              onClick={() => handleTagToggle(tag.id)}
                            >
                              {tag.name}
                              {isSelected && <X className="ml-1 h-3 w-3" />}
                            </Badge>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {playlist ? "Salvar Alterações" : "Criar Playlist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
