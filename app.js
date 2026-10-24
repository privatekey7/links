// База AI-инструментов: мини-приложение Telegram и обычная страница на GitHub Pages.
// Данные — data.json от conveyor/miniapp/build.py. Маршрут в hash: #shorts, #tool/<id>, #short/<id>.
'use strict';

const tg = window.Telegram?.WebApp;
const NEW_DAYS = 14;
const STRIP = 8;
const $ = (id) => document.getElementById(id);

const state = {data: null, section: 'all', query: '', favs: new Set(), depth: 0};
let tools = new Map(), shorts = new Map();

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const norm = (s) => String(s ?? '').toLowerCase().replace(/ё/g, 'е');
const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100;
  return `${n} ${m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many}`;
};
const toolsWord = (n) => plural(n, 'инструмент', 'инструмента', 'инструментов');
const isNew = (date) => (Date.now() - new Date(date).getTime()) / 864e5 <= NEW_DAYS;
const wide = () => matchMedia('(min-width: 1000px)').matches;

// ---------- Маршрут ----------

function route() {
  const [kind, id] = location.hash.slice(1).split('/');
  if (kind === 'tool' && tools.has(id)) return {kind, id};
  if (kind === 'short' && shorts.has(id)) return {kind, id};
  if (kind === 'shorts') return {kind};
  return {kind: 'home'};
}

function go(hash) {
  state.depth += 1;
  location.hash = hash;
}

function back() {
  if (state.depth > 0) {
    state.depth -= 1;
    history.back();
  } else {
    location.hash = '';
  }
}

// ---------- Избранное: облако Telegram у самого пользователя, вне Telegram — браузер ----------

const cloud = tg?.isVersionAtLeast?.('6.9') ? tg.CloudStorage : null;

function loadFavs() {
  return new Promise((resolve) => {
    const done = (raw) => {
      try { state.favs = new Set(JSON.parse(raw || '[]')); } catch { state.favs = new Set(); }
      resolve();
    };
    if (cloud) return cloud.getItem('favs', (err, value) => done(err ? null : value));
    try { done(localStorage.getItem('favs')); } catch { done(null); }
  });
}

function saveFavs() {
  const raw = JSON.stringify([...state.favs]);
  if (cloud) return cloud.setItem('favs', raw);
  try { localStorage.setItem('favs', raw); } catch { /* приватный режим: избранное живёт до закрытия */ }
}

// ---------- Куски разметки ----------

const logo = (t, big = false) => `<span class="logo${big ? ' big' : ''}">${t.logo
  ? `<img src="${esc(t.logo)}" alt="" loading="lazy">` : esc(t.name[0])}</span>`;

const cover = (s) => s.cover
  ? `<img class="cover" src="${esc(s.cover)}" alt="Обложка ролика «${esc(s.title)}»" loading="lazy">`
  : `<span class="cover cover-text">${esc(s.title)}</span>`;

const shortCard = (s) => `<button class="short" data-go="short/${esc(s.id)}">${cover(s)}
  <div class="inside"><span>Внутри:</span> ${esc(s.inside)}</div></button>`;

const toolRow = (t, current) => `<button class="row" data-go="tool/${esc(t.id)}"${t.id === current ? ' aria-current="true"' : ''}>
  ${logo(t)}<span class="t"><span class="n">${esc(t.name)}${isNew(t.published) ? '<span class="new">новое</span>' : ''}</span>
  <span class="d">${esc(t.what)}</span></span><span class="chev" aria-hidden="true">›</span></button>`;

const toolGroups = (list, current) => state.data.sections
  .map((sec) => [sec.name, list.filter((t) => t.section === sec.name)])
  .filter(([, ts]) => ts.length)
  .map(([name, ts]) => `<h2 class="group">${esc(name)}</h2><div class="tools">${ts.map((t) => toolRow(t, current)).join('')}</div>`)
  .join('');

const chip = (key, label) => `<button class="chip" data-section="${esc(key)}" aria-pressed="${state.section === key}">${esc(label)}</button>`;

function watchLinks(s) {
  const names = {youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok'};
  return Object.entries(s.video).map(([k, url]) => `<a href="${esc(url)}" data-link>${names[k] ?? esc(k)} ↗</a>`).join('');
}

// ---------- Экраны ----------

function renderSide() {
  const {sections, tools: all, shorts: ss} = state.data;
  const item = (key, label, count) => `<button data-section="${esc(key)}" aria-pressed="${state.section === key}">${esc(label)}<span>${count}</span></button>`;
  $('side').innerHTML = item('all', 'Все', all.length) + item('fav', '★ Избранное', state.favs.size)
    + '<div class="gap"></div>' + sections.map((s) => item(s.name, s.name, s.count)).join('')
    + `<h2 class="group">Ролики</h2><button data-go="shorts">Все ролики<span>${ss.length}</span></button>`;
}

function filteredTools() {
  const all = state.data.tools;
  if (state.section === 'fav') return all.filter((t) => state.favs.has(t.id));
  if (state.section !== 'all') return all.filter((t) => t.section === state.section);
  return all;
}

function renderMain(r) {
  const main = $('main');
  const current = r.kind === 'tool' ? r.id : null;
  const q = norm(state.query.trim());

  if (r.kind === 'shorts') {
    main.innerHTML = `<button class="back" data-back>‹ Назад</button><h2 class="h2">Все ролики</h2>
      <div class="grid-shorts">${state.data.shorts.map(shortCard).join('')}</div>`;
    return;
  }

  if (q) {
    const ts = state.data.tools.filter((t) => norm([t.name, t.what, t.by, t.section].join(' ')).includes(q));
    const ss = state.data.shorts.filter((s) => norm([s.title, s.inside].join(' ')).includes(q));
    main.innerHTML = (ss.length ? `<h2 class="h2">Ролики</h2><div class="strip">${ss.map(shortCard).join('')}</div>` : '')
      + (ts.length ? `<h2 class="h2">Инструменты</h2><div class="tools">${ts.map((t) => toolRow(t, current)).join('')}</div>` : '')
      || `<p class="state">Ничего не нашлось по «${esc(state.query.trim())}». Попробуй название инструмента.</p>`;
    return;
  }

  const list = filteredTools();
  const chips = chip('all', 'Все') + chip('fav', '★ Избранное') + state.data.sections.map((s) => chip(s.name, s.name)).join('');
  const empty = state.section === 'fav'
    ? '<p class="state">Здесь будут инструменты со звёздочкой. Открой инструмент и нажми «В избранное».</p>'
    : '<p class="state">В этом разделе пока пусто.</p>';
  main.innerHTML = `<h2 class="h2">Новые ролики <button data-go="shorts">Все ролики</button></h2>
    <div class="strip">${state.data.shorts.slice(0, STRIP).map(shortCard).join('')}</div>
    <div class="chips" role="group" aria-label="Разделы">${chips}</div>
    ${list.length ? toolGroups(list, current) : empty}`;
}

function toolPage(t) {
  const fav = state.favs.has(t.id);
  const from = t.shorts.map((id) => shorts.get(id)).filter(Boolean).map((s) => `<button class="from" data-go="short/${esc(s.id)}">
    ${cover(s)}<span><small>Из ролика</small><b>${esc(s.title)}</b><span class="more">Все инструменты ролика ›</span></span></button>`).join('');
  return `<button class="back" data-back>‹ Назад</button>
    <article class="card">
      <div class="card-head">${logo(t, true)}<div><h1>${esc(t.name)}</h1><p>${esc([t.by, t.section].filter(Boolean).join(' · '))}</p></div></div>
      <p class="what">${esc(t.what)}</p>
      ${t.commands.map((c) => `<div class="cmd"><code>${esc(c)}</code><button class="btn-copy" data-copy="${esc(c)}">Копировать</button></div>`).join('')}
      ${t.hint ? `<p class="hint">${esc(t.hint)}</p>` : ''}
      ${t.note ? `<div class="note"><span aria-hidden="true">💡</span><div><b>Учти.</b> ${esc(t.note)}</div></div>` : ''}
      <div class="actions"><a class="pri" href="${esc(t.url)}" data-link>Открыть сайт ↗</a>
        <button data-fav="${esc(t.id)}" aria-pressed="${fav}">${fav ? '★ В избранном' : '☆ В избранное'}</button></div>
    </article>${from}`;
}

function shortPage(s, current) {
  const list = s.tools.map((id) => tools.get(id)).filter(Boolean);
  return `<button class="back" data-back>‹ Назад</button>
    <div class="short-head">${cover(s)}<div><small>Ролик · ${toolsWord(list.length)}</small><h1>${esc(s.title)}</h1></div></div>
    ${Object.keys(s.video).length ? `<div class="watch">${watchLinks(s)}</div>` : ''}
    <div class="tools">${list.map((t) => toolRow(t, current)).join('')}</div>`;
}

function renderDetail(r) {
  const d = $('detail');
  if (r.kind === 'tool') d.innerHTML = toolPage(tools.get(r.id));
  else if (r.kind === 'short') d.innerHTML = shortPage(shorts.get(r.id));
  else if (wide() && state.data.shorts.length) d.innerHTML = shortPage(state.data.shorts[0]);
  else d.innerHTML = '';
}

function render() {
  if (!state.data) return;
  const r = route();
  const page = r.kind === 'tool' || r.kind === 'short';
  document.body.classList.toggle('page', page);
  renderSide();
  renderMain(r);
  renderDetail(r);
  if (tg?.BackButton) r.kind === 'home' ? tg.BackButton.hide() : tg.BackButton.show();
  if (page && !wide()) scrollTo({top: 0});
}

// ---------- Действия ----------

async function copy(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  tg?.HapticFeedback?.notificationOccurred('success');
  btn.textContent = 'Готово';
  setTimeout(() => { btn.textContent = 'Копировать'; }, 1400);
}

function openLink(url) {
  if (!tg) return window.open(url, '_blank', 'noopener');
  if (/^https:\/\/t\.me\//.test(url)) tg.openTelegramLink(url);
  else tg.openLink(url);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-copy], [data-link], [data-fav], [data-section], [data-go], [data-back]');
  if (!el) return;
  if (el.dataset.copy !== undefined) return copy(el.dataset.copy, el);
  if (el.dataset.link !== undefined) { e.preventDefault(); return openLink(el.href); }
  if (el.dataset.back !== undefined) return back();
  if (el.dataset.go) return go(el.dataset.go);
  if (el.dataset.fav) {
    const id = el.dataset.fav;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    saveFavs();
    tg?.HapticFeedback?.selectionChanged();
    return render();
  }
  if (el.dataset.section) {
    state.section = el.dataset.section;
    if (location.hash) location.hash = ''; else render();
  }
});

let timer;
$('q').addEventListener('input', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    state.query = e.target.value;
    if (route().kind === 'shorts' || (!wide() && document.body.classList.contains('page'))) location.hash = '';
    else render();
  }, 120);
});

addEventListener('hashchange', render);
matchMedia('(min-width: 1000px)').addEventListener('change', render);
tg?.BackButton?.onClick(back);

// ---------- Запуск ----------

async function start() {
  tg?.ready();
  tg?.expand();
  // Тема всегда светлая: красим и рамку окна Telegram, иначе в тёмной теме шапка останется тёмной.
  if (tg?.isVersionAtLeast?.('6.1')) { tg.setHeaderColor('#ffffff'); tg.setBackgroundColor('#ffffff'); }
  if (tg?.isVersionAtLeast?.('7.10')) tg.setBottomBarColor('#ffffff');
  try {
    const res = await fetch('data.json', {cache: 'no-cache'});
    if (!res.ok) throw new Error(res.status);
    state.data = await res.json();
  } catch {
    $('main').innerHTML = '<p class="state">Не получилось загрузить базу. Проверь интернет и открой ещё раз.</p>';
    return;
  }
  tools = new Map(state.data.tools.map((t) => [t.id, t]));
  shorts = new Map(state.data.shorts.map((s) => [s.id, s]));
  $('meta').textContent = `${toolsWord(state.data.tools.length)} · обновлено ${state.data.updated.split('-').reverse().join('.')}`;
  await loadFavs();
  // ?q=... открывает базу сразу с поиском (ссылка из описания ролика).
  const q = new URLSearchParams(location.search).get('q');
  if (q) { $('q').value = q; state.query = q; }
  // Ссылка t.me/<бот>/<приложение>?startapp=conv-01 (ролик) или ?startapp=playwright-cli (инструмент).
  const start = tg?.initDataUnsafe?.start_param || new URLSearchParams(location.search).get('startapp');
  if (start && !location.hash) {
    if (shorts.has(start)) location.replace(`#short/${start}`);
    else if (tools.has(start)) location.replace(`#tool/${start}`);
  }
  render();
}

start();
