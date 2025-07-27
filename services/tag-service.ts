import type { Tag, TagListResponse } from "@/types/database"
import { get, post, del, put } from "./api-service"

// QUERY_KEYS
const LIST_TAGS = "LIST_TAGS"

const ROUTE_API = "/playlists/tags"
const ROUTE_ADMIN_API = "/admin/playlists/tags"

// INTERFACES
export interface TagCreateRequest {
  name: string
  color?: string
}

export interface TagUpdateRequest extends TagCreateRequest {
  id: string
}

// FUNCTIONS
export const TagService = {
  QUERY_KEY: {
    list: () => [LIST_TAGS],
  },

  async list(): Promise<TagListResponse | null> {
    try {
      const res = await get<TagListResponse>(`${ROUTE_API}/all`)
      return res?.data as TagListResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao buscar tags')
    }
  },

  async create(tag: TagCreateRequest): Promise<Tag | null> {
    try {
      const res = await post<Tag>(ROUTE_ADMIN_API, tag as unknown as Record<string, unknown>)
      return res?.data as Tag
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao criar tag')
    }
  },

  async edit(tag: TagUpdateRequest): Promise<Tag | null> {
    try {
      const { id, ...tagData } = tag
      const res = await put<Tag>(`${ROUTE_ADMIN_API}/${id}`, tagData as unknown as Record<string, unknown>)
      return res?.data as Tag
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao editar tag')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await del(`${ROUTE_ADMIN_API}/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar tag')
    }
  },
}