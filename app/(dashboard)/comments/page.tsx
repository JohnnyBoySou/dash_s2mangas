"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/comments-table/columns"
import { CommentModal } from "@/components/modals/comment-modal"
import type { Comment } from "@/types/database"

export default function CommentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // Mock data for comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      mangaId: "manga-1",
      userId: "user-1",
      content: "This chapter was amazing! Can't wait for the next one.",
      createdAt: "2023-01-02T10:00:00Z",
      updatedAt: "2023-01-02T10:00:00Z",
    },
    {
      id: "2",
      mangaId: "manga-1",
      userId: "user-2",
      content: "I agree, the plot is getting really interesting.",
      createdAt: "2023-01-03T10:00:00Z",
      updatedAt: "2023-01-03T10:00:00Z",
    },
    {
      id: "3",
      mangaId: "manga-2",
      userId: "user-3",
      content: "Does anyone know when the next chapter for this series is coming out?",
      createdAt: "2023-02-05T10:00:00Z",
      updatedAt: "2023-02-05T10:00:00Z",
    },
  ])

  const addComment = (comment: Comment) => {
    setComments((prev) => [
      ...prev,
      {
        ...comment,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateComment = (updatedComment: Comment) => {
    setComments((prev) => prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)))
  }

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id))
  }

  const handleAddClick = () => {
    setSelectedComment(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (comment: Comment) => {
    setSelectedComment(comment)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedComment(null)
  }

  const handleSaveComment = (comment: Comment) => {
    if (selectedComment) {
      updateComment(comment)
    } else {
      addComment(comment)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Comment
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteComment)} data={comments} />
      <CommentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveComment}
        comment={selectedComment}
      />
    </div>
  )
}
