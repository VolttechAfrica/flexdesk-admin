import React from "react"
import "@styles/input.css"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return <input className={`input ${className}`} ref={ref} {...props} />
})

Input.displayName = "Input"
export default Input