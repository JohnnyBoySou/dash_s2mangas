import type { Wallpaper, WallpaperListResponse, WallpaperSingleResponse, WallpaperImage } from "@/types/database"
import { get, post, del, put } from "./api-service"

// QUERY_KEYS
const LIST_WALLPAPERS = "LIST_WALLPAPERS"
const GET_WALLPAPER = "GET_WALLPAPER"

const ROUTE_API = "/wallpapers"
const ROUTE_ADMIN_API = "/admin/wallpapers"

// INTERFACES
export interface WallpaperCreateRequest {
  name: string
  cover: string
}

export interface WallpaperUpdateRequest extends WallpaperCreateRequest {
  id: string
}

export interface WallpaperImageCreateRequest {
  url: string
  wallpaperId: string
}

export interface WallpaperImageUpdateRequest extends WallpaperImageCreateRequest {
  id: string
}

// FUNCTIONS
export const WallpapersService = {
  async list(page: number = 1, limit: number = 10): Promise<WallpaperListResponse | null> {
    try {
      const res = await get<WallpaperListResponse>(`${ROUTE_API}?page=${page}&limit=${limit}`)
      console.log(res.data)
      return res?.data as WallpaperListResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na listagem de wallpapers')
    }
  },

  async getById(id: string, page: number = 1, limit: number = 20): Promise<WallpaperSingleResponse | null> {
    try {
      const res = await get<WallpaperSingleResponse>(`${ROUTE_API}/${id}?page=${page}&limit=${limit}`)
      console.log(res.data)
      return res?.data as WallpaperSingleResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar wallpaper')
    }
  },

  async create(data: WallpaperCreateRequest): Promise<Wallpaper | null> {
    try {
      const res = await post<Wallpaper>(`${ROUTE_ADMIN_API}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Wallpaper
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na criação de wallpaper')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await del(`${ROUTE_ADMIN_API}/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar wallpaper')
    }
  },

  async edit(id: string, data: WallpaperUpdateRequest): Promise<Wallpaper | null> {
    try {
      const res = await put<Wallpaper>(`${ROUTE_ADMIN_API}/${id}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Wallpaper
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao editar wallpaper')
    }
  },

  // Funções para gerenciar imagens
  async addImage(data: WallpaperImageCreateRequest): Promise<WallpaperImage | null> {
    try {
      const res = await post<WallpaperImage>(`${ROUTE_ADMIN_API}/${data.wallpaperId}/images`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as WallpaperImage
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao adicionar imagem')
    }
  },

  async updateImage(imageId: string, data: WallpaperImageUpdateRequest): Promise<WallpaperImage | null> {
    try {
      const res = await put<WallpaperImage>(`${ROUTE_ADMIN_API}/${data.wallpaperId}/images/${imageId}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as WallpaperImage
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao editar imagem')
    }
  },

  async toggleImage(wallpaperId: string, imageId: string): Promise<void> {
    try {
      await post(`${ROUTE_API}/${wallpaperId}/toggle`, { imageId } as unknown as Record<string, unknown>)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao fazer toggle da imagem')
    }
  },

  QUERY_KEY: {
    LIST_WALLPAPERS,
    GET_WALLPAPER,
  }
}
