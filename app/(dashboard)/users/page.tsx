"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/users-table/columns"
import { UserModal } from "@/components/modals/user-modal"
import { useAuth } from "@/contexts/auth-context"
import type { User } from "@/types/database"

export default function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleAddClick = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      updateUser(user)
    } else {
      addUser(user)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteUser)} data={users} />
      <UserModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSaveUser} user={selectedUser} />
    </div>
  )
}
