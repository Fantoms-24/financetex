import { j as jsxDevRuntimeExports, d as cn } from "./router-jILV0Ki5.js";
import { r as reactExports } from "../server.js";
const Input = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "input",
    {
      ref,
      className: cn("field", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/ui/input.tsx",
      lineNumber: 6,
      columnNumber: 5
    },
    void 0
  )
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("textarea", { ref, className: cn("field resize-none leading-relaxed", className), ...props }, void 0, false, {
    fileName: "/app/applet/src/components/ui/input.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, void 0)
);
Textarea.displayName = "Textarea";
export {
  Input as I
};
