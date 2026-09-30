import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";
import { Problem } from "../components/sections/Problem";
import { Platform } from "../components/sections/Platform";
import { Stats } from "../components/sections/Stats";
import { HowItWorks } from "../components/sections/HowItWorks";
import { ForPatients } from "../components/sections/ForPatients";
import { Security } from "../components/sections/Security";
import { Testimonial } from "../components/sections/Testimonial";
import { Mission } from "../components/sections/Mission";
import { Company } from "../components/sections/Company";
import { CTA } from "../components/sections/CTA";

export function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Problem />
        <Platform />
        <Stats />
        <HowItWorks />
        <ForPatients />
        <Security />
        <Testimonial />
        <Mission />
        <Company />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
