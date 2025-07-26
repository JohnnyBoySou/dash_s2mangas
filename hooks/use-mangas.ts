"use client"

import { useState, useEffect, useCallback } from "react"
import { mangaService, getMangas, addMockManga, updateMockManga, deleteMockManga } from "@/services/manga-service"
import type { Manga, Chapter, Review, Comment, Collection, Language, MangaList } from "@/types/manga"

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

  // Chapter operations
  const addChapter = useCallback(async (newChapter: Omit<Chapter, "id">) => {
    try {
      const addedChapter = await mangaService.addChapter(newChapter.mangaId, newChapter)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === newChapter.mangaId ? { ...manga, chapters: [...(manga.chapters || []), addedChapter] } : manga,
        ),
      )
    } catch (err) {
      setError("Failed to add chapter.")
      console.error(err)
    }
  }, [])

  const updateChapter = useCallback(async (updatedChapter: Chapter) => {
    try {
      const chapter = await mangaService.updateChapter(updatedChapter.mangaId, updatedChapter)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === updatedChapter.mangaId
            ? {
                ...manga,
                chapters: (manga.chapters || []).map((chap) => (chap.id === chapter.id ? chapter : chap)),
              }
            : manga,
        ),
      )
    } catch (err) {
      setError("Failed to update chapter.")
      console.error(err)
    }
  }, [])

  const deleteChapter = useCallback(
    async (id: string) => {
      try {
        // Find which manga this chapter belongs to
        const manga = mangas.find((m) => m.chapters?.some((chap) => chap.id === id))
        if (manga) {
          await mangaService.deleteChapter(manga.id, id)
          setMangas((prev) =>
            prev.map((m) =>
              m.id === manga.id ? { ...m, chapters: (m.chapters || []).filter((chap) => chap.id !== id) } : m,
            ),
          )
        }
      } catch (err) {
        setError("Failed to delete chapter.")
        console.error(err)
      }
    },
    [mangas],
  )

  // Review operations
  const addReview = useCallback(async (newReview: Omit<Review, "id" | "createdAt">) => {
    try {
      const addedReview = await mangaService.addReview(newReview.mangaId, newReview)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === newReview.mangaId ? { ...manga, reviews: [...(manga.reviews || []), addedReview] } : manga,
        ),
      )
    } catch (err) {
      setError("Failed to add review.")
      console.error(err)
    }
  }, [])

  const updateReview = useCallback(async (updatedReview: Review) => {
    try {
      const review = await mangaService.updateReview(updatedReview.mangaId, updatedReview)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === updatedReview.mangaId
            ? {
                ...manga,
                reviews: (manga.reviews || []).map((rev) => (rev.id === review.id ? review : rev)),
              }
            : manga,
        ),
      )
    } catch (err) {
      setError("Failed to update review.")
      console.error(err)
    }
  }, [])

  const deleteReview = useCallback(
    async (id: string) => {
      try {
        const manga = mangas.find((m) => m.reviews?.some((rev) => rev.id === id))
        if (manga) {
          await mangaService.deleteReview(manga.id, id)
          setMangas((prev) =>
            prev.map((m) =>
              m.id === manga.id ? { ...m, reviews: (manga.reviews || []).filter((rev) => rev.id !== id) } : m,
            ),
          )
        }
      } catch (err) {
        setError("Failed to delete review.")
        console.error(err)
      }
    },
    [mangas],
  )

  // Comment operations
  const addComment = useCallback(async (newComment: Omit<Comment, "id" | "createdAt">) => {
    try {
      const addedComment = await mangaService.addComment(newComment.mangaId, newComment)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === newComment.mangaId ? { ...manga, comments: [...(manga.comments || []), addedComment] } : manga,
        ),
      )
    } catch (err) {
      setError("Failed to add comment.")
      console.error(err)
    }
  }, [])

  const updateComment = useCallback(async (updatedComment: Comment) => {
    try {
      const comment = await mangaService.updateComment(updatedComment.mangaId, updatedComment)
      setMangas((prev) =>
        prev.map((manga) =>
          manga.id === updatedComment.mangaId
            ? {
                ...manga,
                comments: (manga.comments || []).map((comm) => (comm.id === comment.id ? comment : comm)),
              }
            : manga,
        ),
      )
    } catch (err) {
      setError("Failed to update comment.")
      console.error(err)
    }
  }, [])

  const deleteComment = useCallback(
    async (id: string) => {
      try {
        const manga = mangas.find((m) => m.comments?.some((comm) => comm.id === id))
        if (manga) {
          await mangaService.deleteComment(manga.id, id)
          setMangas((prev) =>
            prev.map((m) =>
              m.id === manga.id ? { ...m, comments: (manga.comments || []).filter((comm) => comm.id !== id) } : m,
            ),
          )
        }
      } catch (err) {
        setError("Failed to delete comment.")
        console.error(err)
      }
    },
    [mangas],
  )

  // Collection operations
  const addCollection = useCallback(async (newCollection: Omit<Collection, "id">) => {
    try {
      const addedCollection = await mangaService.addCollection(newCollection)
      setMangas((prev) =>
        prev.map((manga) => {
          // Assuming the collection is added to the first manga in mangaIds for simplicity
          if (newCollection.mangaIds.includes(manga.id)) {
            return { ...manga, collections: [...(manga.collections || []), addedCollection] }
          }
          return manga
        }),
      )
    } catch (err) {
      setError("Failed to add collection.")
      console.error(err)
    }
  }, [])

  const updateCollection = useCallback(async (updatedCollection: Collection) => {
    try {
      const collection = await mangaService.updateCollection(updatedCollection)
      setMangas((prev) =>
        prev.map((manga) => ({
          ...manga,
          collections: (manga.collections || []).map((col) => (col.id === collection.id ? collection : col)),
        })),
      )
    } catch (err) {
      setError("Failed to update collection.")
      console.error(err)
    }
  }, [])

  const deleteCollection = useCallback(async (id: string) => {
    try {
      await mangaService.deleteCollection(id)
      setMangas((prev) =>
        prev.map((manga) => ({
          ...manga,
          collections: (manga.collections || []).filter((col) => col.id !== id),
        })),
      )
    } catch (err) {
      setError("Failed to delete collection.")
      console.error(err)
    }
  }, [])

  // Language operations (simplified, not directly linked to manga in mock)
  const addLanguage = useCallback(async (newLanguage: Omit<Language, "id">) => {
    try {
      await mangaService.addLanguage(newLanguage)
      // No direct state update for languages in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to add language.")
      console.error(err)
    }
  }, [])

  const updateLanguage = useCallback(async (updatedLanguage: Language) => {
    try {
      await mangaService.updateLanguage(updatedLanguage)
      // No direct state update for languages in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to update language.")
      console.error(err)
    }
  }, [])

  const deleteLanguage = useCallback(async (id: string) => {
    try {
      await mangaService.deleteLanguage(id)
      // No direct state update for languages in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to delete language.")
      console.error(err)
    }
  }, [])

  // MangaList operations (simplified, not directly linked to manga in mock)
  const addMangaList = useCallback(async (newMangaList: Omit<MangaList, "id">) => {
    try {
      await mangaService.addMangaList(newMangaList)
      // No direct state update for manga lists in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to add manga list.")
      console.error(err)
    }
  }, [])

  const updateMangaList = useCallback(async (updatedMangaList: MangaList) => {
    try {
      await mangaService.updateMangaList(updatedMangaList)
      // No direct state update for manga lists in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to update manga list.")
      console.error(err)
    }
  }, [])

  const deleteMangaList = useCallback(async (id: string) => {
    try {
      await mangaService.deleteMangaList(id)
      // No direct state update for manga lists in mangas, as they are not nested in mock
    } catch (err) {
      setError("Failed to delete manga list.")
      console.error(err)
    }
  }, [])

  return {
    mangas,
    isLoading,
    error,
    addManga,
    updateManga,
    deleteManga,
    addChapter,
    updateChapter,
    deleteChapter,
    addReview,
    updateReview,
    deleteReview,
    addComment,
    updateComment,
    deleteComment,
    addCollection,
    updateCollection,
    deleteCollection,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addMangaList,
    updateMangaList,
    deleteMangaList,
  }
}
