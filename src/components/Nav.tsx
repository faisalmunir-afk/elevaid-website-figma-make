import { useEffect, useState } from "react";
import { Link } from "./ui/Link";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Logo } from "./ui/Logo";
import { cn } from "../lib/utils";

const LINKS = [
  { label: "The problem", href: "/#problem" },
  { label: "Platform", href: "/#platform" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Security", href: "/#security" },
  { label: "Company", href: "/#company" },
];

const NAV_HEIGHT = 64;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // The bar stays pinned at all times; it only re-themes to match whatever section sits under it.
  useEffect(() => {
    let ticking = false;

    function apply() {
      const probeY = NAV_HEIGHT / 2;
      let dark = false;
      document.querySelectorAll("[data-nav-theme='dark']").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) dark = true;
      });
      setIsDark(dark);
      setScrolled(window.scrollY > 8);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 border-b backdrop-blur-xl transition-colors duration-300 ease-[cubic-bezier(.2,.6,.25,1)]",
        isDark
          ? scrolled
            ? "border-white/10 bg-ink-900/60"
            : "border-transparent bg-transparent"
          : "border-border/80 bg-white/80"
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link
          href="/"
          aria-label="elevAID home"
          className={cn(
            "transition-colors duration-200",
            isDark ? "text-[#f9f9f9]" : "text-ink-900"
          )}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                isDark
                  ? "text-white/60 hover:text-white"
                  : "text-ink-500 hover:text-ink-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/#cta" variant="primary" className="px-4 py-2">
            Book a demo
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "cursor-pointer rounded-full p-2 transition-colors duration-200 lg:hidden",
            isDark ? "text-white" : "text-ink-700"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div
          className={cn(
            "border-t lg:hidden",
            isDark ? "border-white/10 bg-ink-900" : "border-border bg-white"
          )}
        >
          <Container className="py-4">
            <nav className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isDark
                      ? "text-white/70 hover:bg-white/10 hover:text-white"
                      : "text-ink-700 hover:bg-surface-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className={cn(
                  "mt-2 flex flex-col gap-2 border-t pt-3",
                  isDark ? "border-white/10" : "border-border"
                )}
              >
                <Button
                  href="/#cta"
                  variant="primary"
                  onClick={() => setOpen(false)}
                  className="justify-center"
                >
                  Book a demo
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
