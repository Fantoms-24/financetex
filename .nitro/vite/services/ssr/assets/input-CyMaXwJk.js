import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { b as cn } from "./router-bVUirNDJ.js";
const Input = reactExports.forwardRef(
  ({ className, style, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full items-center", children: [
        startIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-3.5 flex items-center justify-center text-muted", children: startIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref,
            className: cn("field", className),
            style: {
              paddingLeft: startIcon ? "42px" : void 0,
              paddingRight: endIcon ? "42px" : void 0,
              ...style
            },
            ...props
          }
        ),
        endIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 flex items-center justify-center text-muted", children: endIcon })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        className: cn("field", className),
        style,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref, className: cn("field resize-none leading-relaxed", className), ...props })
);
Textarea.displayName = "Textarea";
export {
  Input as I
};
