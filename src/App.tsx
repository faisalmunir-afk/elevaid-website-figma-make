import { useEffect } from "react";
import "./styles/globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { MotionProvider } from "./components/MotionProvider";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { useRoute } from "./lib/useRoute";

/** Scroll to the section named in the hash (#platform, #/privacy/security) once the page has rendered. */
function scrollToHashTarget() {
  const { hash } = window.location;
  const id = hash.startsWith("#/") ? hash.split("/")[2] : hash.slice(1);
  if (!id) {
    window.scrollTo(0, 0);
    return;
  }
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
}

export default function App() {
  const route = useRoute();

  useEffect(() => {
    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);
    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col">
      <SmoothScroll />
      <MotionProvider>{route === "privacy" ? <PrivacyPage /> : <HomePage />}</MotionProvider>
    </div>
  );
}
