import { Quote } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { stepLabel } from "../../lib/utils";

const BEATS = [
  {
    code: "01 / open",
    title: "The chart is ready",
    body: "Fourteen years, grouped, deduplicated, summarized and sourced.",
  },
  {
    code: "02 / complete",
    title: "The gaps are filled",
    body: "The cardiology consult. The ER visit. The prescription that would have interacted.",
  },
  {
    code: "03 / act",
    title: "The visit becomes medicine",
    body: "The appointment stops being a memory test and starts being care.",
  },
];

export function Testimonial() {
  return (
    <section className="bg-surface-muted py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              She stopped asking him to remember.
            </>
          }
          lede="Same room. Same two people. Same question on the form — and nobody needs to ask it."
          align="center"
        />

        <Reveal delay={0.1} y={28} className="mt-14">
          <figure className="mx-auto max-w-4xl text-center">
            <Quote aria-hidden className="mx-auto h-8 w-8 text-primary/25" />
            <blockquote className="mt-8 text-2xl font-medium leading-[1.45] tracking-tight text-ink-900 sm:text-3xl sm:leading-[1.4] lg:text-[2.5rem] lg:leading-[1.35]">
              &quot;I don&apos;t open the chart and start reconstructing.
              Fourteen years are already there — grouped, sourced, and{" "}
              <strong className="font-bold brand-text-gradient">it already makes sense.</strong> I
              stopped asking him to tell me his history. Now I tell him what I
              see in it.&quot;
            </blockquote>
            <figcaption className="mt-10 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light font-display text-sm font-bold text-accent">
                PP
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-ink-900">
                  Dr. Priya Patel
                </p>
                <p className="font-mono text-[11px] text-ink-400">
                  primary care physician · illustrative
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {BEATS.map((beat) => (
            <RevealItem key={beat.code} className="h-full">
              <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card-hover sm:p-7">
                <p className="text-xs font-semibold text-primary-dark">
                  {stepLabel(beat.code)}
                </p>
                <h3 className="mt-2 text-base font-bold text-ink-900">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {beat.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
