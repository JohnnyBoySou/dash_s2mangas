import type { Playlist } from "@/types/database"

// Mock data for playlists
const mockPlaylists: Playlist[] = [
  {
    id: "pl-1",
    userId: "user-1",
    name: "Chill Study Beats",
    description: "Relaxing tunes for focus and study.",
    coverImage: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pl-2",
    userId: "user-2",
    name: "Workout Motivation",
    description: "High-energy tracks to power your workouts.",
    coverImage: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-01-05T10:00:00Z",
    updatedAt: "2023-01-05T10:00:00Z",
  },
  {
    id: "pl-3",
    userId: "user-1",
    name: "Road Trip Anthems",
    description: "Classic hits for long drives.",
    coverImage: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-01-10T10:00:00Z",
    updatedAt: "2023-01-10T10:00:00Z",
  },
]

export const getPlaylists = async (): Promise<Playlist[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockPlaylists
}

export const addMockPlaylist = async (
  newPlaylist: Omit<Playlist, "id" | "createdAt" | "updatedAt">,
): Promise<Playlist> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const id = `pl-${mockPlaylists.length + 1}`
  const playlist = { ...newPlaylist, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  mockPlaylists.push(playlist)
  return playlist
}

export const updateMockPlaylist = async (updatedPlaylist: Playlist): Promise<Playlist> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockPlaylists.findIndex((p) => p.id === updatedPlaylist.id)
  if (index !== -1) {
    mockPlaylists[index] = { ...updatedPlaylist, updatedAt: new Date().toISOString() }
    return mockPlaylists[index]
  }
  throw new Error("Playlist not found")
}

export const deleteMockPlaylist = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const initialLength = mockPlaylists.length
  mockPlaylists.splice(
    mockPlaylists.findIndex((playlist) => playlist.id === id),
    1,
  )
  if (mockPlaylists.length === initialLength) {
    throw new Error("Playlist not found")
  }
}
