import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { RadarMark } from "../radar/RadarMark";

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="border-t border-border-soft bg-navy py-20 text-white sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <RadarMark size={40} />
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Stop checking. Start knowing.
        </h2>
        <p className="mt-4 max-w-md text-white/60">
          Add your first competitor in under two minutes and see what Competitor Radar catches.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => navigate("/sign-up")}>
            Start Monitoring
          </Button>
          <Button variant="dark" size="lg" onClick={() => navigate("/log-in")}>
            Log in
          </Button>
        </div>
      </div>
    </section>
  );
}
