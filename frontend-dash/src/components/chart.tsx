"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

interface ChartProps {
  title: string
  value: number
  percentage: number
  data: number[]
  labels: string[]
}

export function Chart({ title, value, percentage, data, labels }: ChartProps) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: Math.min(...data) * 0.95,
        max: Math.max(...data) * 1.05,
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-1 flex items-baseline">
          <span className="text-2xl font-semibold">{value.toLocaleString()}</span>
          <span className={`ml-2 text-sm ${percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
            {percentage >= 0 ? "+" : ""}{percentage}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={chartData} />
        </div>
        <div className="mt-4 flex gap-2">
          {["1d", "5d", "1m", "6m", "1y", "5d", "Max"].map((period) => (
            <Button key={period} variant="outline" size="sm">
              {period}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

