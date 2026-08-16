import { mockUser } from "../../data/mockUser";

interface DashboardTopbarProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function DashboardTopbar({ title, subtitle, onMenuClick }: DashboardTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border-soft bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-label="Open menu"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5" stroke="#0B1120" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft hover:bg-surface-subtle"
          aria-label="Notifications"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2.5C6 2.5 5 5 5 7.5V10L3.5 12.5H14.5L13 10V7.5C13 5 12 2.5 9 2.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-alert" />
        </button>
        <div className="flex items-center gap-2.5 rounded-full border border-border py-1 pl-1 pr-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-tint text-xs font-semibold text-signal-dark">
            {mockUser.avatarInitials}
          </span>
          <span className="hidden text-sm font-medium text-ink sm:inline">{mockUser.name}</span>
        </div>
      </div>
    </header>
  );
}
