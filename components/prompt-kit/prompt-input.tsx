// components/prompt-kit/prompt-input.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type PromptInputProps = {
  isLoading?: boolean
  value: string
  onValueChange: (v: string) => void
  onSubmit: () => void
  className?: string
  children?: React.ReactNode
}

export function PromptInput({
  isLoading,
  value,
  onValueChange,
  onSubmit,
  className,
  children,
}: PromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className={cn("bg-white border rounded-xl p-2", className)}>
      {children}
    </div>
  )
}

export function PromptInputTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { className, ...rest } = props
  return (
    <textarea
      {...rest}
      rows={1}
      onKeyDown={(e) => {
        if (rest.onKeyDown) rest.onKeyDown(e)
      }}
      className={cn(
        "w-full resize-none bg-transparent outline-none",
        className
      )}
    />
  )
}

export function PromptInputActions({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>
}

export function PromptInputAction({
  tooltip,
  children,
}: { tooltip?: string; children: React.ReactNode }) {
  return <div title={tooltip}>{children}</div>
}

