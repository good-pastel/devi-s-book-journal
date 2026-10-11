const BOOKS = [
  {
    id: "the-black-swan",
    title: "The Black Swan",
    author: "Nassim Nicholas Taleb",
    category: "Filsafat & Masyarakat",
    status: "Selesai dibedah",
    coverClass: "cover-black-swan",
    coverImage: "assets/images/covers/the-black-swan.jpg",
    coverTitle: "THE<br>BLACK SWAN",
    summary: "Tentang kejadian langka yang berdampak besar, keterbatasan prediksi, dan kecenderungan manusia membuat cerita yang terasa masuk akal setelah sesuatu terjadi.",
    file: "content/books/the-black-swan.md",
    keywords: "ketidakpastian prediksi hindsight bias narrative fallacy"
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Filsafat & Masyarakat",
    status: "Selesai dibedah",
    coverClass: "cover-sapiens",
    coverImage: "assets/images/covers/sapiens.jpg",
    coverTitle: "SAPIENS",
    summary: "Melihat bagaimana sejarah, cerita bersama, institusi, dan teknologi membentuk kehidupan manusia.",
    file: "content/books/sapiens.md",
    keywords: "sejarah manusia revolusi kognitif pertanian industri teknologi masa depan"
  },
  {
    id: "the-secret",
    title: "The Secret",
    author: "Rhonda Byrne",
    category: "Pengembangan Diri",
    status: "Selesai dibedah",
    coverClass: "cover-secret",
    coverImage: "assets/images/covers/the-secret.jpg",
    coverTitle: "THE<br>SECRET",
    summary: "Membahas keyakinan, visualisasi, fokus, dan rasa syukur—serta pentingnya membedakan motivasi dari klaim yang belum terbukti.",
    file: "content/books/the-secret.md",
    keywords: "law of attraction ask believe receive visualisasi syukur"
  },
  {
    id: "inner-child",
    title: "Psychologist for Inner-Child",
    author: "Anette Isabella Ginting, M.Psi., Psikolog",
    category: "Psikologi",
    status: "Selesai dibedah",
    coverClass: "cover-inner-child",
    coverImage: "assets/images/covers/psychologist-for-inner-child.jpeg",
    coverTitle: "INNER<br>CHILD",
    summary: "Mengenali bagaimana pengalaman masa kecil dapat memengaruhi emosi, hubungan, dan pola perilaku saat dewasa.",
    file: "content/books/inner-child.md",
    keywords: "luka masa kecil emosi dewasa pola perilaku refleksi diri"
  },
  {
    id: "parenting-rasulullah",
    title: "Cara Rasulullah SAW Mendidik Anak",
    author: "Ayu Agus Rianti",
    category: "Parenting",
    status: "Selesai dibedah",
    coverClass: "cover-parenting",
    coverTitle: "MENDIDIK<br>ANAK",
    summary: "Membahas pengasuhan melalui kasih sayang, keteladanan, komunikasi, empati, dan batas yang sehat.",
    file: "content/books/cara-rasulullah-mendidik-anak.md",
    keywords: "parenting anak rasulullah keteladanan komunikasi empati"
  }
];

const grid = document.querySelector("#book-grid");
const searchInput = document.querySelector("#search-input");
const filters = document.querySelector("#category-filters");
const count = document.querySelector("#book-count");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#book-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const markdownContent = document.querySelector("#markdown-content");
const dialogTabs = document.querySelectorAll(".dialog-tab");
let selectedCategory = "Semua";
let currentBook = null;
let currentTab = "quick";
let previousFocus = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function makeCard(book) {
  const inProgress = book.status === "Sedang dibedah";
  return `
    <article class="book-card">
      <div class="book-cover ${book.coverClass}" aria-hidden="true">
        ${book.coverImage
          ? `<img class="book-cover-image" src="${escapeHTML(book.coverImage)}" alt="" loading="lazy">`
          : `<div class="cover-placeholder"><div class="cover-label">${book.coverTitle}</div><div class="cover-author">${escapeHTML(book.author)}</div></div>`}
      </div>
      <div class="card-body">
        <p class="card-category">${escapeHTML(book.category)}</p>
        <h3 class="card-title">${escapeHTML(book.title)}</h3>
        <p class="card-author">${escapeHTML(book.author)}</p>
        <p class="card-summary">${escapeHTML(book.summary)}</p>
        <div class="card-bottom">
          <span class="status-pill ${inProgress ? "in-progress" : ""}">${escapeHTML(book.status)}</span>
          <button class="read-button" type="button" data-open-book="${escapeHTML(book.id)}" aria-label="Baca catatan ${escapeHTML(book.title)}">Baca catatan <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>`;
}

function renderBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const visibleBooks = BOOKS.filter((book) => {
    const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;
    const searchable = `${book.title} ${book.author} ${book.category} ${book.summary} ${book.keywords}`.toLocaleLowerCase("id");
    return matchesCategory && searchable.includes(query);
  });

  grid.innerHTML = visibleBooks.length
    ? visibleBooks.map(makeCard).join("")
    : "";
  count.textContent = String(visibleBooks.length);
  emptyState.hidden = visibleBooks.length > 0;
}

function setCategory(category) {
  selectedCategory = category;
  filters.querySelectorAll(".filter-chip").forEach((button) => {
    const active = button.dataset.category === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderBooks();
}

function safeMarkdown(markdown) {
  if (window.marked && typeof window.marked.parse === "function") {
    return window.marked.parse(markdown);
  }
  return `<pre>${escapeHTML(markdown)}</pre>`;
}

async function showBook(bookId, tab = "quick") {
  const book = BOOKS.find((item) => item.id === bookId);
  if (!book) return;

  currentBook = book;
  currentTab = tab;
  previousFocus = document.activeElement;
  document.querySelector("#dialog-title").textContent = book.title;
  document.querySelector("#dialog-author").textContent = book.author;
  document.querySelector("#dialog-category").textContent = book.category;
  document.querySelector("#dialog-summary").textContent = book.summary;
  const art = document.querySelector("#dialog-book-art");
  art.className = `dialog-book-art ${book.coverClass}`;
  art.innerHTML = book.coverImage
    ? `<img class="dialog-cover-image" src="${escapeHTML(book.coverImage)}" alt="Sampul ${escapeHTML(book.title)}">`
    : `<span>${book.coverTitle}</span>`;
  dialogTabs.forEach((button) => {
    const active = button.dataset.tab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  markdownContent.innerHTML = '<p class="loading-message">Membuka catatan buku...</p>';
  if (!dialog.open) dialog.showModal();
  await loadBookSection();
}

async function loadBookSection() {
  if (!currentBook) return;
  const suffix = currentTab === "quick" ? "#quick-summary" : "#deep-analysis";
  try {
    const response = await fetch(currentBook.file);
    if (!response.ok) throw new Error("Catatan tidak ditemukan.");
    const markdown = await response.text();
    const parts = markdown.split(/^<!-- DEEP-ANALYSIS -->\s*$/m);
    const section = currentTab === "quick" ? parts[0] : (parts[1] || parts[0]);
    markdownContent.innerHTML = safeMarkdown(section.replace(/^<!--.*?-->\s*$/gm, ""));
    markdownContent.querySelectorAll("a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  } catch (error) {
    markdownContent.innerHTML = `<p>Catatan belum dapat dimuat. Pastikan website dijalankan melalui server lokal atau GitHub Pages, bukan dengan membuka file HTML langsung.</p><p><small>${escapeHTML(error.message)}</small></p>`;
  }
}

searchInput.addEventListener("input", renderBooks);
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) setCategory(button.dataset.category);
});
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-book]");
  if (button) showBook(button.dataset.openBook);
});
dialogTabs.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentTab === button.dataset.tab) return;
    currentTab = button.dataset.tab;
    dialogTabs.forEach((tabButton) => {
      const active = tabButton === button;
      tabButton.classList.toggle("active", active);
      tabButton.setAttribute("aria-selected", String(active));
    });
    loadBookSection();
  });
});
closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".main-nav a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

renderBooks();
