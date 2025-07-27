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
import { MoreHorizontal, ExternalLink } from "lucide-react"
import type { Playlist } from "@/types/database"

export const columns = (
  onEdit: (playlist: Playlist) => void,
  onDelete: (id: string, name: string) => void,
): ColumnDef<Playlist>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cover",
    header: "Capa",
    cell: ({ row }) =>
      row.original.cover ? (
        <img
          src={row.original.cover || "/placeholder.svg"}
          alt={row.original.name}
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) =>
      row.original.link ? (
        <a
          href={row.original.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Abrir
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.original.description
      return description && description.length > 50 
        ? `${description.substring(0, 50)}...` 
        : description || "N/A"
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags
      if (!tags || tags.length === 0) {
        return <span className="text-muted-foreground">Nenhuma tag</span>
      }
      
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag.id}
              variant="outline"
              style={{
                backgroundColor: tag.color ? `${tag.color}20` : undefined,
                borderColor: tag.color || undefined,
                color: tag.color || undefined
              }}
              className="text-xs"
            >
              {tag.name}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('pt-BR'),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const playlist = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(playlist.id)}>
              Copiar ID da Playlist
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(playlist)}>Editar</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(playlist.id, playlist.name)}
              className="text-red-600 focus:text-red-600"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
