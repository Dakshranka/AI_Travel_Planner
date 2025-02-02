import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { cn } from "@/lib/utils";

// ForwardRef for Input component
const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

// Set display name for easier debugging
Input.displayName = "Input";

// Prop Types validation
Input.propTypes = {
  className: PropTypes.string, // className should be a string
  type: PropTypes.string,      // type should be a string (corrected)
};

export { Input };
