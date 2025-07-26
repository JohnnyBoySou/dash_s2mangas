export type User = {
  id: string
  username: string
  email: string
  role: "user" | "admin" // e.g., 'user', 'admin'
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  notifications: Notification[]
}

export type Chapter = {
  id: string
  mangaId: string // Foreign key to Manga
  chapterNumber: number
  title: string
  releaseDate: string // ISO date string
  views: number
  pages: string[] // Array of image URLs for pages
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Review = {
  id: string
  mangaId: string // Foreign key to Manga
  userId: string // Foreign key to User
  rating: number // e.g., 1-5 stars
  comment: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Comment = {
  id: string
  mangaId: string // Foreign key to Manga
  userId: string // Foreign key to User
  content: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Collection = {
  id: string
  userId: string // Foreign key to User
  name: string
  description: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Category = {
  id: string
  name: string
  description: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Language = {
  id: string
  name: string
  code: string // e.g., 'en', 'ja', 'pt-BR'
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Notification = {
  id: string
  userId: string // Foreign key to User
  type: "info" | "warning" | "error" | "success"
  message: string
  isRead: boolean
  createdAt: string // ISO date string
}

export type MangaList = {
  id: string
  userId: string // Foreign key to User
  name: string
  description: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Wallpaper = {
  id: string
  title: string
  imageUrl: string
  category: string
  tags: string[]
  uploaderId: string // Foreign key to User
  views: number
  downloads: number
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Playlist = {
  id: string
  userId: string // Foreign key to User
  name: string
  description: string
  coverImage: string // URL to the cover image
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}
