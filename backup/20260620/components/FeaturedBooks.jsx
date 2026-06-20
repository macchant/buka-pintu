import { useState, useEffect } from 'react';
import PdfReader from './PdfReader';

const GRADIENTS = [
  'from-amber-500 to-orange-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-orange-500 to-red-600',
  'from-lime-500 to-green-600',
];

// Google Apps Script API URL
const API_URL = 'https://script.google.com/macros/s/AKfycby_utnwESs_l3n6KFjnPsSmCAyWJjKdE9GEEi7nh3_5uChTuvfwSGeLXvnM6MLl3bzn/exec';

// Fallback featured books (local data - always works)
const FALLBACK_BOOKS = [
  { id: '1', title: 'Membangun Mental Baja: Bangkit dari Keterpurukan', author: 'Ahmad Fauzi', year: '2020', category: 'pengembangan-diri', pages: '198', featured: 'Ya', gradientFrom: 'from-blue-500', gradientTo: 'to-cyan-600' },
  { id: '2', title: 'Panduan Hukum bagi Masyarakat Indonesia', author: 'Dr. Rina Marlina', year: '2021', category: 'hukum', pages: '180', featured: 'Ya', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600' },
  { id: '3', title: 'Belajar dari Kegagalan: Kisah 100 Pengusaha', author: 'Budi Santoso', year: '2022', category: 'kisah-inspiratif', pages: '212', featured: 'Ya', gradientFrom: 'from-amber-500', gradientTo: 'to-orange-600' },
  { id: '4', title: 'Keterampilan Digital untuk UMKM', author: 'Tim Buka Pintu', year: '2023', category: 'keterampilan', pages: '156', featured: 'Ya', gradientFrom: 'from-violet-500', gradientTo: 'to-purple-600' },
  { id: '5', title: 'Dasar-dasar Marketing untuk Pemula', author: 'Sarah Wijaya', year: '2023', category: 'wirausaha', pages: '134', featured: 'Ya', gradientFrom: 'from-rose-500', gradientTo: 'to-pink-600' },
  { id: '6', title: 'Mengelola Keuangan Keluarga', author: 'Dian Pratama', year: '2022', category: 'pengembangan-diri', pages: '98', featured: 'Ya', gradientFrom: 'from-sky-500', gradientTo: 'to-blue-600' },
];

export default function FeaturedBooks() {
  const [books, setBooks] = useState(FALLBACK_BOOKS);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch from Google Sheets API
    fetch(`${API_URL}?action=list`)
      .then(res => res.json())
      .then(data => {
        if (data.books && data.books.length > 0) {
          const featured = data.books
            .filter(b => b.featured === 'Ya' || b.featured === '1')
            .slice(0, 8);
          if (featured.length > 0) {
            setBooks(featured);
          }
        }
      })
      .catch(err => {
        console.log('API fetch failed, using fallback books:', err);
        // Keep fallback books - already set as initial state
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.map((book, index) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-44 bg-gradient-to-br ${book.gradientFrom && book.gradientTo ? `${book.gradientFrom} ${book.gradientTo}` : GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center p-4 relative flex-shrink-0 overflow-hidden`}>
              <div className="text-center">
                <i className="fas fa-book text-white/80 text-4xl mb-2 block group-hover:scale-110 transition-transform duration-300"></i>
                <p className="text-white/80 text-xs font-medium text-center leading-tight">{book.title}</p>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200">
                <i className="fas fa-star text-amber-500 mr-1"></i>Unggulan
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-white rounded-full text-sm font-semibold text-brand-700 shadow-lg">
                  <i className="fas fa-book-open mr-2"></i>Baca Sekarang
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{book.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">{book.author}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{book.year}</p>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400 dark:text-gray-500"><i className="fas fa-file-lines mr-1"></i>{book.pages || '-'} hal.</span>
                <span className="px-3 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-full hover:bg-orange-700 transition-colors">
                  <i className="fas fa-book-reader mr-1"></i>Baca
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Reader Modal */}
      {selectedBook && (
        <PdfReader
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  );
}
