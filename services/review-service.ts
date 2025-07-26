import type { Manga } from "@/types/manga"

// Mock data for mangas
const mockMangas: Manga[] = [
  {
    id: "manga-1",
    title: "One Piece",
    author: "Eiichiro Oda",
    genre: "Adventure, Fantasy",
    status: "Ongoing",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew.",
    coverImage: "/placeholder.svg?height=200&width=150",
    views: 1500000,
    rating: 4.9,
    createdAt: "1997-07-22T00:00:00Z",
    updatedAt: "2023-10-26T00:00:00Z",
  },
  {
    id: "manga-2",
    title: "Attack on Titan",
    author: "Hajime Isayama",
    genre: "Action, Dark Fantasy",
    status: "Completed",
    description: "Humanity fights for survival against giant humanoid Titans.",
    coverImage: "/placeholder.svg?height=200&width=150",
    views: 1200000,
    rating: 4.8,
    createdAt: "2009-09-09T00:00:00Z",
    updatedAt: "2023-10-26T00:00:00Z",
  },
  {
    id: "manga-3",
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    genre: "Action, Superhero",
    status: "Ongoing",
    description: "A boy born without superpowers dreams of becoming a hero.",
    coverImage: "/placeholder.svg?height=200&width=150",
    views: 900000,
    rating: 4.7,
    createdAt: "2014-07-07T00:00:00Z",
    updatedAt: "2023-10-26T00:00:00Z",
  },
  {
    id: "manga-4",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    genre: "Dark Fantasy, Supernatural",
    status: "Ongoing",
    description: "A high school student joins a secret organization of Jujutsu Sorcerers.",
    coverImage: "/placeholder.svg?height=200&width=150",
    views: 850000,
    rating: 4.8,
    createdAt: "2018-03-05T00:00:00Z",
    updatedAt: "2023-10-26T00:00:00Z",
  },
  {
    id: "manga-5",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    genre: "Dark Fantasy, Action",
    status: "Ongoing",
    description: "A young man who merges with a chainsaw devil to become a hybrid.",
    coverImage: "/placeholder.svg?height=200&width=150",
    views: 700000,
    rating: 4.7,
    createdAt: "2018-12-03T00:00:00Z",
    updatedAt: "2023-10-26T00:00:00Z",
  },
]


export const MangaService = {
  getMangas: async (): Promise<Manga[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMangas
  },
  addManga: async (newManga: Omit<Manga, "id" | "createdAt" | "updatedAt">): Promise<Manga> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const id = `manga-${mockMangas.length + 1}`
    const manga = { ...newManga, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    mockMangas.push(manga)
    return manga
  },
  updateManga: async (updatedManga: Manga): Promise<Manga> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockMangas.findIndex((m) => m.id === updatedManga.id)
    if (index !== -1) {
      mockMangas[index] = { ...updatedManga, updatedAt: new Date().toISOString() }
      return mockMangas[index]
    }
    throw new Error("Manga not found")
  },
  deleteManga: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockMangas.length
    mockMangas.splice(
      mockMangas.findIndex((manga) => manga.id === id),
      1,
    )
    if (mockMangas.length === initialLength) {
      throw new Error("Manga not found")
    }
  },
  getManga: async (id: string): Promise<Manga> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const manga = mockMangas.find((m) => m.id === id)
    if (manga) {
      return manga
    }
    throw new Error("Manga not found")
  },
 
}

export const getMangas = async (): Promise<Manga[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMangas
}

export const addMockManga = async (newManga: Omit<Manga, "id" | "createdAt" | "updatedAt">): Promise<Manga> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const id = `manga-${mockMangas.length + 1}`
  const manga = { ...newManga, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  mockMangas.push(manga)
  return manga
}

export const updateMockManga = async (updatedManga: Manga): Promise<Manga> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockMangas.findIndex((m) => m.id === updatedManga.id)
  if (index !== -1) {
    mockMangas[index] = { ...updatedManga, updatedAt: new Date().toISOString() }
    return mockMangas[index]
  }
  throw new Error("Manga not found")
}

export const deleteMockManga = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const initialLength = mockMangas.length
  mockMangas.splice(
    mockMangas.findIndex((manga) => manga.id === id),
    1,
  )
  if (mockMangas.length === initialLength) {
    throw new Error("Manga not found")
  }
}
