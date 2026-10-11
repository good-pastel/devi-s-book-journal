<div align="center">

# 📚 Devi's Book Journal

**A little corner for books, ideas, and things worth remembering.**

Rangkuman singkat, catatan bacaan, dan pembahasan yang bisa dibuka kembali kapan saja.

🌷 *Cream · Dusty Pink · Lavender*

</div>

---

## ✨ Tentang proyek

Devi's Book Journal adalah perpustakaan digital sederhana untuk menyimpan inti sebuah buku tanpa harus mencari ulang catatan yang tercecer. Setiap buku punya halaman sendiri, dengan ringkasan cepat untuk dibaca sebentar atau pembahasan lengkap saat ingin menyelami idenya lebih jauh.

Dibangun menggunakan **HTML, CSS, JavaScript**, dan file **Markdown** — ringan, mudah dirawat, dan bisa dipublikasikan melalui GitHub Pages.

## 🌼 Fitur

- 🔎 **Pencarian** — cari berdasarkan judul, penulis, kategori, atau kata kunci.
- 🏷️ **Filter kategori** — jelajahi koleksi sesuai topik.
- 📖 **Dua mode membaca** — ringkasan cepat dan bedah lengkap.
- 🎨 **Tampilan pastel** — desain responsif dengan warna cream, dusty pink, dan lavender.
- 📝 **Konten berbasis Markdown** — catatan mudah ditulis dan diperbarui tanpa mengubah layout halaman.
- 💻 **Tanpa proses build** — tidak membutuhkan framework atau build tools.

## 🚀 Menjalankan secara lokal

File Markdown dimuat menggunakan `fetch()`, jadi jalankan website lewat local web server. Jangan membuka `index.html` langsung dengan double-click.

### Opsi 1 — VS Code Live Server

1. Buka folder proyek di VS Code.
2. Pasang ekstensi **Live Server** jika belum tersedia.
3. Klik kanan `index.html` → **Open with Live Server**.

### Opsi 2 — Python

Buka terminal di folder proyek, lalu jalankan:

```powershell
python -m http.server 8000
```

Buka browser dan kunjungi [http://localhost:8000](http://localhost:8000).

## ✍️ Menambahkan buku

Setiap catatan buku disimpan sebagai file Markdown di `content/books/`.

1. **Buat file baru**, misalnya `judul-buku.md`, di dalam folder `content/books/`.
2. Tulis ringkasan cepat di bagian atas file.
3. Tambahkan pemisah berikut untuk memulai bagian bedah lengkap:

   ```html
   <!-- DEEP-ANALYSIS -->
   ```

4. Buka `assets/js/script.js`, lalu tambahkan data buku baru ke array `BOOKS`. Isi informasi seperti `id`, `title`, `author`, `category`, `status`, `summary`, dan `file`.
5. Pastikan path pada properti `file` sama dengan lokasi file Markdown.
6. Jika menggunakan kategori baru, tambahkan tombol filternya di `index.html` dan gunakan nama kategori yang sama persis.

💡 **Tips:** gunakan format nama file yang sederhana, huruf kecil, dan tanda hubung. Contoh: `judul-buku-baru.md`.

## 🗂️ Struktur folder

```text
devis-book-journal/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── covers/
├── content/
│   └── books/
│       └── *.md
└──
```

## 🌐 Publish dengan GitHub Pages

1. Buat repository di GitHub dan unggah seluruh isi folder proyek ke root repository.
2. Buka **Settings → Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`.
5. Klik **Save**, lalu tunggu deployment selesai.
6. Buka URL yang ditampilkan di halaman pengaturan Pages.

Pastikan `index.html`, `assets/`, dan `content/` berada di lokasi yang benar. Gunakan path relatif yang sesuai agar CSS, JavaScript, gambar, dan file Markdown bisa dimuat setelah dipublikasikan.

## 🔒 Catatan privasi

Website GitHub Pages bersifat publik. Jangan menyimpan informasi pribadi atau catatan sensitif di repository ini. Rangkuman merupakan catatan dan interpretasi, bukan pengganti buku aslinya.

---

<div align="center">

Made with ☕, curiosity, and a love for learning. ♡

</div>
