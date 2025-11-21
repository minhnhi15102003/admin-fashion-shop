import type { ReactNode } from "react"

interface LabelProps {
    htmlFor?: string,
    className?: string,
    children:ReactNode
}
const Label = ({htmlFor,className, children}:LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`mb-1.5 block text-sm font-medium ${className}`}>
        {children}
    </label>
  )
}

export default Label