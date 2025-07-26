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
import type { Playlist } from "@/types/database"

export const columns = (
  onEdit: (playlist: Playlist) => void,
  onDelete: (id: string) => void,
): ColumnDef<Playlist>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "coverImage",
    header: "Cover Image",
    cell: ({ row }) =>
      row.original.coverImage ? (
        <img
          src={row.original.coverImage || "/placeholder.svg"}
          alt={row.original.name}
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const playlist = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(playlist.id)}>
              Copy Playlist ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(playlist)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(playlist.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
