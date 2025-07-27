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
import type { Chapter } from "@/types/database"

export const columns = (onEdit: (chapter: Chapter) => void, onDelete: (id: string, name: string) => void): ColumnDef<Chapter>[] => [
  {
    accessorKey: "mangaId",
    header: "Manga ID",
  },
  {
    accessorKey: "chapterNumber",
    header: "Chapter No.",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ row }) => new Date(row.original.releaseDate).toLocaleDateString(),
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const chapter = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(chapter.id)}>
              Copy Chapter ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(chapter)}>Edit</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(chapter.id, chapter.title || `Capítulo ${chapter.chapterNumber}`)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
