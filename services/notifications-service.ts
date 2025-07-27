import type { Notification, NotificationListResponse } from "@/types/database"
import { get, post, del, put } from "./api-service"

// QUERY_KEYS
const LIST_NOTIFICATIONS = "LIST_NOTIFICATIONS"

const ROUTE_API = "/notifications"
const ROUTE_ADMIN_API = "/admin/notifications"

// INTERFACES
export interface NotificationCreateRequest {
  title: string
  message: string
  type: "NEWS" | "UPDATE" | "WARNING" | "ERROR"
  data?: any
  cover?: string // URL da imagem de cover (opcional)
}

export interface NotificationUpdateRequest extends NotificationCreateRequest {
  id: string
}

// FUNCTIONS
export const NotificationsService = {
  async list(page: number = 1, limit: number = 10): Promise<NotificationListResponse | null> {
    try {
      const res = await get<NotificationListResponse>(`${ROUTE_API}?page=${page}&limit=${limit}`)
      console.log(res.data)
      return res?.data as NotificationListResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na listagem de notificações')
    }
  },

  async single(id: string): Promise<Notification | null> {
    try {
      const res = await get<Notification>(`${ROUTE_API}/${id}`)
      console.log(res.data)
      return res?.data as Notification
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar notificação')
    }
  },

  async create(data: NotificationCreateRequest): Promise<Notification | null> {
    try {
      const res = await post<Notification>(`${ROUTE_ADMIN_API}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Notification
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na criação de notificação')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await del(`${ROUTE_ADMIN_API}/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar notificação')
    }
  },

  async edit(id: string, data: NotificationUpdateRequest): Promise<Notification | null> {
    try {
      const res = await put<Notification>(`${ROUTE_ADMIN_API}/${id}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Notification
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao editar notificação')
    }
  },

  QUERY_KEY: {
    LIST_NOTIFICATIONS,
  }
}