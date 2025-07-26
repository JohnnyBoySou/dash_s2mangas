"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/notifications-table/columns"
import { NotificationModal } from "@/components/modals/notification-modal"
import { useAuth } from "@/contexts/auth-context"
import type { Notification } from "@/types/database"

export default function NotificationsPage() {
  const { notifications, addNotification, updateNotification, deleteNotification } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const handleAddClick = () => {
    setSelectedNotification(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedNotification(null)
  }

  const handleSaveNotification = (notification: Notification) => {
    if (selectedNotification) {
      updateNotification(notification)
    } else {
      addNotification(notification)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Notification
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteNotification)} data={notifications} />
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveNotification}
        notification={selectedNotification}
      />
    </div>
  )
}
