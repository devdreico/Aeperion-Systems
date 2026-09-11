import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AEPERION — Input UI Primitive
 *
 * HANDOFF-FRONTEND:
 *   - focus: animar borde con transición
 *   - error: shake animation
 *   - agregar icono interno con <InputIcon>
 */

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-ae-gray-200 bg-white px-4 py-2 text-sm text-ae-gray-900 placeholder:text-ae-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-green-400 focus:border-ae-green-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
