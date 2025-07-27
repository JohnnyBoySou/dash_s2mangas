"use client"

import { useState, useEffect, useCallback } from "react"
import { PlaylistsService, type PlaylistCreateRequest } from "@/services/playlist-service"
import type { Playlist, Pagination } from "@/types/database"

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const fetchPlaylists = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true)
      const response = await PlaylistsService.list(page, limit)
      if (response) {
        setPlaylists(response.data || [])
        setPagination(response.pagination)
        setCurrentPage(page)
      } else {
        setPlaylists([])
        setPagination(null)
      }
    } catch (err) {
      setError(err as Error)
      setPlaylists([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchPlaylists(1)
  }, [fetchPlaylists])

  const addPlaylist = useCallback(async (newPlaylist: PlaylistCreateRequest) => {
    try {
      const added = await PlaylistsService.create(newPlaylist)
      if (added) {
        // Recarrega a primeira página para mostrar o novo item
        await fetchPlaylists(1)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [fetchPlaylists])

  const updatePlaylist = useCallback(async (updatedPlaylist: Playlist) => {
    try {
      const updated = await PlaylistsService.edit(updatedPlaylist.id, {
        id: updatedPlaylist.id,
        name: updatedPlaylist.name,
        cover: updatedPlaylist.cover,
        link: updatedPlaylist.link,
        description: updatedPlaylist.description,
        tags: updatedPlaylist.tags?.map(tag => tag.id) || [], // Incluir as tags
      })
      if (updated) {
        setPlaylists((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const deletePlaylist = useCallback(async (id: string) => {
    try {
      await PlaylistsService.delete(id)
      
      // Verifica se a página atual ficará vazia após a exclusão
      const currentPlaylistsCount = playlists.length
      const willPageBeEmpty = currentPlaylistsCount === 1
      const shouldGoToPreviousPage = willPageBeEmpty && currentPage > 1
      
      // Faz o refetch dos dados atualizados
      if (shouldGoToPreviousPage) {
        await fetchPlaylists(currentPage - 1)
      } else {
        await fetchPlaylists(currentPage)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [playlists.length, currentPage, fetchPlaylists])

  const goToPage = useCallback((page: number) => {
    fetchPlaylists(page)
  }, [fetchPlaylists])

  const nextPage = useCallback(() => {
    if (pagination?.next) {
      fetchPlaylists(currentPage + 1)
    }
  }, [pagination?.next, currentPage, fetchPlaylists])

  const prevPage = useCallback(() => {
    if (pagination?.prev) {
      fetchPlaylists(currentPage - 1)
    }
  }, [pagination?.prev, currentPage, fetchPlaylists])

  return { 
    playlists, 
    pagination,
    currentPage,
    isLoading, 
    error, 
    addPlaylist, 
    updatePlaylist, 
    deletePlaylist, 
    fetchPlaylists,
    goToPage,
    nextPage,
    prevPage
  }
}
