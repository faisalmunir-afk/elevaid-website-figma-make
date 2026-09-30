import { FormEvent, useState } from "react";
import { ArrowRight, Building2, Check, User } from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/utils";

const AUDIENCES = {
  patient: {
    icon: User,
    label: "I'm a patient",
    body: "Put a lifetime of records back in one piece — and stop answering from memory.",
    placeholder: "you@email.com",
    cta: "Join the waitlist",
    note: "free to connect · no card required",
  },
  practice: {
    icon: Building2,
    label: "I'm a practice",
    body: "Open the chart and already know. Specialty views for DPC, primary care, surgery, cardiology and pediatrics.",
    placeholder: "you@practice.com",
    cta: "Book a demo",
    note: "see the business case for your panel",
  },
} as const;

type AudienceKey = keyof typeof AUDIENCES;

export function CTA() {
  const [audience, setAudience] = useState<AudienceKey>("patient");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const current = AUDIENCES[audience];

  function handleAudienceChange(key: AudienceKey) {
    if (key === audience) return;
    setAudience(key);
    setSubmitted(false);
    setEmail("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="cta" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              Two people. <span className="brand-text-gradient">One record.</span>
            </>
          }
          lede="The one place the story splits — because the next step genuinely differs."
          align="center"
        />

        <Reveal delay={0.1} y={24} className="mx-auto mt-14 max-w-lg">
          <div className="rounded-2xl border border-border bg-white p-7 sm:p-9">
            <div className="flex w-full rounded-full border border-border-strong bg-surface-muted p-1">
              {(Object.keys(AUDIENCES) as AudienceKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleAudienceChange(key)}
                  aria-pressed={audience === key}
                  className={cn(
                    "flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    audience === key
                      ? "bg-white text-ink-900 shadow-sm"
                      : "text-ink-500 hover:text-ink-900"
                  )}
                >
                  {AUDIENCES[key].label}
                </button>
              ))}
            </div>

            <Icon3D icon={current.icon} className="mt-6" />
            <p className="mt-4 text-sm leading-relaxed text-ink-500">{current.body}</p>

            {submitted ? (
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-good-border bg-good-bg px-4 py-3 text-sm font-medium text-good">
                <Check className="h-4 w-4 shrink-0" />
                You&apos;re on the list — we&apos;ll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="cta-email">
                  {current.placeholder}
                </label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={current.placeholder}
                  className={cn(
                    "min-w-0 flex-1 rounded-full border border-border-strong bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400",
                    "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 font-display text-sm font-semibold tracking-[0.02em] text-ink-900 shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/30 active:scale-[0.985] hover:bg-brand-shift transition-[background-position,box-shadow,scale] duration-700 ease-in-out [&>svg]:transition-transform [&>svg]:duration-500 hover:[&>svg]:translate-x-1"
                >
                  {current.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <p className="mt-4 font-mono text-[11px] text-ink-400">{current.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
