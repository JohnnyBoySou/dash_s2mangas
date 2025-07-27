import type { Manga, MangaListResponse, MangaCreateRequest, MangaUpdateRequest } from "@/types/manga"
import { get, post, del, patch } from "./api-service"

// QUERY_KEYS
const LIST_MANGAS = "LIST_MANGAS"
const SINGLE_MANGA = "SINGLE_MANGA"

const ROUTE_API = "/mangas"
const ROUTE_ADMIN_API = "/admin/mangas"

// INTERFACES
export interface MangaFilters {
  search?: string
  status?: string
  type?: string
  categories?: string[]
  language?: string
}

// FUNCTIONS
export const MangaService = {
  async list(page: number = 1, limit: number = 10, filters?: MangaFilters): Promise<MangaListResponse | null> {
    try {
      let url = `${ROUTE_ADMIN_API}?page=${page}&limit=${limit}`
      
      if (filters) {
        if (filters.search) url += `&search=${encodeURIComponent(filters.search)}`
        if (filters.status) url += `&status=${encodeURIComponent(filters.status)}`
        if (filters.type) url += `&type=${encodeURIComponent(filters.type)}`
        if (filters.language) url += `&language=${encodeURIComponent(filters.language)}`
        if (filters.categories && filters.categories.length > 0) {
          url += `&categories=${filters.categories.join(',')}`
        }
      }
      
      const res = await get<MangaListResponse>(url)
      console.log(res.data)
      return res?.data as MangaListResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na listagem de mangás')
    }
  },

  async single(id: string): Promise<Manga | null> {
    try {
      const res = await get<Manga>(`${ROUTE_API}/${id}`)
      console.log(res.data)
      return res?.data as Manga
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar mangá')
    }
  },

  async create(data: MangaCreateRequest): Promise<Manga | null> {
    try {
      const res = await post<Manga>(`${ROUTE_ADMIN_API}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Manga
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na criação de mangá')
    }
  },

  async update(id: string, data: MangaUpdateRequest): Promise<Manga | null> {
    try {
      const res = await patch<Manga>(`${ROUTE_ADMIN_API}/${id}`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as Manga
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao atualizar mangá')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await del(`${ROUTE_ADMIN_API}/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar mangá')
    }
  },

  // Métodos auxiliares
  async getByUuid(manga_uuid: string): Promise<Manga | null> {
    try {
      const res = await get<Manga>(`${ROUTE_API}/uuid/${manga_uuid}`)
      console.log(res.data)
      return res?.data as Manga
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar mangá por UUID')
    }
  },

  async getCategories(): Promise<{ id: string; name: string }[] | null> {
    try {
      const res = await get<{ id: string; name: string }[]>(`${ROUTE_API}/categories`)
      console.log(res.data)
      return res?.data as { id: string; name: string }[]
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar categorias')
    }
  },

  async getLanguages(): Promise<{ id: string; code: string; name: string }[] | null> {
    try {
      const res = await get<{ id: string; code: string; name: string }[]>(`${ROUTE_API}/languages`)
      console.log(res.data)
      return res?.data as { id: string; code: string; name: string }[]
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar idiomas')
    }
  },

  QUERY_KEY: {
    LIST_MANGAS,
    SINGLE_MANGA,
  }
}
