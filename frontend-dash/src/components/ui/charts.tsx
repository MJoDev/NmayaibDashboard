"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chartVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    size: {
      default: "h-[350px]",
      sm: "h-[250px]",
      lg: "h-[450px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chartVariants> {
  config?: Record<string, { label: string; color: string }>
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, variant, size, config, ...props }, ref) => (
  <div ref={ref} className={cn(chartVariants({ variant, size, className }))} {...props} />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, ChartProps>(({ className, ...props }, ref) => (
  <Chart ref={ref} className={cn("w-full", className)} {...props} />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute z-50 rounded-md border bg-background p-2 shadow-md", className)}
      {...props}
    />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps {
  label?: string
  value?: string | number
  color?: string
  hideLabel?: boolean
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartTooltipContentProps
>(({ className, label, value, color, hideLabel = false, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props}>
    {color && <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: color }} />}
    {!hideLabel && <span className="mr-2 font-medium">{label}</span>}
    {value}
  </div>
))
ChartTooltipContent.displayName = "ChartTooltipContent"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent }

