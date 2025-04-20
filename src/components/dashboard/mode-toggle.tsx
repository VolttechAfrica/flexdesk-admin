"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@components/ui/button"
import styles from "@styles/mode-toggle.module.css" 

export default function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={styles.theme_toggle_button}
    >
      {theme === "light" ? (
        <Sun className={styles.sun_icon} />
      ) : (
        <Moon className={styles.moon_icon} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
