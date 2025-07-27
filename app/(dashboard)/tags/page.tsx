"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Tag as TagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTags } from "@/hooks/use-tags"
import type { Tag } from "@/types/database"
import type { TagCreateRequest, TagUpdateRequest } from "@/services/tag-service"

interface TagModalProps {
  isOpen: boolean
  onClose: () => void
  tag: Tag | null
  onSave: (tag: TagCreateRequest | TagUpdateRequest) => void
}

function TagModal({ isOpen, onClose, tag, onSave }: TagModalProps) {
  const [name, setName] = useState(tag?.name || "")
  const [color, setColor] = useState(tag?.color || "#3b82f6")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tag) {
      onSave({ id: tag.id, name, color })
    } else {
      onSave({ name, color })
    }
    onClose()
    setName("")
    setColor("#3b82f6")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tag ? "Editar Tag" : "Criar Nova Tag"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Nome da tag"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Cor
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Badge
                variant="outline"
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: color,
                  color: color
                }}
              >
                {name || "Preview"}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {tag ? "Salvar Alterações" : "Criar Tag"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function TagsPage() {
  const { tags, isLoading, error, addTag, updateTag, deleteTag, clearError } = useTags()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const handleCreateTag = () => {
    setSelectedTag(null)
    setIsModalOpen(true)
  }

  const handleEditTag = (tag: Tag) => {
    setSelectedTag(tag)
    setIsModalOpen(true)
  }

  const handleSaveTag = async (tagData: TagCreateRequest | TagUpdateRequest) => {
    try {
      if ('id' in tagData) {
        await updateTag(tagData)
      } else {
        await addTag(tagData)
      }
    } catch (error) {
      console.error('Erro ao salvar tag:', error)
    }
  }

  const handleDeleteTag = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta tag?')) {
      try {
        await deleteTag(id)
      } catch (error) {
        console.error('Erro ao deletar tag:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">Carregando tags...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Tags</h1>
          <p className="text-muted-foreground">
            Crie e gerencie tags para organizar suas playlists
          </p>
        </div>
        <Button onClick={handleCreateTag}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tag
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={clearError}>
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tags.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <TagIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma tag encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Comece criando sua primeira tag para organizar suas playlists
              </p>
              <Button onClick={handleCreateTag}>
                <Plus className="mr-2 h-4 w-4" />
                Criar primeira tag
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <Card key={tag.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: tag.color ? `${tag.color}20` : undefined,
                      borderColor: tag.color || undefined,
                      color: tag.color || undefined
                    }}
                  >
                    {tag.name}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTag(tag)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <span className="text-sm font-mono">{tag.id}</span>
                  </div>
                  {tag.color && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Cor:</span>
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-sm font-mono">{tag.color}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Criada em:</span>
                    <span className="text-sm">
                      {new Date(tag.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tag={selectedTag}
        onSave={handleSaveTag}
      />
    </div>
  )
}