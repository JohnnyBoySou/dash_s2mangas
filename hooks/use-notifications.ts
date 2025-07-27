"use client"

import { useState, useEffect, useCallback } from "react"
import { NotificationsService, type NotificationCreateRequest } from "@/services/notifications-service"
import type { Notification, Pagination } from "@/types/database"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const fetchNotifications = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true)
      setError(null) // Limpa qualquer erro anterior
      const response = await NotificationsService.list(page, limit)
      if (response) {
        setNotifications(response.data || [])
        setPagination(response.pagination)
        setCurrentPage(page)
      } else {
        setNotifications([])
        setPagination(null)
      }
    } catch (err) {
      setError(err as Error)
      setNotifications([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchNotifications(1)
  }, [fetchNotifications])

  const addNotification = useCallback(async (newNotification: NotificationCreateRequest) => {
    try {
      const added = await NotificationsService.create(newNotification)
      if (added) {
        // Recarrega a primeira página para mostrar o novo item
        await fetchNotifications(1)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [fetchNotifications])

  const updateNotification = useCallback(async (updatedNotification: Notification) => {
    try {
      const updated = await NotificationsService.edit(updatedNotification.id, {
        id: updatedNotification.id,
        title: updatedNotification.title,
        message: updatedNotification.message,
        type: updatedNotification.type,
        data: updatedNotification.data,
        cover: updatedNotification.cover,
      })
      if (updated) {
        setNotifications((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const deleteNotification = useCallback(async (id: string) => {
    try {
      // Limpa qualquer erro anterior
      setError(null)
      
      await NotificationsService.delete(id)
      
      // Verifica se a página atual ficará vazia após a exclusão
      const currentNotificationsCount = notifications.length
      const willPageBeEmpty = currentNotificationsCount === 1
      const shouldGoToPreviousPage = willPageBeEmpty && currentPage > 1
      
      // Faz o refetch dos dados atualizados
      if (shouldGoToPreviousPage) {
        await fetchNotifications(currentPage - 1)
      } else {
        await fetchNotifications(currentPage)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [notifications.length, currentPage, fetchNotifications])

  const goToPage = useCallback((page: number) => {
    fetchNotifications(page)
  }, [fetchNotifications])

  const nextPage = useCallback(() => {
    if (pagination?.next) {
      fetchNotifications(currentPage + 1)
    }
  }, [pagination?.next, currentPage, fetchNotifications])

  const prevPage = useCallback(() => {
    if (pagination?.prev) {
      fetchNotifications(currentPage - 1)
    }
  }, [pagination?.prev, currentPage, fetchNotifications])

  return { 
    notifications, 
    pagination,
    currentPage,
    isLoading, 
    error, 
    addNotification, 
    updateNotification, 
    deleteNotification, 
    fetchNotifications,
    goToPage,
    nextPage,
    prevPage
  }
}