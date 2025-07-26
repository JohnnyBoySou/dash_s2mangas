//import type { StatisticsData } from "@/types/database"
//import type { Statistic } from "@/types/manga"

export const StatisticsService = {
  getStatistics: async (): Promise<any> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 700))
    return {
      totalMangas: 120,
      totalUsers: 5000,
      totalChapters: 1500,
      mangaViewsOverTime: [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
        { name: "Jul", value: 3490 },
      ],
      topMangasByViews: [
        { name: "One Piece", value: 1500000 },
        { name: "Attack on Titan", value: 1200000 },
        { name: "My Hero Academia", value: 900000 },
        { name: "Jujutsu Kaisen", value: 850000 },
        { name: "Chainsaw Man", value: 700000 },
      ],
      mangaCategoriesDistribution: [
        { name: "Action", value: 400 },
        { name: "Fantasy", value: 300 },
        { name: "Adventure", value: 200 },
        { name: "Romance", value: 100 },
        { name: "Comedy", value: 50 },
      ],
    }
  },
  getMangaStatistics: async (): Promise<any> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      totalMangas: 120,
      totalUsers: 5000,
      totalChapters: 15000,
      totalReviews: 8000,
      totalComments: 12000,
      totalCollections: 300,
      totalCategories: 25,
      totalLanguages: 10,
      totalWallpapers: 150,
      totalPlaylists: 75,
      mangasByGenre: [
        { genre: "Action", count: 40 },
        { genre: "Adventure", count: 30 },
        { genre: "Fantasy", count: 25 },
        { genre: "Romance", count: 15 },
        { genre: "Sci-Fi", count: 10 },
      ],
      usersByRole: [
        { role: "admin", count: 10 },
        { role: "user", count: 4990 },
      ],
      reviewsByRating: [
        { rating: 1, count: 500 },
        { rating: 2, count: 700 },
        { rating: 3, count: 1800 },
        { rating: 4, count: 2500 },
        { rating: 5, count: 2500 },
      ],
      chaptersPerManga: [
        { mangaTitle: "One Piece", chapterCount: 1090 },
        { mangaTitle: "Naruto", chapterCount: 700 },
        { mangaTitle: "Attack on Titan", chapterCount: 139 },
        { mangaTitle: "My Hero Academia", chapterCount: 400 },
        { mangaTitle: "Jujutsu Kaisen", chapterCount: 240 },
      ],
      recentActivity: [
        { type: "new_chapter", description: "New chapter of One Piece released.", date: "2023-11-20" },
        { type: "new_user", description: "New user 'JohnDoe' registered.", date: "2023-11-19" },
        { type: "new_review", description: "User 'JaneS' reviewed Naruto.", date: "2023-11-18" },
        { type: "new_manga", description: "New manga 'Shadow Hunter' added.", date: "2023-11-17" },
        { type: "new_comment", description: "User 'MikeW' commented on Chapter 5.", date: "2023-11-16" },
      ],
    }
  },
  getDailyStatistics: async (): Promise<any[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      { date: "2023-01-01", mangasAdded: 5, chaptersAdded: 10, reviewsAdded: 3, commentsAdded: 7, usersRegistered: 20 },
      { date: "2023-01-02", mangasAdded: 3, chaptersAdded: 8, reviewsAdded: 2, commentsAdded: 5, usersRegistered: 15 },
      { date: "2023-01-03", mangasAdded: 7, chaptersAdded: 12, reviewsAdded: 4, commentsAdded: 9, usersRegistered: 25 },
      { date: "2023-01-04", mangasAdded: 4, chaptersAdded: 9, reviewsAdded: 3, commentsAdded: 6, usersRegistered: 18 },
      { date: "2023-01-05", mangasAdded: 6, chaptersAdded: 11, reviewsAdded: 5, commentsAdded: 8, usersRegistered: 22 },
    ]
  },
  getMangaViews: async (): Promise<{ name: string; value: number }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 2000 },
      { name: "Apr", value: 2780 },
      { name: "May", value: 1890 },
      { name: "Jun", value: 2390 },
      { name: "Jul", value: 3490 },
    ]
  },

  getUserRegistrations: async (): Promise<{ name: string; value: number }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      { name: "Jan", value: 20 },
      { name: "Feb", value: 30 },
      { name: "Mar", value: 15 },
      { name: "Apr", value: 25 },
      { name: "May", value: 40 },
      { name: "Jun", value: 35 },
      { name: "Jul", value: 50 },
    ]
  },

  getGenreDistribution: async (): Promise<{ name: string; value: number }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      { name: "Action", value: 400 },
      { name: "Fantasy", value: 300 },
      { name: "Adventure", value: 200 },
      { name: "Romance", value: 100 },
      { name: "Comedy", value: 50 },
    ]
  },
}
