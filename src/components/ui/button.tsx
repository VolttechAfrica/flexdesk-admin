import React from "react"
import "@styles/button.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({disabled=false, variant = "default", size = "default", className = "", children, ...props }, ref) => {
    return (
      <button disabled={disabled} className={`button button-${variant} button-${size} ${className}`} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
export default Button