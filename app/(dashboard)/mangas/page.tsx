"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/mangas-table/columns"
import { MangaModal } from "@/components/modals/manga-modal"
import { useMangas } from "@/hooks/use-mangas"
import type { Manga, MangaCreateRequest, MangaUpdateRequest } from "@/types/manga"
import type { MangaFilters } from "@/services/manga-service"
import { toast } from "sonner"

export default function MangasPage() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [filters] = useState<MangaFilters>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null)

  // Usando o hook useMangas
  const {
    mangas,
    pagination,
    isLoading,
    error,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
    addManga,
    updateManga,
    deleteManga,
    refetchWithParams,
    prefetchNextPage
  } = useMangas({ page, limit, filters })

  const handleAddClick = () => {
    setSelectedManga(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (manga: Manga) => {
    setSelectedManga(manga)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedManga(null)
  }

  const handleSaveManga = async (mangaData: MangaCreateRequest | MangaUpdateRequest) => {
    console.log('=== handleSaveManga START ===')
    console.log('mangaData:', mangaData)
    console.log('selectedManga:', selectedManga)
    
    try {
      if (selectedManga && 'id' in mangaData) {
        // Atualizar mangá existente
        console.log('=== UPDATING MANGA ===')
        console.log('ID:', selectedManga.id)
        console.log('Data:', mangaData)
        
        const result = await updateManga(selectedManga.id, mangaData as MangaUpdateRequest)
        console.log('Update result:', result)
        toast.success("Mangá atualizado com sucesso!")
      } else {
        // Criar novo mangá
        console.log('=== CREATING MANGA ===')
        console.log('Data:', mangaData)
        
        const result = await addManga(mangaData as MangaCreateRequest)
        console.log('Create result:', result)
        toast.success("Mangá criado com sucesso!")
      }
      
      console.log('=== CLOSING MODAL ===')
      handleModalClose()
    } catch (error) {
      console.error('=== ERROR IN handleSaveManga ===')
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      if (selectedManga) {
        toast.error(`Erro ao atualizar mangá: ${errorMessage}`)
      } else {
        toast.error(`Erro ao criar mangá: ${errorMessage}`)
      }
      console.error(error)
    }
    
    console.log('=== handleSaveManga END ===')
  }

  const handleDeleteManga = async (id: string) => {
    try {
      await deleteManga(id)
      toast.success("Mangá deletado com sucesso!")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      toast.error(`Erro ao deletar mangá: ${errorMessage}`)
      console.error(error)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetchWithParams(newPage, filters)
    
    // Prefetch da próxima página se disponível
    if (newPage < pagination.totalPages) {
      prefetchNextPage()
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Erro ao carregar mangás</h2>
          <p className="text-muted-foreground mt-2">{(error as Error).message}</p>
          <Button 
            onClick={() => refetchWithParams(page, filters)} 
            className="mt-4"
            variant="outline"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mangás</h1>
          <Button disabled>
            <PlusIcon className="mr-2 h-4 w-4" /> 
            Adicionar Mangá
          </Button>
        </div>
        <div className="text-center py-10">
          <p className="text-muted-foreground">Carregando mangás...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mangás</h1>
        <Button onClick={handleAddClick} disabled={isCreating}>
          <PlusIcon className="mr-2 h-4 w-4" /> 
          {isCreating ? "Criando..." : "Adicionar Mangá"}
        </Button>
      </div>
      
      <DataTable 
        columns={columns(handleEditClick, handleDeleteManga)} 
        data={mangas} 
      />
      
      {/* Paginação */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Página {pagination.page} de {pagination.totalPages} 
          ({pagination.total} total)
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={!pagination.prev || isLoading || isDeleting}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={!pagination.next || isLoading || isDeleting}
          >
            Próxima
          </Button>
        </div>
      </div>
      
      <MangaModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveManga} 
        manga={selectedManga}
        isLoading={isCreating || isUpdating}
      />
    </div>
  )
}
