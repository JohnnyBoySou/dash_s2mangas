"use client"

import { useState, useEffect, useCallback } from "react"
import { getStatistics } from "@/services/statistics-service"
import type { StatisticsData } from "@/services/statistics-service"

export function useStatistics() {
  const [data, setData] = useState<StatisticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStatistics = useCallback(async () => {
    try {
      setIsLoading(true)
      const stats = await getStatistics()
      setData(stats)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return { data, isLoading, error, fetchStatistics }
}
