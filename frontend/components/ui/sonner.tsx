"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-success" />
        ),
        info: (
          <InfoIcon className="size-5 text-primary" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5 text-warning" />
        ),
        error: (
          <OctagonXIcon className="size-5 text-destructive" />
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin text-primary" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border/40 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:font-sans group-[.toaster]:border group-[.toaster]:p-4 group-[.toaster]:gap-3.5",
          title: "group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:text-foreground",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs group-[.toast]:leading-normal group-[.toast]:mt-0.5",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-bold group-[.toast]:transition-all hover:group-[.toast]:bg-primary/95",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-bold",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
