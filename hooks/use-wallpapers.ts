"use client"

import { useState, useEffect, useCallback } from "react"
import { getWallpapers, addMockWallpaper, updateMockWallpaper, deleteMockWallpaper } from "@/services/wallpaper-service"
import type { Wallpaper } from "@/types/database"

export function useWallpapers() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchWallpapers = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getWallpapers()
      setWallpapers(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWallpapers()
  }, [fetchWallpapers])

  const addWallpaper = useCallback(async (newWallpaper: Omit<Wallpaper, "id" | "createdAt" | "updatedAt">) => {
    try {
      const added = await addMockWallpaper(newWallpaper)
      setWallpapers((prev) => [...prev, added])
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const updateWallpaper = useCallback(async (updatedWallpaper: Wallpaper) => {
    try {
      const updated = await updateMockWallpaper(updatedWallpaper)
      setWallpapers((prev) => prev.map((w) => (w.id === updated.id ? updated : w)))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const deleteWallpaper = useCallback(async (id: string) => {
    try {
      await deleteMockWallpaper(id)
      setWallpapers((prev) => prev.filter((w) => w.id !== id))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  return { wallpapers, isLoading, error, addWallpaper, updateWallpaper, deleteWallpaper, fetchWallpapers }
}
