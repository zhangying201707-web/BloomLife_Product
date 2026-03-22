export default function BrandLogo({ compact = false }) {
  return (
    <div className={compact ? 'brand-logo compact' : 'brand-logo'}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6a17a" />
            <stop offset="100%" stopColor="#cb5d2f" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#fff3e9" />
        <ellipse cx="32" cy="20" rx="8" ry="12" fill="url(#petalGrad)" />
        <ellipse cx="44" cy="32" rx="8" ry="12" fill="url(#petalGrad)" transform="rotate(90 44 32)" />
        <ellipse cx="20" cy="32" rx="8" ry="12" fill="url(#petalGrad)" transform="rotate(90 20 32)" />
        <ellipse cx="32" cy="44" rx="8" ry="12" fill="url(#petalGrad)" />
        <circle cx="32" cy="32" r="8" fill="#6f3a25" />
      </svg>
      <div className="brand-wordmark">
        <strong>Bloom & Breeze</strong>
        {!compact && <span>Urban Flower Studio</span>}
      </div>
    </div>
  );
}
