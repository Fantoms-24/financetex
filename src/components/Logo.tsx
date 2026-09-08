export function Logo({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="ЧекАгент"
    >
      <rect width="64" height="64" rx="15" fill="#3d5c4a" />
      <g transform="rotate(-9 32 32)">
        {/* чек */}
        <path
          d="M22 13h20a1.5 1.5 0 0 1 1.5 1.5v34.2c0 .9-.8 1.5-1.7 1.4l-3.3-.5-3.2.6-3.3-.6-3.2.6-3.3-.6-3.2.6-3.3-.6-2.4.4a1.5 1.5 0 0 1-1.6-1.5V14.5A1.5 1.5 0 0 1 22 13Z"
          fill="#faf6ee"
        />
        {/* дырки слева */}
        <circle cx="25.5" cy="19" r="1.25" fill="#3d5c4a" opacity="0.5" />
        <circle cx="25.5" cy="26" r="1.25" fill="#3d5c4a" opacity="0.5" />
        <circle cx="25.5" cy="33" r="1.25" fill="#3d5c4a" opacity="0.5" />
        <circle cx="25.5" cy="40" r="1.25" fill="#3d5c4a" opacity="0.5" />
        {/* строки */}
        <rect x="30" y="18" width="12" height="1.6" rx="0.8" fill="#3d5c4a" opacity="0.32" />
        <rect x="30" y="25" width="9" height="1.6" rx="0.8" fill="#3d5c4a" opacity="0.32" />
        <rect x="30" y="32" width="11" height="1.6" rx="0.8" fill="#3d5c4a" opacity="0.32" />
        {/* печать ₽ */}
        <circle cx="33" cy="43" r="8.2" fill="none" stroke="#8f3d32" strokeWidth="1.5" opacity="0.85" />
        <g transform="translate(33 43)">
          <path
            d="M-2.6-4.6h3.9a2.55 2.55 0 0 1 0 5.1h-3.9"
            fill="none"
            stroke="#8f3d32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M-2.6 0.5v5.2" fill="none" stroke="#8f3d32" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M-4.4 2.4h5.9M-4.4 5.4h5.9" stroke="#8f3d32" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
