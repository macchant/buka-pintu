// ============================================================
// BUKA PINTU — GOOGLE APPS SCRIPT BACKEND
// ============================================================
// Petunjuk Penggunaan:
// 1. Buka Google Sheets Anda
// 2. Klik Extensions → Apps Script
// 3. Hapus semua kode default, salin seluruh isi file ini
// 4. Klik Save (Ctrl+S)
// 5. Klik Deploy → New deployment → Web app
// 6. Set: Execute as = Me | Who has access = Anyone
// 7. Deploy dan salin URL Web App
// 8. Tempel URL ke src/pages/katalog.astro dan src/components/AdminPanel.jsx
// ============================================================

// --- KONFIGURASI ---
const ADMIN_PASSWORD = 'admin123'; // Ganti dengan kata sandi admin Anda
const SHEET_NAME = 'Buku';          // Nama sheet tab (ubah jika berbeda)

// ============================================================
// DOGET — Semua operasi (list, add, update, delete)
// ============================================================
function doGet(e) {
  const action = e.parameter.action;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet if not exists
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupHeaders(sheet);
    }

    if (action === 'list') {
      return handleList(sheet);
    }

    if (action === 'add') {
      return handleAdd(e.parameter, sheet);
    }

    if (action === 'update') {
      return handleUpdate(e.parameter, sheet);
    }

    if (action === 'delete') {
      return handleDelete(e.parameter, sheet);
    }

    return jsonOutput({ error: 'Unknown action' });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

// ============================================================
// HANDLE LIST
// ============================================================
function handleList(sheet) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return jsonOutput({ books: [] });
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

    const books = data
      .filter(row => row[0] && row[0].toString().trim() !== '')
      .map((row, index) => ({
        id: (index + 2).toString(),
        title: row[0] || '',
        author: row[1] || '',
        year: row[2] || '',
        category: row[3] || '',
        pdfUrl: row[4] || '',
        pages: row[5] || '',
        featured: row[6] || 'Tidak',
        aktif: row[7] || 'Ya',
        gradientFrom: row[8] || 'from-amber-500',
        gradientTo: row[9] || 'to-orange-600',
      }));

    return jsonOutput({ books });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString(), books: [] });
  }
}

// ============================================================
// HANDLE ADD
// ============================================================
function handleAdd(params, sheet) {
  try {
    // Decode base64 data if provided, otherwise use individual params
    let data;
    if (params.data) {
      data = JSON.parse(Utilities.newBlob(Utilities.base64Decode(params.data)).getDataAsString());
    } else {
      data = {
        title: params.title || '',
        author: params.author || '',
        year: params.year || new Date().getFullYear().toString(),
        category: params.category || 'pengembangan-diri',
        pdfUrl: params.pdfUrl || '',
        pages: params.pages || '',
        featured: params.featured || 'Tidak',
        aktif: params.aktif || 'Ya',
        gradientFrom: params.gradientFrom || 'from-amber-500',
        gradientTo: params.gradientTo || 'to-orange-600',
      };
    }

    // Verify password
    if (params.password !== ADMIN_PASSWORD) {
      return jsonOutput({ success: false, error: 'Password salah' });
    }

    const row = [
      data.title || '',
      data.author || '',
      data.year || new Date().getFullYear().toString(),
      data.category || 'pengembangan-diri',
      data.pdfUrl || '',
      data.pages || '',
      data.featured || 'Tidak',
      data.aktif || 'Ya',
      data.gradientFrom || 'from-amber-500',
      data.gradientTo || 'to-orange-600',
    ];

    sheet.appendRow(row);
    return jsonOutput({ success: true, message: 'Buku berhasil ditambahkan.' });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

// ============================================================
// HANDLE UPDATE
// ============================================================
function handleUpdate(params, sheet) {
  try {
    // Verify password
    if (params.password !== ADMIN_PASSWORD) {
      return jsonOutput({ success: false, error: 'Password salah' });
    }

    const id = parseInt(params.id);
    if (isNaN(id) || id < 2) {
      return jsonOutput({ success: false, error: 'ID tidak valid' });
    }

    const rowNum = id;
    const range = sheet.getRange(rowNum, 1, 1, 10);
    const newRow = [
      params.title || '',
      params.author || '',
      params.year || '',
      params.category || '',
      params.pdfUrl || '',
      params.pages || '',
      params.featured || 'Tidak',
      params.aktif || 'Ya',
      params.gradientFrom || 'from-amber-500',
      params.gradientTo || 'to-orange-600',
    ];

    range.setValues([newRow]);
    return jsonOutput({ success: true, message: 'Buku berhasil diupdate.' });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

// ============================================================
// HANDLE DELETE
// ============================================================
function handleDelete(params, sheet) {
  try {
    // Verify password
    if (params.password !== ADMIN_PASSWORD) {
      return jsonOutput({ success: false, error: 'Password salah' });
    }

    const id = parseInt(params.id);
    if (isNaN(id) || id < 2) {
      return jsonOutput({ success: false, error: 'ID tidak valid' });
    }

    sheet.deleteRow(id);
    return jsonOutput({ success: true, message: 'Buku berhasil dihapus.' });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

// ============================================================
// SETUP HEADERS
// ============================================================
function setupHeaders(sheet) {
  const headers = [
    'title',
    'author',
    'year',
    'category',
    'pdfUrl',
    'pages',
    'featured',
    'aktif',
    'gradientFrom',
    'gradientTo',
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#F97316')
    .setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);

  // Set column widths
  sheet.setColumnWidth(1, 250); // title
  sheet.setColumnWidth(2, 150); // author
  sheet.setColumnWidth(3, 80);  // year
  sheet.setColumnWidth(4, 140); // category
  sheet.setColumnWidth(5, 300); // pdfUrl
  sheet.setColumnWidth(6, 80);  // pages
  sheet.setColumnWidth(7, 80);   // featured
  sheet.setColumnWidth(8, 80);   // aktif
  sheet.setColumnWidth(9, 150);  // gradientFrom
  sheet.setColumnWidth(10, 150); // gradientTo

  // Add sample data
  const sampleData = [
    ['Membangun Mental Baja: Bangkit dari Keterpurukan', 'Ahmad Fauzi', '2020', 'pengembangan-diri', '', '198', 'Ya', 'Ya', 'from-blue-500', 'to-cyan-600'],
    ['Panduan Hukum bagi Masyarakat Indonesia', 'Dr. Rina Marlina', '2021', 'hukum', '', '180', 'Tidak', 'Ya', 'from-emerald-500', 'to-teal-600'],
    ['Belajar dari Kegagalan: Kisah 100 Pengusaha', 'Budi Santoso', '2022', 'kisah-inspiratif', '', '212', 'Ya', 'Ya', 'from-amber-500', 'to-orange-600'],
  ];
  if (sheet.getLastRow() === 1) {
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  }
}

// ============================================================
// HELPER: JSON Response
// ============================================================
function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// TEST FUNCTION (run this to test)
// ============================================================
function testList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const result = handleList(sheet);
  const text = result.getContent();
  const data = JSON.parse(text);
  console.log('Books count:', data.books?.length);
  console.log('First book:', data.books?.[0]);
}
