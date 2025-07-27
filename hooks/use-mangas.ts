"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { MangaService, type MangaFilters } from "@/services/manga-service"
import type { Manga, MangaListResponse, MangaCreateRequest, MangaUpdateRequest } from "@/types/manga"

interface UseMangasOptions {
  page?: number
  limit?: number
  filters?: MangaFilters
  enabled?: boolean
}

// Query Keys
const MANGA_QUERY_KEYS = {
  all: ['mangas'] as const,
  lists: () => [...MANGA_QUERY_KEYS.all, 'list'] as const,
  list: (page: number, limit: number, filters?: MangaFilters) => 
    [...MANGA_QUERY_KEYS.lists(), { page, limit, filters }] as const,
  details: () => [...MANGA_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...MANGA_QUERY_KEYS.details(), id] as const,
  categories: () => [...MANGA_QUERY_KEYS.all, 'categories'] as const,
  languages: () => [...MANGA_QUERY_KEYS.all, 'languages'] as const,
}

export function useMangas(options: UseMangasOptions = {}) {
  const { 
    page = 1, 
    limit = 10, 
    filters, 
    enabled = true 
  } = options

  const queryClient = useQueryClient()

  // Query para listar mangás
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isFetching,
    isRefetching
  } = useQuery({
    queryKey: MANGA_QUERY_KEYS.list(page, limit, filters),
    queryFn: () => MangaService.list(page, limit, filters),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  })

  // Mutation para criar mangá
  const createMangaMutation = useMutation({
    mutationFn: (newManga: MangaCreateRequest) => MangaService.create(newManga),
    onSuccess: () => {
      // Invalidar todas as listas de mangás
      queryClient.invalidateQueries({ queryKey: MANGA_QUERY_KEYS.lists() })
    },
    onError: (error) => {
      console.error('Erro ao criar mangá:', error)
    }
  })

  // Mutation para atualizar mangá
  const updateMangaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MangaUpdateRequest> }) => 
      MangaService.update(id, data as MangaUpdateRequest),
    onSuccess: (updatedManga, { id }) => {
      // Atualizar o cache do mangá específico
      if (updatedManga) {
        queryClient.setQueryData(MANGA_QUERY_KEYS.detail(id), updatedManga)
      }
      
      // Invalidar listas para refletir mudanças
      queryClient.invalidateQueries({ queryKey: MANGA_QUERY_KEYS.lists() })
    },
    onError: (error) => {
      console.error('Erro ao atualizar mangá:', error)
    }
  })

  // Mutation para deletar mangá
  const deleteMangaMutation = useMutation({
    mutationFn: (id: string) => MangaService.delete(id),
    onSuccess: (_, deletedId) => {
      // Remover do cache específico
      queryClient.removeQueries({ queryKey: MANGA_QUERY_KEYS.detail(deletedId) })
      
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: MANGA_QUERY_KEYS.lists() })
    },
    onError: (error) => {
      console.error('Erro ao deletar mangá:', error)
    }
  })

  // Funções auxiliares
  const addManga = async (data: MangaCreateRequest): Promise<Manga> => {
    console.log('addManga called with data:', data)
    try {
      const result = await createMangaMutation.mutateAsync(data)
      console.log('addManga result:', result)
      if (!result) {
        throw new Error('Erro ao criar mangá: resultado nulo')
      }
      return result
    } catch (error) {
      console.error('addManga error:', error)
      throw error
    }
  }

  const updateManga = async (id: string, data: MangaUpdateRequest): Promise<Manga> => {
    console.log('updateManga called with id:', id, 'data:', data)
    try {
      const result = await updateMangaMutation.mutateAsync({ id, data })
      console.log('updateManga result:', result)
      if (!result) {
        throw new Error('Erro ao atualizar mangá: resultado nulo')
      }
      return result
    } catch (error) {
      console.error('updateManga error:', error)
      throw error
    }
  }

  const deleteManga = async (id: string) => {
    return deleteMangaMutation.mutateAsync(id)
  }

  // Função para invalidar queries manualmente
  const invalidateMangas = () => {
    queryClient.invalidateQueries({ queryKey: MANGA_QUERY_KEYS.all })
  }

  // Função para refetch com novos parâmetros
  const refetchWithParams = (newPage?: number, newFilters?: MangaFilters) => {
    const queryKey = MANGA_QUERY_KEYS.list(newPage || page, limit, newFilters || filters)
    return queryClient.refetchQueries({ queryKey })
  }

  // Função para prefetch da próxima página
  const prefetchNextPage = () => {
    if (response?.pagination.next) {
      queryClient.prefetchQuery({
        queryKey: MANGA_QUERY_KEYS.list(page + 1, limit, filters),
        queryFn: () => MangaService.list(page + 1, limit, filters),
        staleTime: 1000 * 60 * 5,
      })
    }
  }

  return {
    // Data
    mangas: response?.data || [],
    pagination: response?.pagination || {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      next: false,
      prev: false
    },
    
    // Loading states
    isLoading,
    isFetching,
    isRefetching,
    error,
    
    // Mutation states
    isCreating: createMangaMutation.isPending,
    isUpdating: updateMangaMutation.isPending,
    isDeleting: deleteMangaMutation.isPending,
    
    // Mutation errors
    createError: createMangaMutation.error,
    updateError: updateMangaMutation.error,
    deleteError: deleteMangaMutation.error,
    
    // Actions
    addManga,
    updateManga,
    deleteManga,
    refetch,
    refetchWithParams,
    invalidateMangas,
    prefetchNextPage,
    
    // Utils
    hasNextPage: response?.pagination.next || false,
    hasPrevPage: response?.pagination.prev || false,
    totalPages: response?.pagination.totalPages || 0,
    currentPage: response?.pagination.page || 1,
    totalItems: response?.pagination.total || 0,
    
    // Query client para uso avançado
    queryClient,
    queryKeys: MANGA_QUERY_KEYS
  }
}

// Hook para buscar um mangá específico
export function useManga(id: string, enabled: boolean = true) {
  const queryClient = useQueryClient()

  const {
    data: manga,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: MANGA_QUERY_KEYS.detail(id),
    queryFn: () => MangaService.single(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  return {
    manga,
    isLoading,
    error,
    refetch,
    queryClient,
    queryKey: MANGA_QUERY_KEYS.detail(id)
  }
}

// Hook para categorias
export function useMangaCategories() {
  const {
    data: categories,
    isLoading,
    error
  } = useQuery({
    queryKey: MANGA_QUERY_KEYS.categories(),
    queryFn: () => MangaService.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutos (categorias mudam pouco)
    gcTime: 1000 * 60 * 60, // 1 hora
  })

  return {
    categories: categories || [],
    isLoading,
    error
  }
}

// Hook para idiomas
export function useMangaLanguages() {
  const {
    data: languages,
    isLoading,
    error
  } = useQuery({
    queryKey: MANGA_QUERY_KEYS.languages(),
    queryFn: () => MangaService.getLanguages(),
    staleTime: 1000 * 60 * 30, // 30 minutos (idiomas mudam pouco)
    gcTime: 1000 * 60 * 60, // 1 hora
  })

  return {
    languages: languages || [],
    isLoading,
    error
  }
}
