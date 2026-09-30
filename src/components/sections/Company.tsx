import aliAfzalPhoto from "../../assets/team/ali-afzal.png";
import aliSubatPhoto from "../../assets/team/ali-subat.png";
import chrisDrakePhoto from "../../assets/team/chris-drake.png";
import { Image } from "../ui/Image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Chip } from "../ui/Chip";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { cn } from "../../lib/utils";

const TEAM = [
  {
    name: "Ali Afzal",
    role: "Founder",
    credential: "YC '21 · Meraki Ventures",
    photo: aliAfzalPhoto,
    frame: "origin-[50%_12%] scale-[1.3]",
  },
  {
    name: "Ali Subat, M.D.",
    role: "Clinical Lead",
    credential: "anaesthesiologist",
    photo: aliSubatPhoto,
    // Circular cut-out: zoom onto the face so the circle's edge stays out of frame.
    frame: "origin-[50%_24%] scale-[1.5]",
  },
  {
    name: "Chris Drake",
    role: "Operations",
    credential: "wealth mgmt · Glovendor",
    photo: chrisDrakePhoto,
    // Circular cut-out with stray text at the bottom edge: zoom onto the face to crop it out.
    frame: "origin-[50%_24%] scale-[1.5]",
  },
];

const ROADMAP = [
  {
    year: "2025",
    title: "Foundation",
    body: "Interoperable infrastructure. Selected for NICL Lahore.",
    active: false,
  },
  {
    year: "2026 · now",
    title: "Build & launch",
    body: "MVP end of Q1 · B2B launch Q2 · e-consults and clinical intelligence late 2026.",
    active: true,
  },
  {
    year: "2028",
    title: "Vertical integration",
    body: "Physical care facilities — from data to direct care.",
    active: false,
  },
];

type Person = (typeof TEAM)[number];

function TeamCard({ person }: { person: Person }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="relative aspect-square overflow-hidden bg-surface-sunk">
        {/* Cut-out headshot; `frame` crops per photo */}
        <div className={cn("absolute inset-0", person.frame)}>
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 640px) 360px, 75vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="p-4">
        <p className="font-display text-base font-bold text-ink-900">{person.name}</p>
        <p className="text-xs text-ink-500">{person.role}</p>
        <p className="mt-2.5 text-xs text-ink-400">{person.credential}</p>
      </div>
    </article>
  );
}

export function Company() {

  return (
    <section id="company" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              Who&apos;s building it, and where it goes
            </>
          }
        />

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {TEAM.map((person) => (
            <RevealItem key={person.name}>
              <TeamCard person={person} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-lg font-bold text-ink-900">
              Roadmap
            </h3>
          </Reveal>

          <div className="relative mt-8 space-y-6">
            <div
              aria-hidden
              className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-border"
            />
            {ROADMAP.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} y={16}>
                <div className="relative flex gap-6 pl-10">
                  <div
                    className={cn(
                      "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-white",
                      item.active
                        ? "border-primary"
                        : "border-border-strong"
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        item.active ? "bg-primary" : "bg-border-strong"
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "flex-1 rounded-2xl border p-5 sm:p-6",
                      item.active
                        ? "border-primary/30 bg-primary-light"
                        : "border-border bg-white"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-ink-900">
                        {item.year}
                      </span>
                      <h4 className="text-base font-bold text-ink-900">
                        {item.title}
                      </h4>
                      {item.active && <Chip variant="good">← active</Chip>}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
