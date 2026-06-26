"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb)
      return () => window.removeEventListener("storage", cb)
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  )

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        className="w-7 h-7 rounded-full"
        onClick={() => setTheme("light")}
        title="Light mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        className="w-7 h-7 rounded-full"
        onClick={() => setTheme("dark")}
        title="Dark mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="icon"
        className="w-7 h-7 rounded-full"
        onClick={() => setTheme("system")}
        title="System theme"
      >
        <Monitor className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
