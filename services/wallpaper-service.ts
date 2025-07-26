import type { Wallpaper } from "@/types/database"

// Mock data for wallpapers
const mockWallpapers: Wallpaper[] = [
  {
    id: "wp-1",
    title: "Forest Path",
    imageUrl: "/placeholder.svg?height=1080&width=1920",
    category: "Nature",
    tags: ["forest", "trees", "path", "green"],
    uploaderId: "user-1",
    views: 1500,
    downloads: 500,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "wp-2",
    title: "City Night Lights",
    imageUrl: "/placeholder.svg?height=1080&width=1920",
    category: "Cityscape",
    tags: ["city", "night", "lights", "urban"],
    uploaderId: "user-2",
    views: 2000,
    downloads: 750,
    createdAt: "2023-01-05T10:00:00Z",
    updatedAt: "2023-01-05T10:00:00Z",
  },
  {
    id: "wp-3",
    title: "Abstract Waves",
    imageUrl: "/placeholder.svg?height=1080&width=1920",
    category: "Abstract",
    tags: ["abstract", "waves", "colorful", "modern"],
    uploaderId: "user-1",
    views: 1000,
    downloads: 300,
    createdAt: "2023-01-10T10:00:00Z",
    updatedAt: "2023-01-10T10:00:00Z",
  },
]

export const getWallpapers = async (): Promise<Wallpaper[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockWallpapers
}

export const addMockWallpaper = async (
  newWallpaper: Omit<Wallpaper, "id" | "createdAt" | "updatedAt">,
): Promise<Wallpaper> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const id = `wp-${mockWallpapers.length + 1}`
  const wallpaper = { ...newWallpaper, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  mockWallpapers.push(wallpaper)
  return wallpaper
}

export const updateMockWallpaper = async (updatedWallpaper: Wallpaper): Promise<Wallpaper> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockWallpapers.findIndex((w) => w.id === updatedWallpaper.id)
  if (index !== -1) {
    mockWallpapers[index] = { ...updatedWallpaper, updatedAt: new Date().toISOString() }
    return mockWallpapers[index]
  }
  throw new Error("Wallpaper not found")
}

export const deleteMockWallpaper = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const initialLength = mockWallpapers.length
  mockWallpapers.splice(
    mockWallpapers.findIndex((wallpaper) => wallpaper.id === id),
    1,
  )
  if (mockWallpapers.length === initialLength) {
    throw new Error("Wallpaper not found")
  }
}
