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
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psikologi",
    status: "Selesai dibedah",
    coverClass: "cover-thinking-fast-slow",
    coverImage: "assets/images/covers/thinking-fast-and-slow.jpg",
    coverTitle: "THINKING<br>FAST AND SLOW",
    summary: "Membahas cara kerja pikiran cepat dan lambat, bias kognitif, pengambilan keputusan, kepercayaan diri berlebihan, serta perbedaan antara pengalaman dan kenangan.",
    file: "content/books/thinking-fast-and-slow.md",
    keywords: "thinking fast and slow daniel kahneman psikologi bias kognitif pengambilan keputusan heuristik overconfidence prospect theory"
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
const pagination = document.querySelector("#book-pagination");
const previousPageButton = document.querySelector("#page-prev");
const nextPageButton = document.querySelector("#page-next");
const pageLabel = document.querySelector("#page-label");
const BOOKS_PER_PAGE = 6;
let currentPage = 1;
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

  const totalPages = Math.max(1, Math.ceil(visibleBooks.length / BOOKS_PER_PAGE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = visibleBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  grid.innerHTML = pageBooks.length
    ? pageBooks.map(makeCard).join("")
    : "";
  count.textContent = String(visibleBooks.length);
  emptyState.hidden = visibleBooks.length > 0;

  // Show pagination only when the current result set spans multiple pages.
  pagination.hidden = totalPages <= 1;
  pageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
  previousPageButton.disabled = currentPage <= 1;
  nextPageButton.disabled = currentPage >= totalPages;
}

function setPage(page) {
  currentPage = page;
  renderBooks();
  document.querySelector("#library").scrollIntoView({ behavior: "smooth", block: "start" });
}

function setCategory(category) {
  selectedCategory = category;
  currentPage = 1;
  filters.querySelectorAll(".filter-chip").forEach((button) => {
    const active = button.dataset.category === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderBooks();
}

function renderInlineMarkdown(text) {
  // Escape source text first so Markdown content cannot inject arbitrary HTML.
  let html = escapeHTML(text);
  const codeSpans = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE${codeSpans.length}@@`;
    codeSpans.push(`<code>${code}</code>`);
    return token;
  });
  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
    .replace(/_([^_\n]+)_/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
  codeSpans.forEach((code, index) => {
    html = html.replace(`@@CODE${index}@@`, code);
  });
  return html;
}

function basicMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listType = null;
  let quoteLines = [];
  let tableLines = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${renderInlineMarkdown(paragraph.join(" ").trim())}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (!listType) return;
    const tag = listType;
    output.push(`<${tag}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</${tag}>`);
    listType = null;
    listItems = [];
  };
  const flushQuote = () => {
    if (quoteLines.length) {
      flushParagraph();
      flushList();
      output.push(`<blockquote>${quoteLines.map((line) => `<p>${renderInlineMarkdown(line)}</p>`).join("")}</blockquote>`);
      quoteLines = [];
    }
  };
  const flushTable = () => {
    if (!tableLines.length) return;
    flushParagraph();
    flushList();
    const rows = tableLines.filter((line) => !/^\s*\|?\s*:?-{3,}/.test(line));
    const cells = rows.map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
    if (cells.length) {
      const header = cells[0];
      const body = cells.slice(1);
      output.push(`<div class="markdown-table-wrap"><table><thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
    }
    tableLines = [];
  };
  let listItems = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    const isTableRow = trimmed.includes("|") && /^\s*\|?.+\|.+\|?\s*$/.test(line);
    const nextIsTableRule = i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1]);

    if (!trimmed) {
      flushParagraph(); flushList(); flushQuote(); flushTable();
      continue;
    }
    if (isTableRow && (tableLines.length || nextIsTableRule)) {
      flushParagraph(); flushList(); flushQuote();
      tableLines.push(line);
      continue;
    }
    if (tableLines.length) flushTable();

    const heading = trimmed.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      flushParagraph(); flushList(); flushQuote();
      const level = heading[1].length;
      output.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    if (/^(---+|___+|\*\*\*+)\s*$/.test(trimmed)) {
      flushParagraph(); flushList(); flushQuote();
      output.push("<hr>");
      continue;
    }
    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph(); flushList();
      quoteLines.push(quote[1]);
      continue;
    }
    flushQuote();
    const listMatch = trimmed.match(/^([-*+]\s+|\d+[.)]\s+)(.+)$/);
    if (listMatch) {
      flushParagraph();
      const nextType = /^\d/.test(listMatch[1]) ? "ol" : "ul";
      if (listType && listType !== nextType) flushList();
      if (!listType) listType = nextType;
      listItems.push(listMatch[2]);
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph(); flushList(); flushQuote(); flushTable();
  return output.join("\n");
}


function safeMarkdown(markdown) {
  return basicMarkdown(markdown);
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

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderBooks();
});
previousPageButton.addEventListener("click", () => {
  if (currentPage > 1) setPage(currentPage - 1);
});
nextPageButton.addEventListener("click", () => {
  setPage(currentPage + 1);
});
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
