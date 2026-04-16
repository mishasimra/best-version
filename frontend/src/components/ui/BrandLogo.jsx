export function BrandLogo({ compact = false, theme = "light" }) {
  return (
    <span className={`brand-logo brand-logo-${theme} ${compact ? "brand-logo-compact" : ""}`.trim()}>
      <svg viewBox="0 0 72 72" aria-hidden="true" role="img">
        <defs>
          <linearGradient id="best-version-shell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd978" />
            <stop offset="50%" stopColor="#49d19a" />
            <stop offset="100%" stopColor="#0f6f4a" />
          </linearGradient>
          <linearGradient id="best-version-letter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f6f4a" />
            <stop offset="100%" stopColor="#173627" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="56" height="56" rx="18" fill="url(#best-version-shell)" />
        <path
          d="M24 20h15.5c7 0 12.5 5.2 12.5 11.5 0 4.2-2.3 7.8-6 9.7 4.7 1.5 8 5.4 8 10.3 0 6.5-5.6 11.5-12.8 11.5H24V20Z"
          fill="url(#best-version-letter)"
        />
        <path
          d="M32 28h7.2c3.2 0 5.8 2.1 5.8 4.8S42.4 37 39.2 37H32V28Z"
          fill="#f6fff9"
          opacity="0.96"
        />
        <path
          d="M32 44h8.6c3.4 0 6.2 2.2 6.2 4.9S44 54 40.6 54H32V44Z"
          fill="#f6fff9"
          opacity="0.9"
        />
        <path
          d="M45.5 18.5 55 35.5 62 25.5"
          fill="none"
          stroke="#fff4cf"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="brand-logo-copy">
        <strong>Best Version</strong>
        {!compact ? <small>Build visibly. Grow powerfully.</small> : null}
      </span>
    </span>
  );
}
