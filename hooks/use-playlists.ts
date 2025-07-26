"use client"

import { useState, useEffect, useCallback } from "react"
import { getPlaylists, addMockPlaylist, updateMockPlaylist, deleteMockPlaylist } from "@/services/playlist-service"
import type { Playlist } from "@/types/database"

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPlaylists = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getPlaylists()
      setPlaylists(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlaylists()
  }, [fetchPlaylists])

  const addPlaylist = useCallback(async (newPlaylist: Omit<Playlist, "id" | "createdAt" | "updatedAt">) => {
    try {
      const added = await addMockPlaylist(newPlaylist)
      setPlaylists((prev) => [...prev, added])
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const updatePlaylist = useCallback(async (updatedPlaylist: Playlist) => {
    try {
      const updated = await updateMockPlaylist(updatedPlaylist)
      setPlaylists((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const deletePlaylist = useCallback(async (id: string) => {
    try {
      await deleteMockPlaylist(id)
      setPlaylists((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  return { playlists, isLoading, error, addPlaylist, updatePlaylist, deletePlaylist, fetchPlaylists }
}
