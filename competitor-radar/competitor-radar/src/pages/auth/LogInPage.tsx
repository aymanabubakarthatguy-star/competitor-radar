import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { TextField } from "../../components/ui/FormField";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotice(null);
    try {
      await authService.logIn({ email, password });
    } catch {
      setNotice(
        "Log in isn't connected yet — this is a UI preview. Use \"Preview the dashboard\" below to explore the product with demo data."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see what's changed since you last checked."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium text-signal-dark hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <div>
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
          <Link
            to="/forgot-password"
            className="mt-2 inline-block text-xs font-medium text-signal-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {notice && (
          <div className="rounded-[var(--radius-control)] border border-amber-tint bg-amber-tint/60 p-3.5 text-sm text-amber">
            {notice}
          </div>
        )}

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Logging in…" : "Log in"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={() => navigate("/dashboard")}
        >
          Preview the dashboard
        </Button>
      </form>
    </AuthLayout>
  );
}
