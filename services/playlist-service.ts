import type { Playlist, PlaylistListResponse } from "@/types/database"
import { get, post, del, put, } from "./api-service"

// QUERY_KEYS
const LIST_PLAYLISTS = "LIST_PLAYLISTS"

const ROUTE_API = "/playlists"
const ROUTE_ADMIN_API = "/admin/playlists"

// INTERFACES
export interface PlaylistCreateRequest {
  name: string
  cover: string
  link: string
  description: string
  tags?: string[] // IDs das tags
}

export interface PlaylistUpdateRequest extends PlaylistCreateRequest {
  id: string
}

// FUNCTIONS
export const PlaylistsService = {
  async list(page: number = 1, limit: number = 10): Promise<PlaylistListResponse | null> {
    try {
      const res = await get<any>(`${ROUTE_API}?page=${page}&limit=${limit}`)
      console.log('Raw response:', res.data)
      
      // Transformar a estrutura das tags se necessário
      if (res?.data?.data) {
        const transformedData = {
          ...res.data,
          data: res.data.data.map((playlist: any) => ({
            ...playlist,
            tags: playlist.tags?.map((playlistTag: any) => 
              playlistTag.tag ? playlistTag.tag : playlistTag
            ) || []
          }))
        }
        console.log('Transformed response:', transformedData)
        return transformedData as PlaylistListResponse
      }
      
      return res?.data as PlaylistListResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na listagem de playlists')
    }
  },

  async single(id: string){

  },

  async create(data: PlaylistCreateRequest): Promise<Playlist | null> {
    try {
      const res = await post<any>(`${ROUTE_ADMIN_API}`, data as unknown as Record<string, unknown>)
      console.log('Create response:', res.data)
      
      // Transformar a estrutura das tags se necessário
      if (res?.data?.tags) {
        const transformedPlaylist = {
          ...res.data,
          tags: res.data.tags.map((playlistTag: any) => 
            playlistTag.tag ? playlistTag.tag : playlistTag
          )
        }
        console.log('Transformed create response:', transformedPlaylist)
        return transformedPlaylist as Playlist
      }
      
      return res?.data as Playlist
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na criação de playlist')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await del(`${ROUTE_ADMIN_API}/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar playlist')
    }
  },

  async edit(id: string, data: PlaylistUpdateRequest): Promise<Playlist | null> {
    try {
      const res = await put<any>(`${ROUTE_ADMIN_API}/${id}`, data as unknown as Record<string, unknown>)
      console.log('Edit response:', res.data)
      
      // Transformar a estrutura das tags se necessário
      if (res?.data?.tags) {
        const transformedPlaylist = {
          ...res.data,
          tags: res.data.tags.map((playlistTag: any) => 
            playlistTag.tag ? playlistTag.tag : playlistTag
          )
        }
        console.log('Transformed edit response:', transformedPlaylist)
        return transformedPlaylist as Playlist
      }
      
      return res?.data as Playlist
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao editar playlist')
    }
  },

  QUERY_KEY: {
    LIST_PLAYLISTS,
  }
}