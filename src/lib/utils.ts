import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// Since @radix-ui/react-slot is missing, let's create a simple Slot implementation
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

// Import the cn utility directly to avoid the path issue
const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(" ")
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
