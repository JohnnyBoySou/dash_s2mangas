"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@/components/tables/data-table/data-table"
import { columns } from "@/components/tables/reviews-table/columns"
import { ReviewModal } from "@/components/modals/review-modal"
import type { Review } from "@/types/database"

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  // Mock data for reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      mangaId: "manga-1",
      userId: "user-1",
      rating: 5,
      comment: "Absolutely loved it! A must-read.",
      createdAt: "2023-01-05T10:00:00Z",
      updatedAt: "2023-01-05T10:00:00Z",
    },
    {
      id: "2",
      mangaId: "manga-2",
      userId: "user-2",
      rating: 4,
      comment: "Great story, but the art could be better.",
      createdAt: "2023-01-20T10:00:00Z",
      updatedAt: "2023-01-20T10:00:00Z",
    },
    {
      id: "3",
      mangaId: "manga-1",
      userId: "user-3",
      rating: 3,
      comment: "It was okay, not really my type.",
      createdAt: "2023-02-10T10:00:00Z",
      updatedAt: "2023-02-10T10:00:00Z",
    },
  ])

  const addReview = (review: Review) => {
    setReviews((prev) => [
      ...prev,
      {
        ...review,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  const updateReview = (updatedReview: Review) => {
    setReviews((prev) => prev.map((review) => (review.id === updatedReview.id ? updatedReview : review)))
  }

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  const handleAddClick = () => {
    setSelectedReview(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (review: Review) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedReview(null)
  }

  const handleSaveReview = (review: Review) => {
    if (selectedReview) {
      updateReview(review)
    } else {
      addReview(review)
    }
    handleModalClose()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Button onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Review
        </Button>
      </div>
      <DataTable columns={columns(handleEditClick, deleteReview)} data={reviews} />
      <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSaveReview} review={selectedReview} />
    </div>
  )
}
