import { NavLink, useNavigate } from "react-router-dom";
import { RadarMark } from "../radar/RadarMark";
import { APP_NAME } from "../../utils/constants";
import { authService } from "../../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/dashboard/competitors", label: "Competitors", icon: CompetitorsIcon },
  { to: "/dashboard/alerts", label: "Alerts", icon: AlertsIcon },
  { to: "/dashboard/reports", label: "Reports", icon: ReportsIcon },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (onNavigate) onNavigate();
    await authService.logOut();
    navigate("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-navy text-white">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <RadarMark size={28} />
        <span className="font-display text-[15px] font-semibold tracking-tight">{APP_NAME}</span>
      </div>

      <nav className="flex-1 space-y-1 px-3.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3.5 mb-3 rounded-xl border border-navy-border bg-navy-soft p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-signal-bright">Pro plan</p>
        <p className="mt-1 text-xs text-white/60">5 of 5 competitors used</p>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-full rounded-full bg-signal-bright" />
        </div>
      </div>

      <div className="border-t border-white/10 px-3.5 py-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogoutIcon />
          Sign out
        </button>
      </div>
    </div>
  );
}

function iconProps() {
  return { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none" } as const;
}

function DashboardIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="2" y="2" width="6" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="2" width="6" height="4" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="8" width="6" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="10.5" width="6" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function CompetitorsIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="0.8" fill="currentColor" />
    </svg>
  );
}
function AlertsIcon() {
  return (
    <svg {...iconProps()}>
      <path
        d="M9 2.5C6 2.5 5 5 5 7.5V10L3.5 12.5H14.5L13 10V7.5C13 5 12 2.5 9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 14.5C7.3 15.3 8 15.8 9 15.8C10 15.8 10.7 15.3 11 14.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function ReportsIcon() {
  return (
    <svg {...iconProps()}>
      <path
        d="M4 2.5H11L14.5 6V15.5H4V2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6.5 9H11.5M6.5 11.5H11.5M6.5 6.5H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="9" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 2.8V4.3M9 13.7V15.2M15.2 9H13.7M4.3 9H2.8M13.2 4.8L12.1 5.9M5.9 12.1L4.8 13.2M13.2 13.2L12.1 12.1M5.9 5.9L4.8 4.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg {...iconProps()}>
      <path
        d="M6.5 15.5H4C3.17157 15.5 2.5 14.8284 2.5 14V4C2.5 3.17157 3.17157 2.5 4 2.5H6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M12.5 12.5L16 9L12.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9H15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
