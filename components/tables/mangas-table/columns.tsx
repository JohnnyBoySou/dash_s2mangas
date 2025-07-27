"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Manga } from "@/types/manga"

export const columns = (onEdit: (manga: Manga) => void, onDelete: (id: string, name: string) => void): ColumnDef<Manga>[] => [
  {
    accessorKey: "cover",
    header: "Capa",
    cell: ({ row }) => {
      const cover = row.getValue("cover") as string
      return cover ? (
        <img src={cover} alt="Capa" className="w-10 h-14 object-cover rounded" />
      ) : (
        <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center text-xs">
          Sem capa
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "manga_uuid",
    header: "UUID",
    cell: ({ row }) => {
      const uuid = row.getValue("manga_uuid") as string
      return <span className="font-mono text-xs">{uuid?.slice(0, 8)}...</span>
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const typeColors = {
        manga: "bg-blue-100 text-blue-800",
        manhwa: "bg-green-100 text-green-800",
        manhua: "bg-yellow-100 text-yellow-800",
        novel: "bg-purple-100 text-purple-800",
      }
      return (
        <Badge className={typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}>
          {type?.toUpperCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusColors = {
        ongoing: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        hiatus: "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
      }
      const statusLabels = {
        ongoing: "Em Andamento",
        completed: "Completo",
        hiatus: "Hiato",
        cancelled: "Cancelado",
      }
      return (
        <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
          {statusLabels[status as keyof typeof statusLabels] || status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "categories",
    header: "Categorias",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as { id: string; name: string }[]
      return (
        <div className="flex flex-wrap gap-1">
          {categories?.slice(0, 2).map((category) => (
            <Badge key={category.id} variant="outline" className="text-xs">
              {category.name}
            </Badge>
          ))}
          {categories?.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{categories.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return new Date(date).toLocaleDateString("pt-BR")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const manga = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(manga.id)}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(manga.manga_uuid)}>
              Copiar UUID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(manga)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(manga.id, manga.title)} className="text-red-600">
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
