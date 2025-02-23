import { Card, CardContent } from "@/components/ui/card"
import React from "react"
interface MetricCardProps {
  title: string
  value: string
  percentage: number
}

export function MetricCard({ title, value, percentage }: MetricCardProps) {
  return (
    <Card>
    <CardContent className="p-4 sm:p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        <p className={`mt-1 sm:mt-0 sm:ml-2 text-sm ${percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
          {percentage >= 0 ? "+" : ""}
          {percentage}%
        </p>
      </div>
    </CardContent>
  </Card>
  )
}

