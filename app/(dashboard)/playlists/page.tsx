"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/playlists-table/columns"
import { PlaylistModal } from "@/components/modals/playlist-modal"
import { usePlaylists } from "@/hooks/use-playlists"
import type { Playlist } from "@/types/database"

export default function PlaylistsPage() {
  const { playlists, addPlaylist, updatePlaylist, deletePlaylist } = usePlaylists()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  const handleAddClick = () => {
    setSelectedPlaylist(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedPlaylist(null)
  }

  const handleSavePlaylist = (playlist: Playlist) => {
    if (selectedPlaylist) {
      updatePlaylist(playlist)
    } else {
      addPlaylist(playlist)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Playlist
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deletePlaylist)} data={playlists} />
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSavePlaylist}
        playlist={selectedPlaylist}
      />
    </div>
  )
}
