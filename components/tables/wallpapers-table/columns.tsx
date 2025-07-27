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
import { MoreHorizontal, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Wallpaper } from "@/types/database"

export const columns = (
  onEdit: (wallpaper: Wallpaper) => void,
  onDelete: (id: string, name: string) => void,
): ColumnDef<Wallpaper>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cover",
    header: "Cover",
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
    accessorKey: "totalImages",
    header: "Total Images",
    cell: ({ row }) => row.original.totalImages || row.original._count?.images || 0,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wallpaper = row.original
      const router = useRouter()

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/wallpapers/${wallpaper.id}`)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalhes
          </Button>
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
              <DropdownMenuItem 
                 onClick={() => onDelete(wallpaper.id, wallpaper.name || `Wallpaper ${wallpaper.id.slice(0, 8)}`)}
                 className="text-red-600 focus:text-red-600"
               >
                 Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
