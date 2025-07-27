"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/playlists-table/columns"
import { PlaylistModal } from "@/components/modals/playlist-modal"
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal"
import { usePlaylists } from "@/hooks/use-playlists"
import type { Playlist } from "@/types/database"
import type { PlaylistCreateRequest } from "@/services/playlist-service"

export default function PlaylistsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10
  
  const { 
    playlists, 
    pagination, 
    isLoading,
    addPlaylist, 
    updatePlaylist, 
    deletePlaylist,
    goToPage,
    nextPage,
    prevPage
  } = usePlaylists()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [playlistToDelete, setPlaylistToDelete] = useState<{ id: string, name: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleSavePlaylist = async (playlist: Playlist | PlaylistCreateRequest) => {
    try {
      if (selectedPlaylist) {
        await updatePlaylist(playlist as Playlist)
      } else {
        await addPlaylist(playlist as PlaylistCreateRequest)
      }
      handleModalClose()
    } catch (error) {
      console.error('Erro ao salvar playlist:', error)
    }
  }

  const handleDeletePlaylist = async (id: string, name: string) => {
    setPlaylistToDelete({ id, name })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!playlistToDelete) return
    
    setIsDeleting(true)
    try {
      await deletePlaylist(playlistToDelete.id)
      setIsDeleteModalOpen(false)
      setPlaylistToDelete(null)
    } catch (error) {
      console.error('Erro ao deletar playlist:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setPlaylistToDelete(null)
  }

  const handleGoToPage = (page: number) => {
    setCurrentPage(page)
    goToPage(page)
  }

  const handleNextPage = () => {
    if (pagination?.next) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      nextPage()
    }
  }

  const handlePrevPage = () => {
    if (pagination?.prev) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      prevPage()
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Playlist
        </Button>
      </div>
      
      <DataTable columns={columns(handleEditClick, handleDeletePlaylist)} data={playlists} />
      
      {/* Paginação */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
             Mostrando {((currentPage - 1) * limit) + 1} a {Math.min(currentPage * limit, pagination.total)} de {pagination.total} resultados
           </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!pagination.prev}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGoToPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!pagination.next}
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSavePlaylist}
        playlist={selectedPlaylist}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={playlistToDelete?.name || ""}
        isLoading={isDeleting}
      />
    </div>
  )
}
