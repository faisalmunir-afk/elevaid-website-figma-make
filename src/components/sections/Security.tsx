import type { ReactNode } from "react";
import { BadgeCheck, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

// Plain-language benefit first; the standard behind it as a small tag.
const BADGES = [
  { icon: ShieldCheck, title: "Identity checked by ID.me", standard: "IAL2 assurance" },
  { icon: BadgeCheck, title: "HIPAA compliant", standard: "Business Associate Agreement" },
  { icon: UserCheck, title: "Doctors see only their own patients", standard: "NPI · facility-scoped" },
  { icon: Lock, title: "Records encrypted in storage", standard: "FHIR R4 · HAPI" },
];

// Each diagram's viewBox is cropped to its drawing so all three fill their card's visual panel evenly.

function VerifiedIdentityDiagram() {

  return (
    <svg viewBox="120 28 160 156" fill="none" className="h-full w-full">
      <circle cx="200" cy="75" r="34" stroke="var(--color-border-strong)" strokeWidth="1.5" />
      <circle cx="200" cy="64" r="10" stroke="var(--color-primary)" strokeWidth="1.6" />
      <path d="M180 96 q20 -18 40 0" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />

      <circle cx="228" cy="100" r="15" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="1.75" />
      <path
        d="M221 100 l5 6 l10 -12"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="200" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--color-primary)">
        VERIFIED
      </text>
      <text x="200" y="173" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--color-ink-400)">
        ID.me · IAL2 · Verato
      </text>
    </svg>
  );
}

function ScopedAccessDiagram() {

  return (
    <svg viewBox="80 26 312 176" fill="none" className="h-full w-full">
      <circle cx="160" cy="105" r="68" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="2 6" />

      <circle cx="160" cy="88" r="17" stroke="var(--color-accent)" strokeWidth="1.75" />
      <rect x="152" y="80" width="16" height="13" rx="2" stroke="var(--color-accent)" strokeWidth="1.3" />
      <path d="M155 84 h10 M155 88 h6" stroke="var(--color-accent)" strokeWidth="1.1" strokeLinecap="round" />

      <circle cx="132" cy="128" r="5" fill="var(--color-primary)" />
      <circle cx="160" cy="138" r="5" fill="var(--color-primary)" />
      <circle cx="188" cy="126" r="5" fill="var(--color-primary)" />
      <text x="160" y="194" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--color-ink-400)">
        142 PATIENTS
      </text>

      <circle cx="330" cy="60" r="5" stroke="var(--color-border-strong)" strokeWidth="1.4" />
      <circle cx="350" cy="100" r="5" stroke="var(--color-border-strong)" strokeWidth="1.4" />
      <path d="M334 74 l12 12 M346 74 l-12 12" stroke="var(--color-ink-400)" strokeWidth="1.3" strokeLinecap="round" />
      <text x="340" y="135" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--color-ink-400)">
        OTHERS · DENIED
      </text>
    </svg>
  );
}

const TIMELINE_NODES = [
  { cx: 46, label: "CREATED" },
  { cx: 149, label: "SCOPED" },
  { cx: 252, label: "EXPIRES 7D" },
  { cx: 355, label: "REVOKED" },
];

const TIMELINE_SEGMENTS = [
  { x1: 63, x2: 132 },
  { x1: 166, x2: 235 },
  { x1: 269, x2: 338 },
];

function PermissionTimelineDiagram() {

  return (
    <svg viewBox="18 72 368 72" fill="none" className="h-full w-full">
      {TIMELINE_SEGMENTS.map((seg) => (
        <g key={`${seg.x1}-${seg.x2}`}>
          <line
            x1={seg.x1}
            y1={100}
            x2={seg.x2}
            y2={100}
            stroke="var(--color-border-strong)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0.1 10"
          />
        </g>
      ))}

      {TIMELINE_NODES.map((node, i) => {
        const isLast = i === TIMELINE_NODES.length - 1;
        return (
          <g key={node.label}>
            <circle
              cx={node.cx}
              cy={100}
              r={17}
              fill="var(--color-surface)"
              stroke={isLast ? "var(--color-good)" : "var(--color-border-strong)"}
              strokeWidth={isLast ? 1.75 : 1.5}
            />
            {isLast && <path d="M39 100 l5 5 l10 -11" stroke="var(--color-good)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${node.cx - 46}, 0)`} />}
            <text x={node.cx} y={136} textAnchor="middle" className="font-mono" fontSize="10" fill="var(--color-ink-400)">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const CARDS: { title: string; body: string; visual: ReactNode }[] = [
  {
    title: "Verified identity",
    body: "Records attach to a verified person — never a name match.",
    visual: <VerifiedIdentityDiagram />,
  },
  {
    title: "NPI-scoped access",
    body: "A physician sees their patients and nobody else's.",
    visual: <ScopedAccessDiagram />,
  },
  {
    title: "Patient-held permission",
    body: "Partial, time-limited and revocable.",
    visual: <PermissionTimelineDiagram />,
  },
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          heading={
            <>
              She sees everything. He decides what.
            </>
          }
          lede="Putting a whole medical history between two people only works if you're certain who they both are — and if one of them keeps the key."
        />

        <p className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
          The standards behind it
        </p>
        <RevealGroup className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {BADGES.map((badge) => (
            <RevealItem key={badge.title} className="h-full">
              <div className="flex h-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
                <Icon3D icon={badge.icon} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-ink-900">{badge.title}</p>
                  <p className="mt-0.5 font-mono text-[11px] leading-snug text-ink-400">{badge.standard}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup stagger={0.08} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <RevealItem key={card.title} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card-hover">
                {/* Visual panel: fixed height so the three diagrams line up across cards */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-border bg-surface-muted px-6 py-6">
                  <div className="relative h-full w-full">{card.visual}</div>
                </div>
                <div className="flex-1 p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-ink-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{card.body}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
