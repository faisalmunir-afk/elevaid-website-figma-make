import { Link } from "./ui/Link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

// Section links use /# so they work from any page. Add social links and the terms page here once they exist.
const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "One record, two windows", href: "/#platform" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Patient app", href: "/#for-patients" },
      { label: "Physician dashboard", href: "/#platform" },
      { label: "Permission model", href: "/#security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Direct primary care", href: "/#cta" },
      { label: "Primary care", href: "/#cta" },
      { label: "Cardiology", href: "/#cta" },
      { label: "Surgery", href: "/#cta" },
      { label: "Pediatrics", href: "/#cta" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#company" },
      { label: "Roadmap", href: "/#company" },
      { label: "Security", href: "/#security" },
      { label: "Contact", href: "/#cta" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-8 text-ink-900" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              One record between a patient and their doctor. Built on FHIR.
              Verified identity, patient-held permission.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink-900">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors duration-200 hover:text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-ink-400">
            © 2026 elevAID Healthtech Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-400">
            <Link href="/#/privacy" className="transition-colors duration-200 hover:text-ink-900">
              Privacy Policy
            </Link>
            <span>Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
