import './style.css';
import { searchWhoogle } from './api';
import { SearchResultItem } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <header class="header">
      <a href="#" class="logo">MagicSearch</a>
      <form class="search-form" id="search-form">
        <input type="text" id="search-input" class="search-input" placeholder="Aramak istediğiniz şeyi yazın..." required />
        <button type="submit" class="search-btn">Ara</button>
      </form>
    </header>
    <main>
      <div id="status" class="status">Arama yapmak için bir kelime yazın.</div>
      <div id="results" class="results"></div>
    </main>
  </div>
`;

const form = document.getElementById('search-form') as HTMLFormElement;
const input = document.getElementById('search-input') as HTMLInputElement;
const status = document.getElementById('status')!;
const results = document.getElementById('results')!;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  status.textContent = 'Aranıyor...';
  results.innerHTML = '';

  try {
    const data = await searchWhoogle(query);
    if (data.results && data.results.length > 0) {
      status.textContent = `"${data.query}" için ${data.results.length} sonuç bulundu.`;
      render(data.results);
    } else {
      status.textContent = 'Sonuç bulunamadı.';
    }
  } catch (err) {
    status.textContent = 'Bir hata oluştu!';
  }
});

function render(items: SearchResultItem[]) {
  results.innerHTML = items.map(item => `
    <article class="card">
      <div class="card-url">${item.href}</div>
      <h2 class="card-title">
        <a href="${item.href}" target="_blank" rel="noopener">${item.title}</a>
      </h2>
      <p class="card-snippet">${item.content || item.text}</p>
    </article>
  `).join('');
}
