import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, Layers, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { SectionHeading } from "../ui/SectionHeading";
import { Chip } from "../ui/Chip";
import { Reveal } from "../ui/Reveal";
import { cn, stepLabel } from "../../lib/utils";

const STAGES = [
  {
    code: "01 / connect",
    title: "Pull from every source",
    body: "Patients pull their own records. Physicians pull records for their own patients, for treatment.",
    chips: ["Fasten", "Metriport", "HIE", "Labs"],
    icon: ArrowLeftRight,
  },
  {
    code: "02 / unify",
    title: "One record per patient",
    body: "Extracted, normalized, deduplicated and grouped into consistent FHIR on a shared store.",
    chips: ["HAPI FHIR", "R4", "deterministic"],
    icon: Layers,
  },
  {
    code: "03 / verify",
    title: "Bind to a real person",
    body: "Identity resolved to IAL2 and scoped by NPI, so access is provable on both sides.",
    chips: ["ID.me", "IAL2", "Verato", "NPI scope"],
    icon: ShieldCheck,
  },
  {
    code: "04 / read",
    title: "Two windows, one truth",
    body: "Plain language for the patient, an AI narrative and problem cards for the physician.",
    chips: ["Patient app", "Dashboard"],
    icon: LayoutDashboard,
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              Scattered to settled, in four stages
            </>
          }
          lede="Both directions run through the same pipeline and land in the same store."
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-2xl space-y-6">
          <div
            aria-hidden
            className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px border-l border-dashed border-border-strong"
          />

          {STAGES.map((stage, i) => {
            const isActive = active === i;
            return (
              <Reveal key={stage.code} delay={i * 0.06} y={20}>
                <div
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative flex gap-6"
                >
                  <Icon3D icon={stage.icon} tone={isActive ? "brand" : "light"} className="z-10 transition-shadow duration-300" />

                  <div
                    className={cn(
                      "flex-1 rounded-2xl border bg-white p-6 transition-all duration-300 sm:p-8",
                      isActive ? "border-primary/30 shadow-md" : "border-border opacity-60"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs font-semibold transition-colors duration-300",
                        isActive ? "text-primary-dark" : "text-ink-400"
                      )}
                    >
                      {stepLabel(stage.code)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-ink-900">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{stage.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {stage.chips.map((chip) => (
                        <Chip key={chip} variant="neutral">
                          {chip}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
