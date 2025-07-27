export interface Category {
  id: string
  name: string
}

export interface Translation {
  id: string
  mangaId: string
  language: string
  name: string
  description: string
}

export interface Language {
  id: string
  code: string
  name: string
}

export interface Manga {
  id: string
  cover: string
  status: string
  type: string
  createdAt: string
  updatedAt: string
  releaseDate: string
  manga_uuid: string
  categories: Category[]
  translations: Translation[]
  languages: Language[]
  title: string
  description: string
}

export interface MangaListResponse {
  data: Manga[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    next: boolean
    prev: boolean
  }
}

export interface MangaCreateRequest {
  cover: string
  status: string
  type: string
  releaseDate: string
  manga_uuid: string
  categories: string[] // IDs das categorias
  translations: {
    language: string
    name: string
    description: string
  }[]
}

export interface MangaUpdateRequest extends MangaCreateRequest {
  id: string
}

// Tipos legados mantidos para compatibilidade
export interface Chapter {
  id: string
  mangaId: string
  title: string
  chapterNumber: number
  releaseDate: string // ISO date string
  pages: string[] // URLs to image pages
}

export interface Review {
  id: string
  mangaId: string
  userId: string
  rating: number // 1-5
  comment: string
  createdAt: string // ISO date string
}

export interface Comment {
  id: string
  mangaId: string
  userId: string
  content: string
  createdAt: string // ISO date string
}

export interface Collection {
  id: string
  name: string
  description: string
  mangaIds: string[] // IDs of mangas in this collection
}

export interface MangaList {
  id: string
  userId: string
  name: string
  description: string
  mangaIds: string[] // IDs of mangas in this list
}
