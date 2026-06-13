# Buka Pintu - Panduan Pemecahan Masalah & Editing Manual

## 📁 Struktur Proyek

```
buka-pintu/
├── src/
│   ├── components/          # React & Astro components
│   │   ├── AdminPanel.jsx   # Halaman admin (tabel buku, form)
│   │   ├── KatalogClient.jsx # Katalog buku (filter, kartu)
│   │   ├── Navbar.astro     # Navigasi + toggle dark mode
│   │   ├── Footer.astro    # Footer website
│   │   ├── BookCard.jsx    # Komponen kartu buku
│   │   ├── SearchFilter.jsx # Filter dan pencarian
│   │   └── PdfReader.jsx   # Pembaca PDF
│   ├── layouts/
│   │   └── Layout.astro    # Template utama (head, body)
│   ├── pages/              # Halaman website
│   │   ├── index.astro     # Beranda
│   │   ├── katalog.astro   # Halaman katalog
│   │   ├── admin.astro     # Halaman admin
│   │   ├── sumber-daya.astro # Sumber daya
│   │   └── tentang.astro   # Tentang kami
│   └── styles/
│       └── global.css      # CSS global, scrollbar, dll
├── public/                 # File statis
│   └── google-apps-script.js # Script untuk Google Sheets
└── tailwind.config.mjs     # Konfigurasi Tailwind CSS
```

---

## 🚀 Cara Deploy Perubahan

### Opsi 1: Otomatis (Recommended)
1. Push ke GitHub: `git add . && git commit -m "pesan" && git push origin main`
2. Vercel akan auto-deploy dalam ~1 menit
3. Cek di: https://vercel.com/macchants-projects/buka-pintu-dps2

### Opsi 2: Manual via CLI
```bash
cd D:\code-claude\astro-project
npx vercel --project buka-pintu-dps2 --prod
```

### Opsi 3: Build Lokal
```bash
npm run build
```
File hasil build ada di folder `dist/`

---

## 🔧 Pemecahan Masalah Umum

### 1. Website Tidak Loading / Blank Page

**Penyebab:** Build error atau masalah import

**Cek:**
```bash
npm run build
```
Lihat error yang muncul di terminal.

**Solusi:**
- Pastikan semua file memiliki syntax yang benar
- Jangan ada typo di nama file atau import

---

### 2. Halaman Admin Tidak Bisa Diakses

**Penyebab:** Masalah pada AdminPanel.jsx

**Cek file:** `src/components/AdminPanel.jsx`

**Hal yang bisa dicek:**
- Pastikan tidak ada error syntax (kurung tutup, koma, dll)
- Component masih ter-export dengan benar:
```jsx
export default function AdminPanel() {
```

---

### 3. Katalog Buku Tidak Menampilkan Buku

**Penyebab:** KatalogClient.jsx bermasalah atau API belum disetup

**Cek file:** `src/components/KatalogClient.jsx`

**Untuk menambah/edit buku (Mode Demo):**
1. Buka website → /admin
2. Login (tanpa password di mode demo)
3. Klik "Tambah Buku"
4. Isi form dan simpan

**Data tersimpan di:** localStorage browser (bersifat lokal)

---

### 4. Dark Mode Tidak Berfungsi

**Cek file:** `src/components/Navbar.astro`

**Pastikan ada script dark mode:**
```javascript
// Dark mode toggle
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});
```

**Cek tailwind.config.mjs:**
```javascript
darkMode: 'class',
```

---

### 5. Teks Tidak Terbaca di Dark Mode

**Penyebab:** Element belum memiliki class `dark:` variant

**Format:** `text-gray-900` → `text-gray-900 dark:text-white`

**Contoh:**
```jsx
// Sebelum
<p className="text-gray-900">Judul Buku</p>

// Sesudah
<p className="text-gray-900 dark:text-white">Judul Buku</p>
```

**Common patterns:**
| Light Mode | Dark Mode |
|------------|-----------|
| `bg-white` | `bg-white dark:bg-gray-900` |
| `text-gray-900` | `text-gray-900 dark:text-white` |
| `text-gray-500` | `text-gray-500 dark:text-gray-400` |
| `border-gray-100` | `border-gray-100 dark:border-gray-800` |

---

### 6. Build Gagal di Vercel

**Cek di lokal dulu:**
```bash
npm run build
```

**Error umum:**
- Syntax error → cek file yang error
- Missing dependency → `npm install`
- Import error → cek path file

---

## ✏️ Editing Common Elements

### Mengubah Teks di Homepage

**File:** `src/pages/index.astro`

**Hero Section:**
```astro
<h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold...">
  Setiap Pintu<br>
  <span class="bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 bg-clip-text text-transparent">Terbuka</span><br>
  untuk Anda
</h1>
```

### Mengubah Warna Theme

**File:** `tailwind.config.mjs`

**Brand Colors:**
```javascript
brand: {
  50: '#FFF7ED',
  100: '#FFEDD5',
  // ... up to 900
  500: '#F97316',  // Main orange
  600: '#EA580C',  // Darker orange
}
```

Untuk mengubah warna utama, ubah nilai `500` dan `600`.

### Menambah Kategori Buku

**File:** `src/components/KatalogClient.jsx`

```javascript
const CATEGORIES = [
  { id: 'semua', label: 'Semua', icon: 'fa-th-large' },
  { id: 'pengembangan-diri', label: 'Pengembangan Diri', icon: 'fa-brain' },
  // Tambah di sini...
  { id: 'kategori-baru', label: 'Kategori Baru', icon: 'fa-icon-name' },
];
```

**Juga di:** `src/components/AdminPanel.jsx`
```javascript
const CATEGORIES = [
  { id: 'kategori-baru', label: 'Kategori Baru', color: 'bg-purple-100 text-purple-700' },
];
```

### Mengubah Logo / Favicon

**File:** `public/favicon.svg`

Ganti dengan SVG baru. Pastikan ukurannya tepat (biasanya 32x32 atau 512x512).

### Menambah Link di Footer

**File:** `src/components/Footer.astro`

```astro
{ name: "Nama Link", href: "/halaman" },
```

---

## 📱 Responsive Design Tips

### Breakpoints Tailwind
- `sm:` - Mobile landscape (640px+)
- `md:` - Tablet (768px+)
- `lg:` - Desktop (1024px+)
- `xl:` - Large desktop (1280px+)

### Contoh:
```html
<!-- Hanya tampil di mobile -->
<div class="md:hidden">...</div>

<!-- Grid 2 kolom di mobile, 4 di desktop -->
<div class="grid grid-cols-2 md:grid-cols-4">...</div>
```

---

## 🛠️ Tools & Resources

### Font Awesome Icons
Cari icon di: https://fontawesome.com/icons

Format penggunaan:
```html
<i class="fas fa-book-open"></i>
<i class="fab fa-github"></i>
```

### Tailwind CSS Docs
https://tailwindcss.com/docs

### Open Library Cover Images
Format URL:
```
https://covers.openlibrary.org/b/id/{COVER_ID}-M.jpg
```

Cari cover ID di: https://openlibrary.org

---

## 📞 Quick Reference

| Masalah | File yang Dicek |
|---------|-----------------|
| Navbar rusak | `Navbar.astro` |
| Footer rusak | `Footer.astro` |
| Katalog error | `KatalogClient.jsx` |
| Admin error | `AdminPanel.jsx` |
| Dark mode error | `Navbar.astro`, `tailwind.config.mjs` |
| Homepage error | `index.astro`, `Layout.astro` |
| Styles error | `global.css`, `tailwind.config.mjs` |

---

## ⚠️ Jangan Edit

File-file ini biasanya tidak perlu diedit kecuali Anda tahu apa yang Anda lakukan:
- `astro.config.mjs` - Konfigurasi Astro
- `package.json` - Dependencies
- `tailwind.config.mjs` - Warna theme (kecuali mau ganti warna)
- `node_modules/` - Jangan pernah edit manual

---

## 💡 Tips Keamanan

1. **Jangan push API keys** ke GitHub
2. **Google Apps Script URL** sudah menggunakan placeholder - ganti hanya saat mau connect ke Sheets
3. **Admin password** sebaiknya diubah jika website sudah production

---

*Last updated: Juni 2026*