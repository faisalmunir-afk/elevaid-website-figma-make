import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const PARTNERS = [
  "ID.me",
  "Verato",
  "Fasten Health",
  "Metriport",
  "HAPI FHIR",
  "HL7 v2",
  "FHIR R4",
  "NPI Registry",
];

export function Marquee() {
  return (
    <section className="border-y border-border bg-surface-muted py-10">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
            Built on verified identity and national record infrastructure
          </p>
        </Reveal>
      </Container>

      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
