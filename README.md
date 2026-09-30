# elevAID website: Figma Make version

This is the elevAID marketing site (home page and Privacy Policy) as a standard React + Vite + Tailwind CSS project, the format Figma Make uses. It looks and behaves the same as the Vercel site, with the same content, design, animations and images.

- **Home:** `/`
- **Privacy Policy:** `/#/privacy` (a hash link, so it works on any host without server settings)

## Publish it with Figma Make

Figma Make can't import a .zip file directly. Use either route below.

### Route A: GitHub import (recommended if you have a Full seat on a paid Figma plan)

1. Create a new empty repository on GitHub.
2. Upload the contents of this folder to it (everything except `node_modules` and `dist`, which aren't included).
3. In the **Figma desktop app**, create a Figma Make file and choose **Import from GitHub**, then pick that repository.
4. Check the preview, then **Publish** and connect your custom domain in the publish settings.

### Route B: Drag and drop into Figma Make

1. Create a new Figma Make file and open the **code view**.
2. Drag the `src` folder from this project into Figma Make's **file explorer**.
3. Send Figma Make this prompt:

   > Use the files I added in `src/` exactly as they are. Make `src/App.tsx` the app's entry point, and don't rewrite or restyle the code. The project needs these packages: framer-motion, lenis, lucide-react, clsx, tailwind-merge.

4. Check the preview, including the photos, the fonts and the Privacy Policy link in the footer.
5. **Publish** and connect your custom domain.

If any photos don't appear in Figma Make's preview, re-add the four images from `src/assets/` through Figma Make's image upload, keeping the same file names.

## Run or build it on your computer

Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # preview at http://localhost:5173
npm run build    # static site in dist/, which any web host can serve
```

## What's inside

| Path | Contents |
|---|---|
| `src/App.tsx` | Entry point: page switching (home / privacy) and page-wide motion settings |
| `src/pages/` | Home page and Privacy Policy page |
| `src/components/sections/` | One file per home page section (Hero, Problem, Platform, …) |
| `src/components/ui/` | Shared pieces: buttons, cards, logo, 3D icons, avatars |
| `src/styles/globals.css` | Colours, fonts, brand gradient and all styling tokens |
| `src/assets/` | Hero photo and team headshots |

## Keep in mind

- This is a snapshot of the site as of October 1, 2026, including the Privacy Policy effective date of September 1, 2026. Later changes to the Vercel site won't appear here automatically, and changes made in Figma Make won't flow back.
- Copy, diagrams and the patient-sharing arrow are the compliance-reviewed versions. Any edits made through Figma Make's AI should be checked against that review.
