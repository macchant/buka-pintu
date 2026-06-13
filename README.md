# Buka Pintu — Perpustakaan Digital Gratis

![Buka Pintu](https://img.shields.io/badge/Buka%20Pintu-Perpustakaan%20Digital-brightgreen?style=for-the-badge)
![Astro](https://img.shields.io/badge/Astro-5.0-ff5013?style=for-the-badge&logo=astro)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)

> **Buka Pintu** adalah perpustakaan digital gratis yang dirancang untuk membantu masyarakat Indonesia membangun kehidupan yang lebih baik melalui pengetahuan dan keterampilan.

**[🌐 Buka Pintu](https://buka-pintu.vercel.app)** | **[📖 Dokumentasi](#fitur)** | **[🐛 Laporkan Bug](https://github.com/macchant/buka-pintu/issues)**

---

## 🎯 Tentang Proyek

Buka Pintu lahir dari kesadaran bahwa banyak masyarakat Indonesia menghadapi hambatan besar dalam mengakses pendidikan dan keterampilan — padahal inilah yang paling dibutuhkan untuk membangun masa depan yang lebih baik.

Kami percaya bahwa **setiap orang berhak mendapatkan kesempatan untuk terus belajar dan berkembang**.

### Misi Kami
- ✅ Akses 100% gratis ke ribuan koleksi buku
- ✅ Berbasis komunitas — siapa pun bisa berkontribusi
- ✅ Dirancang untuk pengguna dengan keterbatasan akses internet
- ✅ Tanpa biaya tersembunyi, tanpa perlu mendaftar

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 📚 **Katalog Buku** | Jelajahi ribuan buku gratis dari berbagai kategori |
| 🔍 **Pencarian & Filter** | Temukan buku dengan mudah berdasarkan kategori, judul, atau penulis |
| 📖 **Baca Online** | Baca langsung di browser tanpa perlu mengunduh |
| 📥 **Simpan ke Google Drive** | Unduh PDF dan simpan ke Google Drive Anda |
| 🌙 **Dark Mode** | Mode gelap untuk kenyamanan mata |
| 📱 **Mobile-Friendly** | Responsif di semua ukuran layar |
| ⚡ **Performa Cepat** | Built dengan Astro untuk kecepatan optimal |
| 🔒 **Privasi Terjamin** | Kebijakan privasi yang jelas dan transparan |

---

## 📂 Kategori Buku

| Kategori | Jumlah Judul |
|----------|-------------|
| Pengembangan Diri | 420+ |
| Keterampilan Kerja | 318+ |
| Hukum & Hak | 256+ |
| Kesehatan Mental | 189+ |
| Wirausaha | 302+ |
| Pendidikan | 445+ |

---

## 🛠️ Tech Stack

### Frontend
- **Astro 5.0** — Static site generator
- **React 18** — Interactive UI components
- **Tailwind CSS 3.4** — Utility-first CSS framework
- **TypeScript** — Type safety

### Fonts & Icons
- **Plus Jakarta Sans** — Primary font
- **Fraunces** — Display font
- **Font Awesome 6.5** — Icon library

### Backend & Data
- **Google Apps Script** — API untuk mengelola data buku
- **Google Sheets** — Database buku (spreadsheet-based)

### Deployment
- **Vercel** — Hosting & CDN
- **GitHub Actions** — CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/macchant/buka-pintu.git
cd buka-pintu

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Struktur Proyek

```
buka-pintu/
├── public/
│   ├── books.json          # Data buku lokal
│   ├── favicon.svg         # Favicon
│   └── google-apps-script.js # Google Apps Script
├── src/
│   ├── components/         # React & Astro components
│   │   ├── AdminPanel.jsx
│   │   ├── BookCard.jsx
│   │   ├── FeaturedBooks.jsx
│   │   ├── Footer.astro
│   │   ├── HeroBackground.jsx
│   │   ├── KatalogClient.jsx
│   │   ├── Navbar.astro
│   │   ├── PdfReader.jsx
│   │   └── SearchFilter.jsx
│   ├── layouts/
│   │   └── Layout.astro   # Base layout
│   ├── pages/             # Astro pages
│   │   ├── index.astro    # Beranda (Home)
│   │   ├── katalog.astro  # Katalog Buku
│   │   ├── admin.astro    # Panel Admin
│   │   ├── tentang.astro  # Tentang Kami
│   │   ├── privasi.astro  # Kebijakan Privasi
│   │   ├── syarat.astro   # Syarat Penggunaan
│   │   └── sumber-daya.astro # Sumber Daya
│   └── styles/
│       └── global.css      # Global styles
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── package.json
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Baik itu melaporkan bug, menyarankan fitur baru, atau membuat pull request.

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buat Pull Request

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 🙏 Kredit

Dibuat dengan ❤️ untuk Indonesia.

- **Open Library API** — Untuk cover buku
- **Unsplash** — Untuk gambar hero
- **Google Fonts** — Untuk typography

---

<p align="center">
  <strong>Buka Pintu — Setiap Pintu Terbuka untuk Anda</strong>
</p>