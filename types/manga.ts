export interface Manga {
  id: string
  title: string
  author: string
  genre: string
  status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled"
  description: string
  coverImage: string // URL to the cover image
  views: number
  rating: number // Average rating out of 5
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  chapters?: Chapter[]
  reviews?: Review[]
  comments?: Comment[]
  collections?: Collection[]
  languages?: Language[]
  mangaLists?: MangaList[]
}

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

export interface Language {
  id: string
  name: string
  code: string // e.g., "en", "pt-BR"
}

export interface MangaList {
  id: string
  userId: string
  name: string
  description: string
  mangaIds: string[] // IDs of mangas in this list
}
