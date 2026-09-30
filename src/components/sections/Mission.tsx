import {
  ArrowRight,
  Building2,
  Database,
  FlaskConical,
  Map,
  Pill,
  Stethoscope,
  User,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const INSTITUTIONS: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: "Hospital" },
  { icon: FlaskConical, label: "Lab" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Stethoscope, label: "Specialist" },
];

function Person({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary-light text-primary-dark">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ink-500">{label}</span>
    </div>
  );
}

/** Before / now contrast. Static on purpose: no motion between patient and physician. */
function BeforeNow() {
  return (
    <div className="space-y-4">
      {/* Before: institutions passing records to each other */}
      <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 sm:p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-white/80">Before</span>
          <span className="text-white/60">20 years</span>
        </div>
        <div className="relative mt-5 grid grid-cols-4">
          <div aria-hidden className="absolute inset-x-[12.5%] top-5 border-t border-dashed border-white/30" />
          {INSTITUTIONS.map(({ icon: Icon, label }) => (
            <div key={label} className="relative flex flex-col items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/80">
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-wide text-white/70">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-white/80">Records moved between institutions.</p>
      </div>

      {/* Now: one record, two people */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-primary-dark">Now</span>
          <span className="normal-case tracking-normal text-ink-400">elevAID</span>
        </div>
        <div className="mt-5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-start gap-2 sm:gap-3">
          <Person icon={User} label="Patient" />
          <div aria-hidden className="mt-6 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary))]" />
          <div className="flex flex-col items-center">
            <span className="flex h-12 items-center gap-2 rounded-xl bg-primary-dark px-3 text-white">
              <Database className="h-4 w-4" />
              <span className="whitespace-nowrap font-display text-[13px] font-bold">One record</span>
            </span>
          </div>
          <div aria-hidden className="mt-6 h-px bg-[linear-gradient(90deg,var(--color-primary),transparent)]" />
          <Person icon={Stethoscope} label="Physician" />
        </div>
        <p className="mt-5 text-sm font-medium text-ink-900">One record between two people.</p>
      </div>
    </div>
  );
}

export function Mission() {
  return (
    <section data-nav-theme="dark" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#1d5e5c_0%,#2a7a77_55%,#237350_100%)] py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-white/75 sm:text-4xl lg:text-[2.75rem]">
              For twenty years, healthcare moved records between institutions.{" "}
              <span className="text-white">We put one record between two people.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-6 max-w-xl lg:mx-0">
            <p className="text-base leading-relaxed text-white/85 sm:text-lg">
              A physician-founded team building the record layer that belongs
              to the patient and the doctor at the same time.
            </p>
          </Reveal>
          <Reveal
            delay={0.15}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button href="#cta" variant="primary" className="bg-white px-6 py-3 text-base text-primary-dark hover:bg-white/90">
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#company"
              variant="ghost"
              className="px-6 py-3 text-base text-white hover:text-white/70"
            >
              See the roadmap
              <Map className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={28} className="mx-auto w-full max-w-lg lg:max-w-none">
          <BeforeNow />
        </Reveal>
      </Container>
    </section>
  );
}
