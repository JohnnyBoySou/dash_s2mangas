"use client"

import { useState, useEffect, useCallback } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { TagService, type TagCreateRequest, type TagUpdateRequest } from "@/services/tag-service"
import type { Tag } from "@/types/database"

export function useTags() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  // Buscar todas as tags
  const { data: tagsData, isLoading, refetch } = useQuery({
    queryKey: TagService.QUERY_KEY.list(),
    queryFn: TagService.list,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })

  const tags = tagsData?.data || []

  // Mutation para criar tag
  const createTagMutation = useMutation({
    mutationFn: TagService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagService.QUERY_KEY.list() })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  // Mutation para editar tag
  const updateTagMutation = useMutation({
    mutationFn: TagService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagService.QUERY_KEY.list() })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  // Mutation para deletar tag
  const deleteTagMutation = useMutation({
    mutationFn: TagService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagService.QUERY_KEY.list() })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  const addTag = useCallback(async (tag: TagCreateRequest) => {
    setError(null)
    return createTagMutation.mutateAsync(tag)
  }, [createTagMutation])

  const updateTag = useCallback(async (tag: TagUpdateRequest) => {
    setError(null)
    return updateTagMutation.mutateAsync(tag)
  }, [updateTagMutation])

  const deleteTag = useCallback(async (id: string) => {
    setError(null)
    return deleteTagMutation.mutateAsync(id)
  }, [deleteTagMutation])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    tags,
    isLoading,
    error,
    addTag,
    updateTag,
    deleteTag,
    refetch,
    clearError,
    isCreating: createTagMutation.isPending,
    isUpdating: updateTagMutation.isPending,
    isDeleting: deleteTagMutation.isPending,
  }
}