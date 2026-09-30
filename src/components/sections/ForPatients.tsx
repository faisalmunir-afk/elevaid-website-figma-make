import { HeartPulse, KeyRound, UserRoundSearch, type LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

// Patient-side capabilities only: nothing here shows a live link to the physician's dashboard.
const CAPABILITIES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: KeyRound,
    title: "Share with a physician",
    body: "Grant access to a specific doctor, for a specific reason, for as long as you choose. Revoke it anytime.",
  },
  {
    icon: UserRoundSearch,
    title: "Find the right caregiver",
    body: "Search for providers and specialists based on what your own record already shows.",
  },
  {
    icon: HeartPulse,
    title: "Manage your wellness",
    body: "Track your own health over time, in plain language, without waiting for a portal login.",
  },
];

export function ForPatients() {
  return (
    <section id="for-patients" className="scroll-mt-24 bg-surface-muted py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              Your records. Used the way you want.
            </>
          }
          lede="One app, three things it does. Nothing here requires a physician to be watching."
          align="center"
        />

        <RevealGroup
          stagger={0.08}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {CAPABILITIES.map((item) => (
            <RevealItem key={item.title} className="h-full">
              <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card-hover sm:p-7">
                <Icon3D icon={item.icon} />
                <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal y={16} className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-ink-500">
            A patient who understands their own history walks in prepared.{" "}
            <span className="font-semibold text-ink-900">
              A physician who receives that patient spends less time asking, more time treating.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
