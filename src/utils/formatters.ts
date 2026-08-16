export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;

  return formatDate(isoDate);
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}
