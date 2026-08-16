interface RadarSweepProps {
  size?: number;
  className?: string;
}

/**
 * The signature visual for Competitor Radar: concentric rings with a
 * rotating sweep, evoking a monitoring radar screen. Used sparingly —
 * primarily in the hero.
 */
export function RadarSweep({ size = 420, className = "" }: RadarSweepProps) {
  const center = size / 2;
  const rings = [0.28, 0.5, 0.72, 0.94].map((f) => (size / 2) * f);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="radar-bg" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#16324a" />
            <stop offset="100%" stopColor="#0b1524" />
          </radialGradient>
          <linearGradient id="sweep-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4c7" stopOpacity="0" />
            <stop offset="100%" stopColor="#2dd4c7" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <circle cx={center} cy={center} r={size / 2 - 2} fill="url(#radar-bg)" stroke="#223148" />

        {rings.map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="#2b3f56"
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? "2 4" : undefined}
          />
        ))}

        <line x1={center} y1={8} x2={center} y2={size - 8} stroke="#1c2a3d" strokeWidth="1" />
        <line x1={8} y1={center} x2={size - 8} y2={center} stroke="#1c2a3d" strokeWidth="1" />

        <g className="animate-radar-sweep" style={{ transformOrigin: `${center}px ${center}px` }}>
          <path
            d={`M ${center} ${center} L ${center} 8 A ${center - 8} ${center - 8} 0 0 1 ${
              center + (center - 8) * Math.sin(Math.PI / 3)
            } ${center - (center - 8) * Math.cos(Math.PI / 3)} Z`}
            fill="url(#sweep-gradient)"
          />
        </g>

        {/* Blips representing detected changes */}
        <g>
          <circle cx={center + 60} cy={center - 90} r="4" fill="#dc2626" />
          <circle cx={center + 60} cy={center - 90} r="4" fill="#dc2626" className="animate-ping-soft" />
        </g>
        <g>
          <circle cx={center - 100} cy={center + 40} r="3.5" fill="#2dd4c7" />
        </g>
        <g>
          <circle cx={center + 30} cy={center + 110} r="3" fill="#d97706" />
        </g>

        <circle cx={center} cy={center} r="4" fill="#2dd4c7" />
      </svg>
    </div>
  );
}
