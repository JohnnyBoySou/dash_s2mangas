"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [name, setName] = useState("Seu Nome")
  const [email, setEmail] = useState("seu.email@example.com")
  const [receiveEmailNotifications, setReceiveEmailNotifications] = useState(true)
  const [receivePushNotifications, setReceivePushNotifications] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const handleGeneralSave = () => {
    console.log("General settings saved:", { name, email })
    // Lógica para salvar no backend
  }

  const handleNotificationSave = () => {
    console.log("Notification settings saved:", { receiveEmailNotifications, receivePushNotifications })
    // Lógica para salvar no backend
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      alert("As novas senhas não coincidem!")
      return
    }
    console.log("Password changed:", { currentPassword, newPassword })
    // Lógica para alterar senha no backend
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  return (
    <div className="space-y-6 p-6 md:p-8 lg:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      <p className="text-muted-foreground">Gerencie as configurações da sua conta e preferências.</p>

      <Separator />

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>Atualize suas informações de perfil.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@example.com"
            />
          </div>
          <Button onClick={handleGeneralSave}>Salvar Alterações</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Gerencie suas preferências de notificação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Notificações por Email</Label>
            <Switch
              id="email-notifications"
              checked={receiveEmailNotifications}
              onCheckedChange={setReceiveEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Notificações Push</Label>
            <Switch
              id="push-notifications"
              checked={receivePushNotifications}
              onCheckedChange={setReceivePushNotifications}
            />
          </div>
          <Button onClick={handleNotificationSave}>Salvar Preferências</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>Altere sua senha.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Sua senha atual"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Sua nova senha"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
            />
          </div>
          <Button onClick={handlePasswordChange}>Alterar Senha</Button>
        </CardContent>
      </Card>
    </div>
  )
}
