# KC Portfolio - elev8tion

Modern portfolio built with Next.js, TypeScript, and Framer Motion.

## 🎨 Design Language

The UI is built on a Traevu-derived token system defined entirely in `app/globals.css`:

- **Token system** — CSS custom properties on `:root` (`--page`, `--wall`, `--surface`, `--accent`, `--border`, etc.) mapped into Tailwind via `tailwind.config.ts` (`brand.*` colors, Traevu radius scale 4–14px)
- **Typography** — JetBrains Mono (`next/font/google`) at a 14px/22px base, weight-400 negatively-tracked headings, uppercase mono microlabels
- **Hairline surfaces** — 0.5px borders, indigo-tinted dark surfaces, component classes (`.t-btn`, `.t-chip`, `.t-panel`, `.t-input`, `.t-dialog`, …)
- **Accent** — Indigo `#6366F1` on a pure black page with a subtle radial glow backdrop
- **Motion** — Shared easing curves (`--ease-out`, `--ease-sheet`) with a `prefers-reduced-motion` kill-switch

> The previous liquid-glass layer (`components/glass/`, `styles/liquid-glass.css`,
> `components/backgrounds/MidnightMist.tsx`) has been removed in favor of this
> flat, token-driven design language.

## 🚀 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React

## 📦 Project Structure

```
kc_portfolio/
├── app/
│   ├── layout.tsx          # Root layout (JetBrains Mono font)
│   ├── page.tsx            # Homepage composition
│   └── globals.css         # Design tokens + .t-* component classes
├── components/
│   ├── traevu/
│   │   └── index.tsx       # Shared UI primitives (Button, Chip, Panel, Backdrop, ...)
│   └── sections/
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── ProjectModal.tsx
│       ├── Skills.tsx
│       └── Contact.tsx
└── public/
    └── logos/              # elev8tion branding
```

## 🎯 Brand Colors (elev8tion)

- Primary / Accent: `#6366F1` (Indigo)
- Background: `#000000` (Page) over indigo-tinted darks (`#0a0a0f`, `#121218`, `#17171f`)
- Status: `#58c68a` (OK green)

All colors flow through the CSS token layer in `app/globals.css`; update them
there (or via the `brand.*` mapping in `tailwind.config.ts`).

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Customization

### Add Your Photo
Place your professional photo at `public/images/profile.jpg`

### Update Content
Edit the sections in `components/sections/`:
- `Hero.tsx` - Your name, title, bio
- `Projects.tsx` - Your projects
- `Skills.tsx` - Your tech stack
- `Contact.tsx` - Contact info & social links

### Design Tokens
Update colors, radii, and easing in `app/globals.css`

## 🌐 Deployment

Deploy easily to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel dashboard.

## ✨ Features

- ✅ SEO Optimized
- ✅ Fast Performance
- ✅ Mobile Responsive
- ✅ Traevu-Derived Token UI
- ✅ Smooth Animations
- ✅ Dark Theme
- ✅ TypeScript
- ✅ Tailwind CSS

---

**Built with elev8tion** 🚀
