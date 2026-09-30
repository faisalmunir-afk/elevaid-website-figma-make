import { Hourglass, Zap, FileStack, Grid2x2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const STATS = [
  {
    value: (
      <>
        30–60 <span className="text-lg font-medium text-ink-400 sm:text-xl">min</span>
      </>
    ),
    label: "Chart review before — hunting portals, faxes and release forms",
    icon: Hourglass,
  },
  {
    value: (
      <>
        &lt; 15 <span className="text-lg font-medium text-ink-400 sm:text-xl">ms</span>
      </>
    ),
    label: (
      <>
        To load a complete,
        <br />
        grouped chart
      </>
    ),
    icon: Zap,
  },
  {
    value: "9–15",
    label: "Problem cards, deterministically grouped from a lifetime of records",
    icon: FileStack,
  },
  {
    value: "5",
    label: "Specialty views — DPC, primary care, surgery, cardiology, pediatrics",
    icon: Grid2x2,
  },
];

export function Stats() {

  return (
    <section
      className="relative isolate overflow-hidden bg-primary-light py-28 sm:py-40 lg:py-48"
    >

      <Container>
        <SectionHeading
          heading="What changes when the record is already there"
          align="center"
        />

        <RevealGroup
          stagger={0.08}
          className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <RevealItem key={i} className="group h-full">
              {/* Glass card: a compact row on phones, a centred tile from sm up */}
              <div className="relative isolate flex h-full items-center gap-5 rounded-2xl border border-border bg-white p-5 shadow-card transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[translate] group-hover:-translate-y-1.5 group-hover:border-primary/40 motion-reduce:group-hover:translate-y-0 sm:flex-col sm:items-center sm:gap-0 sm:px-7 sm:py-10 sm:text-center">
                {/* Hover shadow fades in on its own layer; animating box-shadow directly stutters */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 shadow-card-hover transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100"
                />
                <Icon3D icon={stat.icon} className="sm:mb-5" />
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500 sm:mt-3">
                    {stat.label}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
