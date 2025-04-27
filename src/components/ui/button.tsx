import * as React from "react"


// Simple utility to join classnames
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Simple Slot implementation
const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
    ({ children, ...props }, ref) => {
      // Validate that children is a single, valid React element.
      // React.Children.only will throw an error if it's not, which is acceptable behavior for Slot.
      let child: React.ReactElement;
      try {
        child = React.Children.only(children) as React.ReactElement;
      } catch (e) {
        console.error("Slot component requires a single React element child.", e);
        // Depending on requirements, you might return null, children, or re-throw.
        // Returning null is often safest if props/ref merging is essential.
        return null;
      }
  
      // Ensure the child is actually a valid element after potentially catching errors above.
      if (!React.isValidElement(child)) {
          console.error("Slot component received an invalid React element child.");
          return null;
      }
  
      // Prepare the props for the cloned element.
      // Start with the child's existing props, then override with Slot's props.
      const mergedProps: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> } = {
        ...(typeof child.props === "object" ? child.props : {}),
        ...props,
      };
  
      // Add the ref to the props object if a ref was passed to Slot.
      // React.cloneElement knows how to handle the 'ref' property correctly.
      if (ref) {
        mergedProps.ref = ref;
      }
  
      return React.cloneElement(
        child, // The single child element to clone
        mergedProps // The combined props, including the forwarded ref
      );
    },
  );
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
