import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { TextField } from "../../components/ui/FormField";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotice(null);
    try {
      await authService.requestPasswordReset(email);
    } catch {
      setNotice(
        "Password reset isn't connected yet — this is a UI preview. Real reset emails will go out once the backend is wired up."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password."
      footer={
        <>
          Remembered it after all?{" "}
          <Link to="/log-in" className="font-medium text-signal-dark hover:underline">
            Back to log in
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

        {notice && (
          <div className="rounded-[var(--radius-control)] border border-amber-tint bg-amber-tint/60 p-3.5 text-sm text-amber">
            {notice}
          </div>
        )}

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
