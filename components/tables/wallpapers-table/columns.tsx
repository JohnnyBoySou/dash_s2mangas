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
import type { Wallpaper } from "@/types/database"

export const columns = (
  onEdit: (wallpaper: Wallpaper) => void,
  onDelete: (id: string) => void,
): ColumnDef<Wallpaper>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) =>
      row.original.imageUrl ? (
        <img
          src={row.original.imageUrl || "/placeholder.svg"}
          alt={row.original.title}
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "uploaderId",
    header: "Uploader ID",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wallpaper = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(wallpaper.id)}>
              Copy Wallpaper ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(wallpaper)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(wallpaper.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
