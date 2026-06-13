import { useState, useEffect } from 'react';
import PdfReader from './PdfReader';

// ================================================================
// CONFIGURATION — Ganti dengan URL Web App Anda
// Contoh: https://script.google.com/macros/s/AKfycbXXXXX/exec
// ================================================================
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
const ADMIN_PASSWORD = 'admin123'; // Ganti dengan sandi admin Anda
const isConfigured = () => !API_URL.includes('YOUR_SCRIPT_ID');

// ================================================================
// KATEGORI & GRADIENT
// ================================================================
const CATEGORIES = [
  { id: 'pengembangan-diri', label: 'Pengembangan Diri', color: 'bg-amber-100 text-amber-700' },
  { id: 'keterampilan', label: 'Keterampilan Kerja', color: 'bg-blue-100 text-blue-700' },
  { id: 'hukum', label: 'Hukum & Hak', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'kesehatan', label: 'Kesehatan Mental', color: 'bg-rose-100 text-rose-700' },
  { id: 'wirausaha', label: 'Wirausaha', color: 'bg-violet-100 text-violet-700' },
  { id: 'pendidikan', label: 'Pendidikan', color: 'bg-sky-100 text-sky-700' },
  { id: 'kisah-inspiratif', label: 'Kisah Inspiratif', color: 'bg-orange-100 text-orange-700' },
];

const GRADIENTS = [
  'from-amber-500 to-orange-600', 'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600', 'from-sky-500 to-blue-600',
  'from-orange-500 to-red-600', 'from-lime-500 to-green-600',
];

// ================================================================
// LOGIN SCREEN
// ================================================================
function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!pwd.trim()) { setErr('Masukkan kata sandi'); return; }
    setLoading(true); setErr('');
    if (!isConfigured()) { onLogin('demo'); setLoading(false); return; }
    try {
      const r = await fetch(`${API_URL}?action=verify&password=${encodeURIComponent(pwd)}`);
      const d = await r.json();
      d.success ? onLogin(pwd) : setErr('Kata sandi salah.');
    } catch { setErr('Tidak dapat terhubung ke server.'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <i className="fas fa-door-open text-white text-3xl"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Panel Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Buka Pintu</p>
        </div>
        <form onSubmit={handle} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
          </div>
          {err && <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
            <i className="fas fa-exclamation-circle"></i>{err}
          </div>}
          {!isConfigured() && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex items-start gap-2">
            <i className="fas fa-info-circle mt-0.5"></i>
            Mode Demo — koneksi API belum diatur. Klik Masuk untuk melanjutkan tanpa server.
          </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60">
            {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Memuat...</> : <><i className="fas fa-sign-in-alt mr-2"></i>Masuk</>}
          </button>
        </form>
      </div>
    </div>
  );
}

// ================================================================
// STATS BAR
// ================================================================
function StatsBar({ books }) {
  const stats = [
    { label: 'Total Buku', value: books.length, icon: 'fa-book', g: 'from-orange-500 to-orange-600' },
    { label: 'Kategori', value: new Set(books.map(b => b.category)).size, icon: 'fa-th-large', g: 'from-blue-500 to-cyan-600' },
    { label: 'Unggulan', value: books.filter(b => b.featured === 'Ya' || b.featured === '1').length, icon: 'fa-star', g: 'from-amber-500 to-orange-600' },
    { label: 'Dengan PDF', value: books.filter(b => b.pdfUrl && b.pdfUrl !== '#').length, icon: 'fa-file-pdf', g: 'from-emerald-500 to-teal-600' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className={`w-10 h-10 bg-gradient-to-br ${s.g} rounded-xl flex items-center justify-center mb-3`}>
            <i className={`fas ${s.icon} text-white text-sm`}></i>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
          <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ================================================================
// BOOK MODAL
// ================================================================
function BookModal({ book, onClose, onSave }) {
  const isEdit = !!book;
  const demo = !isConfigured();
  const [form, setForm] = useState(book || {
    title: '', author: '', year: new Date().getFullYear().toString(),
    category: 'pengembangan-diri', pdfUrl: '', coverId: '', pages: '',
    featured: 'Tidak', aktif: 'Ya',
    gradientFrom: 'from-amber-500', gradientTo: 'to-orange-600',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) { setMsg({ t: 'error', text: 'Judul dan penulis wajib diisi.' }); return; }
    setSaving(true); setMsg(null);

    if (demo) {
      const saved = { ...form, id: isEdit ? book.id : Date.now().toString() };
      const existing = JSON.parse(localStorage.getItem('bp_books') || '[]');
      let updated = isEdit ? existing.map(b => b.id === saved.id ? saved : b) : [saved, ...existing];
      localStorage.setItem('bp_books', JSON.stringify(updated));
      setMsg({ t: 'success', text: 'Berhasil disimpan! (Mode Demo)' });
      setTimeout(() => { onSave(saved); onClose(); }, 1000);
      setSaving(false);
      return;
    }

    try {
      const r = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isEdit ? 'update' : 'add', password: sessionStorage.getItem('bp_admin') || '', ...form }),
      });
      const d = await r.json();
      if (d.success) {
        setMsg({ t: 'success', text: isEdit ? 'Berhasil diupdate!' : 'Berhasil ditambahkan!' });
        setTimeout(() => { onSave(); onClose(); }, 1000);
      } else { setMsg({ t: 'error', text: d.error || 'Gagal menyimpan.' }); }
    } catch { setMsg({ t: 'error', text: 'Tidak dapat terhubung ke server.' }); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Buku' : 'Tambah Buku'}</h2>
            {demo && <p className="text-xs text-amber-600 mt-0.5">Mode Demo — perubahan tersimpan di browser saja</p>}
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition"><i className="fas fa-times text-gray-600"></i></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {msg && (
            <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
              msg.t === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              <i className={`fas ${msg.t === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
              {msg.text}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Buku *</label>
            <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="Contoh: Membangun Mental Baja"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Penulis *</label>
              <input type="text" value={form.author} onChange={e => set('author', e.target.value)}
                placeholder="Nama penulis"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tahun</label>
              <input type="number" value={form.year} onChange={e => set('year', e.target.value)}
                placeholder="2024" min="1900" max="2099"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 focus:border-orange-400 outline-none transition bg-white">
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tautan PDF (Google Drive)</label>
            <input type="url" value={form.pdfUrl} onChange={e => set('pdfUrl', e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
            <p className="text-xs text-gray-400 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              Upload ke Google Drive, Set "Semua orang dengan tautan", copy link.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">ID Cover (Open Library)</label>
              <input type="text" value={form.coverId} onChange={e => set('coverId', e.target.value)}
                placeholder="8225261"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
              <p className="text-xs text-gray-400 mt-1">Dari openlibrary.org/covers</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah Halaman</label>
              <input type="number" value={form.pages} onChange={e => set('pages', e.target.value)}
                placeholder="200" min="1"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Warna Sampul</label>
            <div className="grid grid-cols-4 gap-2">
              {GRADIENTS.map((g, i) => {
                const [from, to] = g.split(' ');
                return (
                  <button key={i} type="button"
                    onClick={() => { set('gradientFrom', from); set('gradientTo', to); }}
                    className={`h-10 bg-gradient-to-br ${g} rounded-lg border-2 transition-all hover:scale-105 ${
                      form.gradientFrom === from ? 'border-gray-900 ring-2 ring-gray-300' : 'border-transparent'
                    }`} />
                );
              })}
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured === 'Ya' || form.featured === '1'}
                onChange={e => set('featured', e.target.checked ? 'Ya' : 'Tidak')}
                className="w-5 h-5 rounded border-gray-300 text-orange-500" />
              <span className="text-sm font-medium text-gray-700"><i className="fas fa-star text-amber-400 mr-1"></i>Unggulan</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.aktif === 'Ya' || form.aktif === '1'}
                onChange={e => set('aktif', e.target.checked ? 'Ya' : 'Tidak')}
                className="w-5 h-5 rounded border-gray-300 text-orange-500" />
              <span className="text-sm font-medium text-gray-700"><i className="fas fa-eye text-gray-400 mr-1"></i>Tampilkan</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition">
              Batal
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60">
              {saving ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : <><i className="fas fa-save mr-2"></i>{isEdit ? 'Update' : 'Simpan'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ================================================================
// DELETE MODAL
// ================================================================
function DeleteModal({ book, onClose, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const demo = !isConfigured();

  const handle = async () => {
    setConfirming(true);
    if (demo) { onDelete(book.id); setConfirming(false); return; }
    try {
      const r = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', password: sessionStorage.getItem('bp_admin') || '', id: book.id }),
      });
      const d = await r.json();
      if (d.success) onDelete(book.id);
    } catch { alert('Gagal menghapus buku.'); }
    setConfirming(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <i className="fas fa-trash-alt text-rose-500 text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Buku?</h3>
        <p className="text-gray-500 text-sm mb-6">
          <strong>"{book.title}"</strong> akan dihapus permanen dari katalog.
        </p>
        {demo && <p className="text-xs text-amber-600 mb-4 bg-amber-50 rounded-xl p-3">Mode Demo — penghapusan hanya berlaku di browser.</p>}
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition">
            Batal
          </button>
          <button onClick={handle} disabled={confirming}
            className="flex-1 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition disabled:opacity-60">
            {confirming ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-trash-alt mr-2"></i>Hapus</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// MAIN ADMIN PANEL
// ================================================================
export default function AdminPanel() {
  const [logged, setLogged] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('semua');
  const [showAdd, setShowAdd] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [delBook, setDelBook] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const demo = !isConfigured();

  const load = () => {
    const local = JSON.parse(localStorage.getItem('bp_books') || '[]');
    if (demo) {
      const defaults = [
        { id: 'd1', title: 'Belajar dari Kegagalan: Kisah 100 Pengusaha Sukses', author: 'Budi Santoso', year: '2022', category: 'pengembangan-diri', pdfUrl: '', coverId: '8292851', pages: '212', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-amber-500', gradientTo: 'to-orange-600' },
        { id: 'd2', title: 'Panduan Hukum bagi Masyarakat Indonesia', author: 'Dr. Rina Marlina, S.H.', year: '2021', category: 'hukum', pdfUrl: '', coverId: '8225261', pages: '180', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600' },
        { id: 'd3', title: 'Membangun Mental Baja: Bangkit dari Keterpurukan', author: 'Ahmad Fauzi', year: '2020', category: 'pengembangan-diri', pdfUrl: '', coverId: '10157403', pages: '198', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-blue-500', gradientTo: 'to-cyan-600' },
        { id: 'd4', title: 'Keterampilan Las & Kerja Logam untuk UMKM', author: 'Ir. Hendra Wijaya', year: '2023', category: 'keterampilan', pdfUrl: '', coverId: '10386659', pages: '156', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-violet-500', gradientTo: 'to-purple-600' },
        { id: 'd5', title: 'Dasar-Dasar Akuntansi untuk Pelaku UMKM', author: 'Dewi Kusuma, S.E.', year: '2022', category: 'wirausaha', pdfUrl: '', coverId: '8221093', pages: '224', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-rose-500', gradientTo: 'to-pink-600' },
      ];
      const ids = new Set(defaults.map(b => b.id));
      const extras = local.filter(b => !ids.has(b.id));
      setBooks([...defaults, ...extras]);
      return;
    }
    fetch(`${API_URL}?action=list&password=${encodeURIComponent(sessionStorage.getItem('bp_admin') || '')}`)
      .then(r => r.json())
      .then(d => setBooks(d.books || []))
      .catch(() => setBooks([...defaults, ...local.filter(b => !ids.has(b.id))]));
  };

  useEffect(() => {
    if (sessionStorage.getItem('bp_admin')) { setLogged(true); load(); }
  }, []);

  const fb = (type, text) => { setFeedback({ type, text }); setTimeout(() => setFeedback(null), 3500); };

  const login = (pwd) => {
    sessionStorage.setItem('bp_admin', pwd);
    setLogged(true);
    load();
  };

  const logout = () => {
    sessionStorage.removeItem('bp_admin');
    setLogged(false);
  };

  const handleSave = (saved) => {
    if (demo && saved) {
      const local = JSON.parse(localStorage.getItem('bp_books') || '[]');
      const updated = local.some(b => b.id === saved.id)
        ? local.map(b => b.id === saved.id ? saved : b)
        : [saved, ...local];
      localStorage.setItem('bp_books', JSON.stringify(updated));
    }
    load();
    fb('success', saved ? 'Berhasil disimpan!' : 'Berhasil diperbarui!');
  };

  const handleDelete = (id) => {
    if (demo) {
      const local = JSON.parse(localStorage.getItem('bp_books') || '[]');
      localStorage.setItem('bp_books', JSON.stringify(local.filter(b => b.id !== id)));
    }
    setBooks(p => p.filter(b => b.id !== id));
    setDelBook(null);
    fb('success', 'Berhasil dihapus!');
  };

  const filtered = books.filter(b => {
    const mS = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.author?.toLowerCase().includes(search.toLowerCase());
    const mC = cat === 'semua' || b.category === cat;
    return mS && mC;
  });

  const getCatLabel = id => CATEGORIES.find(c => c.id === id)?.label || id;
  const getCatColor = id => CATEGORIES.find(c => c.id === id)?.color || 'bg-gray-100 text-gray-600';
  const getCoverUrl = id => id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : null;

  if (!logged) return <LoginScreen onLogin={login} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-door-open text-white"></i>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg leading-none">Buka Pintu</p>
              <p className="text-xs text-gray-500">Panel Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {demo && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                <i className="fas fa-exclamation-triangle mr-1"></i>Mode Demo
              </span>
            )}
            <a href="/" target="_blank"
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
              <i className="fas fa-external-link-alt mr-1"></i>Lihat Situs
            </a>
            <button onClick={logout}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-rose-50 hover:text-rose-600 transition">
              <i className="fas fa-sign-out-alt mr-1"></i>Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {feedback && (
          <div className={`mb-6 flex items-center gap-3 p-4 rounded-2xl text-sm font-semibold ${
            feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            <i className={`fas ${feedback.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {feedback.text}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Kelola Koleksi Buku</h2>
            <p className="text-gray-500 text-sm mt-1">
              {demo ? 'Mode Demo — koneksi Google Sheets belum diatur.' : 'Kelola semua buku di katalog Buka Pintu.'}
            </p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5">
            <i className="fas fa-plus"></i>Tambah Buku
          </button>
        </div>

        <StatsBar books={books} />

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari judul atau penulis..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <button onClick={() => setCat('semua')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  cat === 'semua' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>Semua</button>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    cat === c.id ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>{c.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-book text-gray-400 text-2xl"></i>
              </div>
              <p className="text-gray-500 font-medium">Tidak ada buku ditemukan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sampul</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Penulis</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Kategori</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Tahun</th>
                    <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(book => (
                    <tr key={book.id} className="hover:bg-orange-50/30 transition">
                      <td className="px-5 py-4">
                        <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${book.gradientFrom} ${book.gradientTo} flex items-center justify-center overflow-hidden`}>
                          {book.coverId ? (
                            <img src={getCoverUrl(book.coverId)} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                          ) : (
                            <i className="fas fa-book text-white/60 text-sm"></i>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 max-w-[200px]">{book.title}</p>
                        {(book.featured === 'Ya' || book.featured === '1') && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs"><i className="fas fa-star"></i>Unggulan</span>
                        )}
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-600">{book.author}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCatColor(book.category)}`}>{getCatLabel(book.category)}</span>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-sm text-gray-500">{book.year}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => setEditBook(book)}
                            className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition"
                            title="Edit"><i className="fas fa-pen text-xs"></i></button>
                          <button onClick={() => setDelBook(book)}
                            className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-100 transition"
                            title="Hapus"><i className="fas fa-trash text-xs"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-400">
              Menampilkan {filtered.length} dari {books.length} buku{demo ? ' (Mode Demo)' : ''}
            </p>
          </div>
        </div>

      {/* Modals */}
      {showAdd && <BookModal onSave={handleSave} onClose={() => setShowAdd(false)} />}
      {editBook && <BookModal book={editBook} onSave={handleSave} onClose={() => setEditBook(null)} />}
      {delBook && <DeleteModal book={delBook} onDelete={handleDelete} onClose={() => setDelBook(null)} />}
    </div>
  );
}
