import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { TextField } from "../../components/ui/FormField";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
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
      await authService.signUp({ name, company, email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setNotice(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start monitoring your first competitor in a couple of minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/log-in" className="font-medium text-signal-dark hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Full name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alexandra Novak"
        />
        <TextField
          label="Company (optional)"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Northloop Studio"
        />
        <TextField
          label="Work email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <TextField
          label="Password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        {notice && (
          <div className="rounded-[var(--radius-control)] border border-amber-tint bg-amber-tint/60 p-3.5 text-sm text-amber">
            {notice}
          </div>
        )}

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-center text-xs text-ink-faint">
          By signing up, you agree to Competitor Radar's Terms and Privacy Policy.
        </p>
      </form>
    </AuthLayout>
  );
}
