import { useId } from "react";
import { cn } from "../../lib/utils";

// Soft 3D ("clay") avatars for the story's two fictional people, drawn to match the hero photo:
// Marcus, the patient (grey curly hair, beard, sage shirt) and Dr. Priya Patel (dark hair in a bun,
// white coat, stethoscope). Depth comes from top-left lighting: radial gradients, rim shading,
// specular highlights and a contact shadow under the head.
export type AvatarPerson = "marcus" | "patel";

const LABEL: Record<AvatarPerson, string> = {
  marcus: "Marcus Hale",
  patel: "Dr. Priya Patel",
};

export function Avatar({ person, className }: { person: AvatarPerson; className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 80 80" role="img" aria-label={LABEL[person]} className={cn("h-full w-full", className)}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="40" cy="40" r="40" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>{person === "marcus" ? <Marcus id={id} /> : <Patel id={id} />}</g>
    </svg>
  );
}

/** Shared radial "lit from top-left" gradient. */
function Lit({ id, light, mid, dark, cx = "35%", cy = "30%", r = "75%" }: { id: string; light: string; mid: string; dark: string; cx?: string; cy?: string; r?: string }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      <stop offset="0%" stopColor={light} />
      <stop offset="55%" stopColor={mid} />
      <stop offset="100%" stopColor={dark} />
    </radialGradient>
  );
}

function Marcus({ id }: { id: string }) {
  const g = (n: string) => `${id}-m-${n}`;
  const u = (n: string) => `url(#${g(n)})`;
  return (
    <>
      <defs>
        <Lit id={g("bg")} light="#f3fbfa" mid="#dcefec" dark="#bfe0db" cx="50%" cy="35%" r="70%" />
        <Lit id={g("skin")} light="#e7b18c" mid="#c98c65" dark="#9f6644" />
        <Lit id={g("ear")} light="#d59a74" mid="#b97c57" dark="#935c3c" />
        <Lit id={g("hair")} light="#d7dbdf" mid="#a5aab0" dark="#6f747a" cx="40%" cy="25%" r="80%" />
        <Lit id={g("curl")} light="#e2e5e8" mid="#aeb3b8" dark="#7d8288" cx="35%" cy="30%" r="70%" />
        <Lit id={g("beard")} light="#bfc3c8" mid="#90959b" dark="#686d73" cx="45%" cy="20%" r="85%" />
        <linearGradient id={g("shirt")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b3c5ad" />
          <stop offset="100%" stopColor="#7e9577" />
        </linearGradient>
        <linearGradient id={g("neck")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f5a3b" />
          <stop offset="45%" stopColor="#b47a55" />
          <stop offset="100%" stopColor="#c08661" />
        </linearGradient>
      </defs>

      <rect width="80" height="80" fill={u("bg")} />
      {/* body */}
      <path d="M6 80c1.5-16 14.5-24.5 34-24.5S72.5 64 74 80z" fill={u("shirt")} />
      <path d="M6 80c1.5-16 14.5-24.5 34-24.5" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M30.5 57l9.5 9.5 9.5-9.5" fill="none" stroke="#6d8467" strokeWidth="2.6" strokeLinejoin="round" />
      {/* neck with contact shadow under the jaw */}
      <path d="M33.5 46h13v12.5c-3.5 3.2-9.5 3.2-13 0z" fill={u("neck")} />
      {/* ears */}
      <ellipse cx="26.2" cy="36.5" rx="3.3" ry="4.6" fill={u("ear")} />
      <ellipse cx="53.8" cy="36.5" rx="3.3" ry="4.6" fill={u("ear")} />
      {/* head */}
      <ellipse cx="40" cy="35" rx="13.4" ry="15.8" fill={u("skin")} />
      {/* cheeks + nose */}
      <ellipse cx="32.5" cy="40" rx="3" ry="2" fill="#e0776a" opacity="0.22" />
      <ellipse cx="47.5" cy="40" rx="3" ry="2" fill="#e0776a" opacity="0.22" />
      <path d="M40 35.5c-1 2.6-1.6 4.2-0.4 5 .9.5 1.9.4 2.6-.2" fill="none" stroke="#9c6443" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="39.3" cy="36.8" rx="0.8" ry="1.6" fill="#ffffff" opacity="0.35" />
      {/* beard + moustache */}
      <path d="M27 36.5c.8 10.2 6 15.5 13 15.5s12.2-5.3 13-15.5c-2.2 5.4-5.4 8-13 8s-10.8-2.6-13-8z" fill={u("beard")} />
      <path d="M34.5 44.3c1.6-1.6 3.6-2 5.5-1 1.9-1 3.9-.6 5.5 1-1.9.8-3.6.9-5.5.3-1.9.6-3.6.5-5.5-.3z" fill="#8a8f95" />
      <path d="M37 47c2 .9 4 .9 6 0" fill="none" stroke="#5e6368" strokeWidth="1.2" strokeLinecap="round" />
      {/* hair cap + curls */}
      <path d="M26.3 33.5c-1.8-10.5 5-18.2 13.7-18.2s15.5 7.7 13.7 18.2c-1.6-4.6-3.8-7.3-6-8.3-4.2 2.6-11.2 2.6-15.4 0-2.2 1-4.4 3.7-6 8.3z" fill={u("hair")} />
      {[[30.5, 21, 3.7], [36.5, 17.6, 4], [43.5, 17.4, 4], [49.5, 20.8, 3.6], [27.8, 26.5, 3], [52.3, 26.3, 3]].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={u("curl")} />
      ))}
      <path d="M33 17.5c2.5-1.8 5.5-2.4 8.5-2" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      {/* eyes with specular glints, brows */}
      <ellipse cx="34.8" cy="35" rx="1.6" ry="1.8" fill="#2a2320" />
      <ellipse cx="45.2" cy="35" rx="1.6" ry="1.8" fill="#2a2320" />
      <circle cx="35.3" cy="34.4" r="0.55" fill="#ffffff" />
      <circle cx="45.7" cy="34.4" r="0.55" fill="#ffffff" />
      <path d="M31.6 30.9c1.9-1.1 4.4-1.1 6.3 0M42.1 30.9c1.9-1.1 4.4-1.1 6.3 0" fill="none" stroke="#6a6f74" strokeWidth="1.7" strokeLinecap="round" />
      {/* soft rim light on the head */}
      <path d="M29 24c2.5-4 6.5-6.2 11-6.2" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}

function Patel({ id }: { id: string }) {
  const g = (n: string) => `${id}-p-${n}`;
  const u = (n: string) => `url(#${g(n)})`;
  return (
    <>
      <defs>
        <Lit id={g("bg")} light="#f4fcf6" mid="#dff3e5" dark="#c3e6cd" cx="50%" cy="35%" r="70%" />
        <Lit id={g("skin")} light="#f0c09f" mid="#d9a07c" dark="#b47a57" />
        <Lit id={g("ear")} light="#e3ad8b" mid="#cc906c" dark="#a86f4d" />
        <Lit id={g("hair")} light="#6b4a3e" mid="#3d2922" dark="#1e1310" cx="38%" cy="22%" r="80%" />
        <Lit id={g("bun")} light="#7a5646" mid="#442e26" dark="#221512" cx="35%" cy="30%" r="70%" />
        <Lit id={g("gold")} light="#fff1c4" mid="#e5c07b" dark="#b68d45" cx="35%" cy="30%" r="70%" />
        <linearGradient id={g("coat")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce4ec" />
        </linearGradient>
        <linearGradient id={g("steth")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5cc3bf" />
          <stop offset="100%" stopColor="#2f7c79" />
        </linearGradient>
        <linearGradient id={g("neck")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8704f" />
          <stop offset="45%" stopColor="#cb916d" />
          <stop offset="100%" stopColor="#d49a76" />
        </linearGradient>
      </defs>

      <rect width="80" height="80" fill={u("bg")} />
      {/* white coat with lapels and scrubs underneath */}
      <path d="M6 80c1.5-16 14.5-24.5 34-24.5S72.5 64 74 80z" fill={u("coat")} />
      <path d="M33.5 57.5l6.5 10.5 6.5-10.5z" fill="#9fd4cf" />
      <path d="M33 57.5l-4 22.5M47 57.5l4 22.5" stroke="#c7d2dc" strokeWidth="1.4" />
      <path d="M33 57.5l-7.5 6 4 2.5M47 57.5l7.5 6-4 2.5" fill="none" stroke="#c7d2dc" strokeWidth="1.3" strokeLinejoin="round" />
      {/* stethoscope: tube with a highlight + chest piece */}
      <path d="M30.5 58.5c-3.4 6.3-2.2 12.6 3.6 14.6M49.5 58.5c3.4 6.3 2.2 12.6-3.6 14.6" fill="none" stroke={u("steth")} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 60c-2 4.5-1.6 8.8 1 11" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="40" cy="74.2" r="3" fill={u("steth")} />
      <circle cx="39.1" cy="73.3" r="0.9" fill="#ffffff" opacity="0.6" />
      {/* neck */}
      <path d="M35 47h10v11.5c-2.8 2.8-7.2 2.8-10 0z" fill={u("neck")} />
      {/* bun + hair mass behind the face */}
      <circle cx="40" cy="13.5" r="7.8" fill={u("bun")} />
      <path d="M36 10.5c2-1.6 4.8-2 7.2-1" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="40" cy="33" rx="15.4" ry="17.4" fill={u("hair")} />
      {/* ears + earrings */}
      <ellipse cx="27.4" cy="36.5" rx="2.8" ry="4" fill={u("ear")} />
      <ellipse cx="52.6" cy="36.5" rx="2.8" ry="4" fill={u("ear")} />
      <circle cx="27.4" cy="41.4" r="1.3" fill={u("gold")} />
      <circle cx="52.6" cy="41.4" r="1.3" fill={u("gold")} />
      {/* face */}
      <ellipse cx="40" cy="36" rx="12.3" ry="14.8" fill={u("skin")} />
      <ellipse cx="33" cy="40.5" rx="2.8" ry="1.9" fill="#ec7f79" opacity="0.28" />
      <ellipse cx="47" cy="40.5" rx="2.8" ry="1.9" fill="#ec7f79" opacity="0.28" />
      <path d="M40 36.5c-.8 2.2-1.2 3.6-.2 4.2.8.4 1.6.3 2.2-.2" fill="none" stroke="#b27352" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="39.4" cy="37.6" rx="0.7" ry="1.4" fill="#ffffff" opacity="0.35" />
      {/* hairline swept back, with a shine streak */}
      <path d="M27.6 33.5c0-9.3 5.6-15 12.4-15s12.4 5.7 12.4 15c-3-5.2-7.6-8.3-12.4-8.3s-9.4 3.1-12.4 8.3z" fill={u("hair")} />
      <path d="M33 21.5c3-2.2 7-2.7 10.5-1.5" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round" />
      {/* eyes with glints, lashes, brows, smile */}
      <ellipse cx="35.4" cy="36" rx="1.5" ry="1.75" fill="#2a2320" />
      <ellipse cx="44.6" cy="36" rx="1.5" ry="1.75" fill="#2a2320" />
      <circle cx="35.9" cy="35.4" r="0.55" fill="#ffffff" />
      <circle cx="45.1" cy="35.4" r="0.55" fill="#ffffff" />
      <path d="M33.4 34.6l-.9-.7M46.6 34.6l.9-.7" stroke="#2a2320" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M32.4 32.3c1.7-1 4-1 5.6 0M42 32.3c1.7-1 4-1 5.6 0" fill="none" stroke="#2e1d18" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36.3 43.8c2.1 1.7 5.3 1.7 7.4 0" fill="none" stroke="#a5584a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M37.5 44.5c1.5.8 3.5.8 5 0" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.7" strokeLinecap="round" />
    </>
  );
}
