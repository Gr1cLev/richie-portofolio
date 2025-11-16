# Portfolio Richie Giansanto - Next.js

Portfolio website modern dengan Next.js 15 dan Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka `http://localhost:3000`

## 📁 Upload File Penting

Upload ke folder `public/`:
1. **CV-RichieGiansanto.pdf** - File CV
2. **upscalemedia-transformed.jpeg** - Foto profil

## ✨ Fitur

- ✅ Dark Mode dengan localStorage
- ✅ Scroll Animations (Intersection Observer)
- ✅ Responsive Design (Mobile-first)
- ✅ Next.js Image Optimization
- ✅ Scroll to Top Button
- ✅ Mobile Menu
- ✅ SEO Optimized

## 📝 Struktur

```
richie-portofolio/
├── app/
│   ├── layout.js         # Root layout
│   ├── page.js           # Homepage
│   └── globals.css       # Global CSS
├── components/
│   ├── Header.js         # Navigation
│   ├── Hero.js           # Hero section
│   ├── About.js          # About section
│   ├── Skills.js         # Skills section
│   ├── Projects.js       # Projects
│   ├── Contact.js        # Contact
│   ├── Footer.js         # Footer
│   ├── AnimatedSection.js  # Scroll animations
│   └── ScrollToTopButton.js # Scroll button
├── public/
│   ├── CV-RichieGiansanto.pdf  ← Upload disini
│   └── upscalemedia-transformed.jpeg  ← Upload disini
└── tailwind.config.js    # Tailwind config
```

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4.0
- Inter Font (Google Fonts)
- React Hooks
- Intersection Observer API

## 📱 Customization

### Edit Info Personal (`components/About.js`)
```javascript
<li><strong>Nama:</strong> Nama Anda</li>
<li><strong>Email:</strong> email@anda.com</li>
```

### Edit Skills (`components/Skills.js`)
```javascript
const webLangSkills = ['Python', 'JavaScript', ...];
```

### Edit Projects (`components/Projects.js`)
```javascript
const projects = [
  { title: 'Title', description: '...', link: 'https://...' }
];
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push ke GitHub
2. Connect ke Vercel
3. Auto-deploy

### Manual
```bash
npm run build
npm start
```

## 📧 Contact

- Email: richiegiansanto@gmail.com
- GitHub: [@Gr1cLev](https://github.com/Gr1cLev)
- LinkedIn: [Richie Giansanto](https://www.linkedin.com/in/richie-giansanto/)

---

© 2025 Richie Giansanto | Built with ❤️ using Next.js & Tailwind CSS
