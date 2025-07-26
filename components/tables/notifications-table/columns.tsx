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
  onDelete: (id: string) => void,
): ColumnDef<Notification>[] => [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "isRead",
    header: "Read",
    cell: ({ row }) => (row.original.isRead ? "Yes" : "No"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
            <DropdownMenuItem onClick={() => onDelete(notification.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
