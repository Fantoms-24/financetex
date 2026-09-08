import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { b as cn } from "./router-eDuhfEID.js";
const Input = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref,
      className: cn("field", className),
      ...props
    }
  )
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref, className: cn("field resize-none leading-relaxed", className), ...props })
);
Textarea.displayName = "Textarea";
export {
  Input as I
};
