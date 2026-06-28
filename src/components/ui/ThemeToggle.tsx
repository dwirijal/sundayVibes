"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb)
      return () => window.removeEventListener("storage", cb)
    },
    () => document.documentElement.classList.contains("dark"),
    () => false
  )

  if (!mounted) {
    return (
      <Button variant="ghost" style={{ width: '44px', height: '44px' }} aria-label="Light mode">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-muted rounded-full p-1.5">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', flexShrink: 0 }}
        className="rounded-full flex-shrink-0"
        onClick={() => setTheme("light")}
        title="Light mode"
        aria-label="Switch to light mode"
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', flexShrink: 0 }}
        className="rounded-full flex-shrink-0"
        onClick={() => setTheme("dark")}
        title="Dark mode"
        aria-label="Switch to dark mode"
      >
        <Moon className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', flexShrink: 0 }}
        className="rounded-full flex-shrink-0"
        onClick={() => setTheme("system")}
        title="System theme"
        aria-label="Switch to system theme"
      >
        <Monitor className="h-5 w-5" />
      </Button>
    </div>
  )
}
