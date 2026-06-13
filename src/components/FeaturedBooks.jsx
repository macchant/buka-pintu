import { useState, useEffect } from 'react';

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

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?action=list`)
      .then(res => res.json())
      .then(data => {
        if (data.books && data.books.length > 0) {
          // Filter featured books and limit to 8
          const featured = data.books
            .filter(b => b.featured === 'Ya' || b.featured === '1')
            .slice(0, 8);
          setBooks(featured);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {books.map((book, index) => (
        <a
          key={book.id}
          href="/katalog"
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <div className={`h-44 bg-gradient-to-br ${book.gradientFrom && book.gradientTo ? `${book.gradientFrom} ${book.gradientTo}` : GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center p-4 relative flex-shrink-0`}>
            <div className="text-center">
              <i className="fas fa-book text-white/80 text-4xl mb-2 block"></i>
              <p className="text-white/80 text-xs font-medium text-center leading-tight">{book.title}</p>
            </div>
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-star text-amber-500 mr-1"></i>Unggulan
            </span>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-snug mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">{book.author}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{book.year}</p>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-400 dark:text-gray-500"><i className="fas fa-file-lines mr-1"></i>{book.pages || '-'} hal.</span>
              <span className="px-3 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-full hover:bg-orange-700 transition-colors">
                <i className="fas fa-book-reader mr-1"></i>Baca
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
