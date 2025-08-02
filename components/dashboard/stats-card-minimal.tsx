import { LucideIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  icon?: LucideIcon
}

export function StatsCardMinimal({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <div className="p-6 bg-card rounded-[var(--radius)] border">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-medium">
            {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
          </p>
          {change && (
            <p className="text-xs text-muted-foreground">{change}</p>
          )}
        </div>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </div>
  )
}
