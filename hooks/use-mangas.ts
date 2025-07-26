"use client"

import { useState, useEffect, useCallback } from "react"
import { getMangas, addMockManga, updateMockManga, deleteMockManga } from "@/services/manga-service"
import type { Manga } from "@/types/manga"

export function useMangas() {
  const [mangas, setMangas] = useState<Manga[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMangas = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getMangas()
      setMangas(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMangas()
  }, [fetchMangas])

  const addManga = useCallback(async (newManga: Omit<Manga, "id" | "createdAt" | "updatedAt">) => {
    try {
      const added = await addMockManga(newManga)
      setMangas((prev) => [...prev, added])
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const updateManga = useCallback(async (updatedManga: Manga) => {
    try {
      const updated = await updateMockManga(updatedManga)
      setMangas((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const deleteManga = useCallback(async (id: string) => {
    try {
      await deleteMockManga(id)
      setMangas((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  return {
    mangas,
    isLoading,
    error,
    addManga,
    updateManga,
    deleteManga,
  }
}
