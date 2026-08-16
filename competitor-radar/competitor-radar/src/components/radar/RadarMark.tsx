interface RadarMarkProps {
  size?: number;
}

export function RadarMark({ size = 30 }: RadarMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B1524" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="#2DD4C7" strokeWidth="1.1" opacity="0.45" />
      <circle cx="16" cy="16" r="6.5" fill="none" stroke="#2DD4C7" strokeWidth="1.1" opacity="0.7" />
      <path d="M16 16 L16 5.5 A10.5 10.5 0 0 1 25 21 Z" fill="#0E7C86" opacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="#2DD4C7" />
    </svg>
  );
}
