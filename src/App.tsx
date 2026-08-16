import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LogInPage from "./pages/auth/LogInPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CompetitorsPage from "./pages/dashboard/CompetitorsPage";
import AlertsPage from "./pages/dashboard/AlertsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/competitors" element={<CompetitorsPage />} />
        <Route path="/dashboard/alerts" element={<AlertsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
