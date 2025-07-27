"use client"

import { useState, useEffect, useCallback } from "react"
import { WallpapersService, type WallpaperCreateRequest, type WallpaperImageCreateRequest } from "@/services/wallpaper-service"
import type { Wallpaper, Pagination, WallpaperImage } from "@/types/database"

export function useWallpapers() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const fetchWallpapers = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true)
      const response = await WallpapersService.list(page, limit)
      if (response) {
        setWallpapers(response.data || [])
        setPagination(response.pagination)
        setCurrentPage(page)
      } else {
        setWallpapers([])
        setPagination(null)
      }
    } catch (err) {
      setError(err as Error)
      setWallpapers([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchWallpapers(1)
  }, [fetchWallpapers])

  const addWallpaper = useCallback(async (newWallpaper: WallpaperCreateRequest) => {
    try {
      const added = await WallpapersService.create(newWallpaper)
      if (added) {
        // Recarrega a primeira página para mostrar o novo item
        await fetchWallpapers(1)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [fetchWallpapers])

  const updateWallpaper = useCallback(async (updatedWallpaper: Wallpaper) => {
    try {
      const updated = await WallpapersService.edit(updatedWallpaper.id, {
        id: updatedWallpaper.id,
        name: updatedWallpaper.name,
        cover: updatedWallpaper.cover,
      })
      if (updated) {
        setWallpapers((prev) => prev.map((w) => (w.id === updated.id ? updated : w)))
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const deleteWallpaper = useCallback(async (id: string) => {
    try {
      await WallpapersService.delete(id)
      
      // Verifica se a página atual ficará vazia após a exclusão
      const currentWallpapersCount = wallpapers.length
      const willPageBeEmpty = currentWallpapersCount === 1
      const shouldGoToPreviousPage = willPageBeEmpty && currentPage > 1
      
      // Faz o refetch dos dados atualizados
      if (shouldGoToPreviousPage) {
        await fetchWallpapers(currentPage - 1)
      } else {
        await fetchWallpapers(currentPage)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [wallpapers.length, currentPage, fetchWallpapers])

  const goToPage = useCallback((page: number) => {
    fetchWallpapers(page)
  }, [fetchWallpapers])

  const nextPage = useCallback(() => {
    if (pagination?.next) {
      fetchWallpapers(currentPage + 1)
    }
  }, [pagination?.next, currentPage, fetchWallpapers])

  const prevPage = useCallback(() => {
    if (pagination?.prev) {
      fetchWallpapers(currentPage - 1)
    }
  }, [pagination?.prev, currentPage, fetchWallpapers])

  return { 
    wallpapers, 
    pagination,
    currentPage,
    isLoading, 
    error, 
    addWallpaper, 
    updateWallpaper, 
    deleteWallpaper, 
    fetchWallpapers,
    goToPage,
    nextPage,
    prevPage
  }
}

// Hook para wallpaper individual com suas imagens
export function useWallpaper(id: string) {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(20)

  const fetchWallpaper = useCallback(async (page: number = 1) => {
    if (!id) return
    
    try {
      setIsLoading(true)
      const response = await WallpapersService.getById(id, page, limit)
      if (response) {
        setWallpaper(response.data)
        setPagination(response.pagination || null)
        setCurrentPage(page)
      } else {
        setWallpaper(null)
        setPagination(null)
      }
    } catch (err) {
      setError(err as Error)
      setWallpaper(null)
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }, [id, limit])

  useEffect(() => {
    fetchWallpaper(1)
  }, [fetchWallpaper])

  const addImage = useCallback(async (imageData: WallpaperImageCreateRequest) => {
    try {
      const added = await WallpapersService.addImage(imageData)
      if (added) {
        // Recarrega a página atual para mostrar a nova imagem
        await fetchWallpaper(currentPage)
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [currentPage, fetchWallpaper])

  const updateImage = useCallback(async (imageId: string, imageData: WallpaperImageCreateRequest) => {
    try {
      const updated = await WallpapersService.updateImage(imageId, {
        ...imageData,
        id: imageId
      })
      if (updated && wallpaper?.images) {
        // Atualiza a imagem na lista local
        setWallpaper(prev => {
          if (!prev || !prev.images) return prev
          return {
            ...prev,
            images: prev.images.map(img => img.id === imageId ? updated : img)
          }
        })
      }
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [wallpaper?.images])

  const toggleImage = useCallback(async (imageId: string) => {
    if (!wallpaper) return
    
    try {
      await WallpapersService.toggleImage(wallpaper.id, imageId)
      
      // Recarrega a página atual para mostrar as mudanças
      await fetchWallpaper(currentPage)
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [wallpaper, currentPage, fetchWallpaper])

  const goToPage = useCallback((page: number) => {
    fetchWallpaper(page)
  }, [fetchWallpaper])

  const nextPage = useCallback(() => {
    if (pagination?.next) {
      fetchWallpaper(currentPage + 1)
    }
  }, [pagination?.next, currentPage, fetchWallpaper])

  const prevPage = useCallback(() => {
    if (pagination?.prev) {
      fetchWallpaper(currentPage - 1)
    }
  }, [pagination?.prev, currentPage, fetchWallpaper])

  return { 
    wallpaper, 
    pagination,
    currentPage,
    isLoading, 
    error, 
    fetchWallpaper,
    addImage,
    updateImage,
    toggleImage,
    goToPage,
    nextPage,
    prevPage
  }
}
