import * as React from "react"


// Simple utility to join classnames
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Simple Slot implementation
const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    const child = React.Children.only(children) as React.ReactElement

    return React.cloneElement(child, {
      ...props,
      ...child.props,
      ref: ref
        ? (node: HTMLElement) => {
            // @ts-ignore - this is a simplified version
            if (typeof child.ref === "function") child.ref(node)
            // @ts-ignore - this is a simplified version
            else if (child.ref) child.ref.current = node
            // @ts-ignore - this is a simplified version
            if (typeof ref === "function") ref(node)
            // @ts-ignore - this is a simplified version
            else if (ref) ref.current = node
          }
        : child.ref,
    })
  },
)
Slot.displayName = "Slot"

// Types for button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

// Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Base classes
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    // Variant classes
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }

    // Size classes
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    // Combine all classes
    const buttonClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    const Comp = asChild ? Slot : "button"
    return <Comp className={buttonClasses} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button }
