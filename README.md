# Devi's Book Journal

Perpustakaan digital sederhana untuk menyimpan rangkuman cepat dan bedah lengkap buku. Dibuat dengan HTML, CSS, JavaScript, dan file Markdown terpisah untuk setiap buku.

## Fitur

- Desain responsif dengan palet cream, dusty pink, dan lavender.
- Kartu buku dengan kategori dan status pembahasan.
- Pencarian judul, penulis, kategori, dan kata kunci.
- Filter kategori.
- Dialog detail buku dengan tab Ringkasan Cepat dan Bedah Lengkap.
- Konten disimpan sebagai file Markdown, sehingga mudah diperbarui.
- Tidak membutuhkan build tools atau framework.

## Menjalankan secara lokal

Karena halaman memuat file Markdown dengan `fetch()`, jalankan melalui local web server, bukan dengan membuka `index.html` langsung.

### Opsi 1 — VS Code Live Server
1. Buka folder proyek di VS Code.
2. Pasang ekstensi **Live Server** jika belum tersedia.
3. Klik kanan `index.html` → **Open with Live Server**.

### Opsi 2 — Python
Buka terminal di folder proyek lalu jalankan:

```bash
python -m http.server 8000
```

Buka `http://localhost:8000`.

## Menambah buku

1. Buat file Markdown baru di `content/books/`, misalnya `buku-baru.md`.
2. Ikuti struktur file yang sudah ada. Pisahkan bagian ringkasan dan bedah lengkap dengan baris berikut:

```html
<!-- DEEP-ANALYSIS -->
```

3. Tambahkan satu objek buku di array `BOOKS` pada `assets/js/script.js`.
4. Pastikan nilai `file` sesuai dengan lokasi file Markdown.
5. Untuk kategori baru, tambahkan tombol filter di `index.html` dan pastikan nama kategorinya sama persis.

## Struktur folder

```text
devis-book-journal/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── content/
    └── books/
        ├── the-black-swan.md
        ├── sapiens.md
        ├── the-secret.md
        ├── inner-child.md
        └── cara-rasulullah-mendidik-anak.md
```

## Publish di GitHub Pages

1. Buat repository GitHub baru, misalnya `devis-book-journal`.
2. Unggah semua isi folder proyek ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu proses deployment selesai. GitHub akan menampilkan URL Pages pada bagian Pages.

Pastikan semua path relatif seperti `assets/css/style.css` dan `content/books/sapiens.md` tetap dipertahankan. Jika repository menggunakan GitHub Pages dari root, struktur di atas siap digunakan.

## Catatan privasi dan sumber

GitHub Pages menghasilkan situs publik. Jangan menaruh catatan pribadi atau informasi sensitif di repository publik. Rangkuman buku di sini merupakan interpretasi singkat dan tidak menggantikan buku asli. Sampul buku The Black Swan, Sapiens, The Secret, dan Psychologist for Inner-Child menggunakan gambar yang diberikan pengguna. Sampul Cara Rasulullah SAW Mendidik Anak tetap berupa placeholder karena gambar sampulnya belum diberikan.
