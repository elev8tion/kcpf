# KC Portfolio - elev8tion

Modern, glass-morphism portfolio built with Next.js, TypeScript, and Framer Motion.

## 🎨 Design Features

- **Midnight Mist Background** - Beautiful gradient effect
- **Glass Morphism** - Converted from Flutter glass components
- **24px Border Radius** - Consistent throughout
- **Framer Motion Animations** - Smooth scroll-triggered animations
- **Responsive Design** - Mobile-first approach

## 🚀 Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React

## 📦 Project Structure

```
kc_pf/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── backgrounds/
│   │   └── MidnightMist.tsx
│   ├── glass/
│   │   ├── GlassContainer.tsx
│   │   └── GlassButton.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       └── Contact.tsx
└── public/
    └── logos/              # elev8tion branding
```

## 🎯 Brand Colors (elev8tion)

- Primary: `#6366F1` (Indigo)
- Secondary: `#4650E` (Deep Blue)
- Accent: `#B5B8D0` (Light Purple-Gray)
- Dark: `#1a1a2e` (Background)

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

### Brand Colors
Update colors in `tailwind.config.ts`

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
- ✅ Glass Morphism UI
- ✅ Smooth Animations
- ✅ Dark Theme
- ✅ TypeScript
- ✅ Tailwind CSS

---

**Built with elev8tion** 🚀
