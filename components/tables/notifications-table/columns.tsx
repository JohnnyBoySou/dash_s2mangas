"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Notification } from "@/types/database"

export const columns = (
  onEdit: (notification: Notification) => void,
  onDelete: (id: string, name: string) => void,
): ColumnDef<Notification>[] => [
  {
    accessorKey: "cover",
    header: "Cover",
    cell: ({ row }) => {
      const cover = row.original.cover
      return cover ? (
        <img 
          src={cover} 
          alt="Cover" 
          className="w-12 h-12 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
          Sem cover
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "message",
    header: "Mensagem",
    cell: ({ row }) => {
      const message = row.original.message
      return (
        <div className="max-w-[300px] truncate" title={message}>
          {message}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.original.type
      const typeColors = {
        NEWS: "bg-blue-100 text-blue-800",
        UPDATE: "bg-green-100 text-green-800",
        WARNING: "bg-yellow-100 text-yellow-800",
        ERROR: "bg-red-100 text-red-800",
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type]}`}>
          {type}
        </span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('pt-BR'),
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString('pt-BR'),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const notification = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(notification.id)}>
              Copy Notification ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(notification)}>Edit</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(notification.id, notification.title)}
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
