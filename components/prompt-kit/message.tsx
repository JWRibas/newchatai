// components/prompt-kit/message.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Message({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start gap-3", className)} {...props}>
      {children}
    </div>
  )
}

export function MessageAvatar({ src, alt, fallback = "?", className }: { src?: string; alt?: string; fallback?: string; className?: string }) {
  return (
    <div className={cn("size-8 shrink-0 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center overflow-hidden", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || ""} className="size-full object-cover" />
      ) : (
        <span className="text-xs font-medium">{fallback}</span>
      )}
    </div>
  )
}

export function MessageContent({ markdown, className, children }: { markdown?: boolean; className?: string; children: React.ReactNode }) {
  // Nota: markdown aqui é apenas uma flag. Para suporte real a Markdown, integrar um renderer (ex: react-markdown)
  return (
    <div className={cn("prose prose-sm max-w-none whitespace-pre-wrap break-words", className)}>
      {children}
    </div>
  )
}

