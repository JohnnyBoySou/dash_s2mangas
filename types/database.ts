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
  title: string
  message: string
  type: "NEWS" | "UPDATE" | "WARNING" | "ERROR"
  data: any | null
  cover?: string // URL da imagem de cover (opcional)
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type MangaList = {
  id: string
  userId: string // Foreign key to User
  name: string
  description: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type WallpaperImage = {
  id: string
  wallpaperId: string
  url: string
}

export type Wallpaper = {
  id: string
  name: string
  cover: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  _count?: {
    images: number
  }
  totalImages?: number
  images?: WallpaperImage[]
}

export type Tag = {
  id: string
  name: string
  color?: string // Cor hexadecimal para a tag (opcional)
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Playlist = {
  id: string
  name: string
  cover: string // URL da imagem de capa
  link: string // Link do Spotify ou outra plataforma
  description: string
  tags?: Tag[] // Tags associadas à playlist
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type Pagination = {
  total: number
  page: number
  limit: number
  totalPages: number
  next: boolean
  prev: boolean
}

export type TagListResponse = {
  data: Tag[]
  pagination?: Pagination
}

export type PlaylistListResponse = {
  data: Playlist[]
  pagination: Pagination
}

export type WallpaperListResponse = {
  data: Wallpaper[]
  pagination: Pagination
}

export type WallpaperSingleResponse = {
  data: Wallpaper
  pagination?: Pagination
}

export type NotificationListResponse = {
  data: Notification[]
  pagination: Pagination
}
