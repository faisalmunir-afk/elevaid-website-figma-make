import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const EFFECTIVE_DATE = { iso: "2026-09-01", label: "September 1, 2026" };
const CONTACT_EMAIL = "Info@elevaid.co";

type Block =
  | { type: "p"; text: string }
  | { type: "label"; text: string }
  | { type: "list"; items: string[] };

const SECTIONS: { id: string; title: string; blocks: Block[] }[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      { type: "label", text: "From patients, directly:" },
      {
        type: "list",
        items: [
          "Account information: your name, email address, phone number, and date of birth, used to create and verify your account.",
          "Identity verification data: when you connect your account through ID.me, ID.me verifies your identity and shares confirmation of that verification with us. We do not receive or store the documents you may have submitted to ID.me itself.",
          "Health records: information you choose to pull into your account from providers, labs, pharmacies, or other sources you connect, including diagnoses, medications, lab results, visit notes, and similar clinical information.",
          "Anything you add yourself, such as notes about a visit or a symptom you're tracking.",
        ],
      },
      { type: "label", text: "From physicians and practices:" },
      {
        type: "list",
        items: [
          "Professional identifiers, including your National Provider Identifier (NPI), used to scope what records you can access.",
          "Patient roster and appointment data imported from your practice's electronic health record, so that patients you treat can be matched correctly inside elevAID.",
          "Records you retrieve on behalf of a patient through a network query, for that patient's treatment.",
        ],
      },
      { type: "label", text: "Automatically, from both:" },
      {
        type: "list",
        items: [
          "Device and usage information, such as browser type, IP address, and how you interact with the app or dashboard, collected to keep the service working and secure.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use this information",
    blocks: [
      { type: "p", text: "We use the information above for a short list of purposes, and nothing beyond them without asking first." },
      {
        type: "list",
        items: [
          "To let patients see and organize their own medical history in one place.",
          "To let physicians retrieve a patient's external records for that patient's treatment, scoped to patients they are actually treating.",
          "To verify identity, so that a record is matched to the right person and not confused with someone else.",
          "To translate clinical data into language a patient can actually read.",
          "To operate, secure, and improve the platform itself, including fixing bugs and preventing misuse.",
        ],
      },
      {
        type: "p",
        text: "We do not use health information to serve ads, and we do not sell it. If that ever changes for any non-health data we collect, we'll update this policy and, where the law requires it, ask for your consent first.",
      },
    ],
  },
  {
    id: "how-records-move",
    title: "How records move, and who sees what",
    blocks: [
      { type: "p", text: "This is the part people usually care about most, so we're spelling it out plainly." },
      {
        type: "p",
        text: "When a physician retrieves your records for your care, that request goes through Metriport to health information networks connected under Carequality and TEFCA. The request is scoped to that physician's own NPI and limited to patients they're already treating. It is made for treatment purposes only. We do not support or allow a physician to query the network for billing, payment, or administrative purposes.",
      },
      {
        type: "p",
        text: "A physician cannot pull your records through this network without your consent. Separate from the general consent you give your practice when you become a patient there, elevAID requires its own consent specific to a network-based record pull, either by responding to an email request or by granting it directly inside the app. If you haven't responded before an appointment, the query simply doesn't happen for that visit, and your physician works from whatever is already in your practice's chart.",
      },
      {
        type: "p",
        text: "When you use your own app to connect a provider, pharmacy, or lab, that's a request you're making yourself, under your own login, for your own records. It works differently from a physician's request: it's initiated by you, not by anyone treating you, and you can see, and disconnect, any source you've connected at any time.",
      },
      {
        type: "p",
        text: "You can also choose to share what's in your app with a specific physician. This is optional. It's not required to use the app, and it's separate from anything a physician does on their own through a network query. When you share, you choose what to share, for how long, and you can revoke it whenever you want.",
      },
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share information with",
    blocks: [
      {
        type: "list",
        items: [
          "Health information networks, through Metriport, solely to carry out a treatment-purpose query initiated by your physician, or a records request you initiate yourself as a patient.",
          "Identity verification providers, ID.me and Verato, to confirm who you are and match your account to the correct medical record.",
          "Service providers who host our infrastructure or help us operate the platform, under contracts that require them to protect your information and use it only to provide that service to us.",
          "Law enforcement or regulators, only when we're legally required to, and only to the extent required.",
        ],
      },
      { type: "p", text: "We do not sell health information, and we do not share it with data brokers or advertisers." },
    ],
  },
  {
    id: "your-choices",
    title: "Your choices",
    blocks: [
      {
        type: "list",
        items: [
          "You can review, download, or disconnect any data source connected to your account.",
          "You can revoke a physician's access to anything you've shared, at any time, from inside the app.",
          "You can ask us to correct information in your account that's wrong.",
          "You can close your account. If you do, we'll delete or de-identify your information, except where we're required to keep it, for example under record retention rules that apply to healthcare data.",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    blocks: [
      {
        type: "p",
        text: "Records are stored in an encrypted data store, and access to it is scoped by identity and, for physicians, by NPI, so a physician only ever sees patients they're actually treating. We use industry-standard safeguards to protect information in transit and at rest, and we enter into Business Associate Agreements with covered entities as required under HIPAA. No system is perfectly secure, and we'll notify affected users if a breach occurs, as required by law.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    blocks: [
      {
        type: "p",
        text: "elevAID is not directed at children under 13, and we don't knowingly collect information from them without a parent or guardian's involvement. A parent or legal guardian may manage a minor's health information through the platform where applicable law allows it.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "If we make a material change to how we handle your information, we'll post the update here and change the effective date above. For significant changes, we'll also try to notify you directly, by email or in the app.",
      },
    ],
  },
];

function BlockView({ block }: { block: Block }) {
  if (block.type === "label") {
    return <p className="mt-6 font-semibold text-ink-900">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <ul className="mt-3 list-disc space-y-2.5 pl-5 marker:text-primary-dark">
        {block.items.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4">{block.text}</p>;
}

export function PrivacyPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Privacy Policy — elevAID";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="flex-1 bg-white pb-24 pt-32 sm:pb-32 sm:pt-40">
        <article className="mx-auto max-w-2xl px-6">
          <header className="border-b border-border pb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-ink-500">elevAID, Inc.</p>
            <p className="mt-1 text-sm text-ink-400">Effective date: <time dateTime={EFFECTIVE_DATE.iso}>{EFFECTIVE_DATE.label}</time></p>
          </header>

          <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-ink-700 sm:text-base">
            <p>
              elevAID, Inc. (“elevAID,” “we,” “our,” or “us”) provides a platform that helps patients bring
              together their own medical records and helps physicians access those records for treatment.
              This policy explains what we collect, why we collect it, and what control you have over it. It
              applies to the elevAID patient app, the elevAID physician dashboard, and elevaid.co.
            </p>
            <p>
              A quick note before the details: if you&apos;re a patient, most of this policy is about your
              health information and your app account. If you&apos;re a physician or work at a practice using
              elevAID, some sections apply to you differently, and we&apos;ve tried to call that out where it
              matters.
            </p>
          </div>

          <nav aria-label="On this page" className="mt-10 rounded-2xl border border-border bg-surface-muted p-6">
            <p className="text-sm font-semibold text-ink-900">On this page</p>
            <ol className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {[...SECTIONS, { id: "contact", title: "Contact us" }].map((s, i) => (
                <li key={s.id}>
                  <a href={`#/privacy/${s.id}`} className="text-ink-500 transition-colors duration-200 hover:text-primary-dark">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="text-[15px] leading-relaxed text-ink-700 sm:text-base">
            {SECTIONS.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-border py-10">
                <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                  <span className="mr-2 text-primary-dark">{i + 1}.</span>
                  {section.title}
                </h2>
                {section.blocks.map((block, j) => (
                  <BlockView key={j} block={block} />
                ))}
              </section>
            ))}

            <section id="contact" className="scroll-mt-28 py-10">
              <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                <span className="mr-2 text-primary-dark">{SECTIONS.length + 1}.</span>
                Contact us
              </h2>
              <p className="mt-4">
                Questions about this policy, or about your own information, can be sent to{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
