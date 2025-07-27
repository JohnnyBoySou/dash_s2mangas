"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/notifications-table/columns"
import { NotificationModal } from "@/components/modals/notification-modal"
import { useNotifications } from "@/hooks/use-notifications"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@/types/database"
import type { NotificationCreateRequest } from "@/services/notifications-service"

export default function NotificationsPage() {
  const { 
    notifications, 
    pagination,
    currentPage,
    isLoading, 
    error, 
    addNotification, 
    updateNotification, 
    deleteNotification,
    goToPage,
    nextPage,
    prevPage
  } = useNotifications()
  
  const { toast } = useToast()
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

  const handleSaveNotification = async (notificationData: NotificationCreateRequest) => {
    try {
      if (selectedNotification) {
        await updateNotification({
          ...selectedNotification,
          ...notificationData,
        })
        toast({
          title: "Sucesso",
          description: "Notificação atualizada com sucesso!",
        })
      } else {
        await addNotification(notificationData)
        toast({
          title: "Sucesso",
          description: "Notificação criada com sucesso!",
        })
      }
      handleModalClose()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar notificação. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNotification = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta notificação?")) {
      try {
        await deleteNotification(id)
        toast({
          title: "Sucesso",
          description: "Notificação excluída com sucesso!",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao excluir notificação. Tente novamente.",
          variant: "destructive",
        })
      }
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Erro ao carregar notificações</h1>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notificações</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Notificação
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <p>Carregando notificações...</p>
        </div>
      ) : (
        <>
          <DataTable 
            columns={columns(handleEditClick, handleDeleteNotification)} 
            data={notifications} 
          />
          
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Página {currentPage} de {pagination.totalPages} ({pagination.total} total)
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={!pagination.prev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={!pagination.next}
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveNotification}
        notification={selectedNotification}
      />
    </div>
  )
}
