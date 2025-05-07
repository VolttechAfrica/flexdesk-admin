import React from "react"
import "@styles/input.css"

export interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  options: Array<{label: string; value: string | number}>
}

const SelectInput = React.forwardRef<HTMLSelectElement, InputProps>(({ className = "", options=[], children, ...props }, ref) => {
  return (
    <>
    <select className={`select-input ${className}`} ref={ref} {...props}>
    <option>--Select--</option>
      {options
      ? options.map((option, idx) => (
        <option key={idx} value={option.value}>
            {option.label}
        </option>
      )): children
    }
    </select>
    </>
  )
})

SelectInput.displayName = "SelectInput"
export default SelectInput