"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Notification } from "@/types/database"
import type { NotificationCreateRequest } from "@/services/notifications-service"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (notification: NotificationCreateRequest) => void
  notification: Notification | null
}

export function NotificationModal({ isOpen, onClose, onSave, notification }: NotificationModalProps) {
  const [formData, setFormData] = useState<NotificationCreateRequest>({
    title: "",
    message: "",
    type: "NEWS",
    data: null,
    cover: "",
  })

  useEffect(() => {
    if (notification) {
      setFormData({
        title: notification.title,
        message: notification.message,
        type: notification.type,
        data: notification.data,
        cover: notification.cover || "",
      })
    } else {
      setFormData({
        title: "",
        message: "",
        type: "NEWS",
        data: null,
        cover: "",
      })
    }
  }, [notification])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleTypeChange = (value: "NEWS" | "UPDATE" | "WARNING" | "ERROR") => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{notification ? "Editar Notificação" : "Adicionar Nova Notificação"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="col-span-3" 
              required 
              placeholder="Digite o título da notificação"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Mensagem
            </Label>
            <Textarea 
              id="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="col-span-3" 
              required 
              placeholder="Digite a mensagem da notificação"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEWS">Notícia</SelectItem>
                <SelectItem value="UPDATE">Atualização</SelectItem>
                <SelectItem value="WARNING">Aviso</SelectItem>
                <SelectItem value="ERROR">Erro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover" className="text-right">
              Cover (URL)
            </Label>
            <Input 
              id="cover" 
              value={formData.cover || ""} 
              onChange={handleChange} 
              className="col-span-3" 
              placeholder="URL da imagem de cover (opcional)"
              type="url"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {notification ? "Salvar Alterações" : "Criar Notificação"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
