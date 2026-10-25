// Выход роликов по времени: data.json содержит и запланированные ролики, сайт показывает только вышедшие.
// published — «2026-10-25» (только дата: уже вышел) или «2026-10-26T08:00:00+03:00» (build.py приводит к этому виду).
'use strict';
(() => {
  const dateOnly = (p) => p.length === 10;
  // Дата без времени считается началом дня по Москве, как в build.py.
  const releaseMs = (p) => Date.parse(dateOnly(p) ? `${p}T00:00:00+03:00` : p);
  const isReleased = (p, now) => dateOnly(p) || releaseMs(p) <= now;

  // Копия данных только с вышедшими роликами; инструмент остаётся, если вышел хоть один его ролик,
  // и выходит в момент самого раннего из них. Порядок роликов и инструментов сохраняется.
  function visibleData(raw, now) {
    const shorts = raw.shorts.filter((s) => isReleased(s.published, now));
    const out = new Map(shorts.map((s) => [s.id, s]));
    const tools = [];
    for (const t of raw.tools) {
      const own = t.shorts.filter((id) => out.has(id));
      if (!own.length) continue;
      const published = own.map((id) => out.get(id).published).reduce((a, b) => (releaseMs(b) < releaseMs(a) ? b : a));
      tools.push({...t, shorts: own, published});
    }
    const sections = raw.sections
      .map((sec) => ({name: sec.name, count: tools.filter((t) => t.section === sec.name).length}))
      .filter((sec) => sec.count);
    return {...raw, shorts, tools, sections};
  }

  const api = {releaseMs, isReleased, visibleData};
  if (typeof module !== 'undefined') module.exports = api;
  else globalThis.Release = api;
})();
