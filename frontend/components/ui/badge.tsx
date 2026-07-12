import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        secondary:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        outline: "text-foreground border border-border",
        // Semantic statuses
        published:
          "border-transparent bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 gap-1.5 [&_span]:bg-emerald-500",
        draft:
          "border-transparent bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 gap-1.5 [&_span]:bg-amber-500",
        retired:
          "border-transparent bg-zinc-500/10 text-zinc-600 dark:bg-zinc-500/20 dark:text-zinc-400 gap-1.5 [&_span]:bg-zinc-500",
        // Difficulties
        easy: "border-transparent bg-teal-500/15 text-teal-600 font-bold",
        medium: "border-transparent bg-amber-500/15 text-amber-600 font-bold",
        hard: "border-transparent bg-purple-500/15 text-purple-600 font-bold",
        expert: "border-transparent bg-rose-500/15 text-rose-600 font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

function Badge({ className, variant, showDot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && <span className="h-1.5 w-1.5 rounded-full shrink-0" />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
