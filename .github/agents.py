"""Версия базы для ИИ-агентов и поисковиков: статичные файлы рядом с мини-приложением.

Сайт базы — одностраничник на JS: агент без браузера видит там только «Загружаю базу…».
Скрипт читает <site>/data.json и пишет то же содержимое текстом:
- llms.txt — оглавление по стандарту llmstxt.org со ссылками на страницы инструментов;
- llms-full.txt — вся база одним файлом: «скинь агенту ссылку, он всё поставит»;
- tools/<id>.md и tools/<id>.html — карточка инструмента для агента и для поиска;
- sitemap.xml и robots.txt.

В файлы попадают только вышедшие ролики, как на сайте (release.js). Поэтому скрипт гоняется не только из build.py,
но и по расписанию в репозитории GitHub Pages (.github/workflows/agents.yml): инструмент из запланированного ролика
появляется к моменту выхода без пересборки базы. Только стандартная библиотека: в Actions ставить нечего.

Usage: python -I conveyor/miniapp/agents.py [папка сайта]   (по умолчанию conveyor/miniapp/site)
"""
import html
import json
import shutil
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

BASE_URL = "https://privatekey7.github.io/links/"
APP_URL = "https://t.me/privatekey_ai_bot/base"
CHANNEL_URL = "https://t.me/privatekey_ai"
CHAT_URL = "https://t.me/privatekey_ai_chat"
MSK = timezone(timedelta(hours=3))

AGENT_HOWTO = """\
## Как установить инструмент (для ИИ-агента)

1. Найди инструмент в списке ниже по названию или задаче и открой его страницу `.md`.
2. Прочитай «Что делает» и «Учти»: там требования (ОС, ключи, подписки) и подвох.
3. Выполни блок «Команды и шаги» по порядку: это команды оболочки, строки для настроек или ручные шаги.
   Пояснение под блоком говорит, что из этого разовое, что ставит насовсем и под какую оболочку.
4. Перед установкой сверься с первоисточником по ссылке «Источник»: команды могли поменяться после ролика.
5. Перед командами, которые меняют систему или ставят что-то глобально, спроси пользователя."""


def released_ms(published):
    """Момент выхода: дата без времени — начало дня по Москве (как в build.py и release.js)."""
    if len(published) == 10:
        return datetime.fromisoformat(published).replace(tzinfo=MSK)
    return datetime.fromisoformat(published)


def visible(data, now):
    """Только вышедшие ролики и их инструменты; повторяет visibleData из site/release.js."""
    shorts = [s for s in data["shorts"] if released_ms(s["published"]) <= now]
    out = {s["id"]: s for s in shorts}
    tools = []
    for t in data["tools"]:
        own = [sid for sid in t["shorts"] if sid in out]
        if not own:
            continue
        published = min((out[sid]["published"] for sid in own), key=released_ms)
        tools.append({**t, "shorts": own, "published": published})
    sections = [sec["name"] for sec in data["sections"] if any(t["section"] == sec["name"] for t in tools)]
    return {"shorts": shorts, "tools": tools, "sections": sections, "by_short": out}


def fence(text):
    """Ограда для блока кода длиннее любой серии обратных кавычек внутри."""
    run = longest = 0
    for ch in text:
        run = run + 1 if ch == "`" else 0
        longest = max(longest, run)
    return "`" * max(3, longest + 1)


def tool_md(t, by_short, level=1):
    """Карточка инструмента в Markdown. level=2 — для общего файла, где над ней заголовок раздела."""
    h = "#" * level
    lines = [f"{h} {t['name']}", "", f"Раздел: {t['section']}. Добавлен в базу: {t['published'][:10]}."]
    if t.get("by"):
        lines.append(f"Автор: {t['by']}.")
    lines += ["", f"{h}# Что делает", "", t["what"], "", f"{h}# Команды и шаги", ""]
    cmds = "\n".join(t["commands"])
    lines += [fence(cmds), cmds, fence(cmds)]
    if t.get("hint"):
        lines += ["", t["hint"]]
    if t.get("note"):
        lines += ["", f"{h}# Учти", "", t["note"]]
    lines += ["", f"{h}# Ссылки", "", f"- Источник: {t['url']}"]
    for sid in t["shorts"]:
        s = by_short[sid]
        if s.get("video", {}).get("youtube"):
            lines.append(f"- Ролик: {s['video']['youtube']} ({s['title']})")
    lines += [
        f"- Карточка в Telegram: {APP_URL}?startapp={t['id']}",
        f"- Эта страница: {BASE_URL}tools/{t['id']}.md",
    ]
    return "\n".join(lines) + "\n"


def summary(t):
    """Первое предложение «что делает» для оглавления."""
    first = t["what"].split(". ")[0].rstrip(".")
    return first if len(first) <= 200 else first[:197] + "…"


def llms_txt(v, updated):
    out = [
        "# База AI-инструментов @privatekey_ai",
        "",
        (f"> Скиллы, MCP-серверы, агенты и утилиты из роликов Telegram-канала {CHANNEL_URL} про Claude Code"
         " и вайбкодинг: что делает каждый инструмент, команды установки и что учесть. Русский язык."),
        "",
        f"Обновлено {updated}. Инструментов: {len(v['tools'])}. Вся база одним файлом: {BASE_URL}llms-full.txt",
        "",
        AGENT_HOWTO,
    ]
    for sec in v["sections"]:
        out += ["", f"## {sec}", ""]
        for t in v["tools"]:
            if t["section"] == sec:
                out.append(f"- [{t['name']}]({BASE_URL}tools/{t['id']}.md): {summary(t)}")
    out += ["", "## Optional", "", f"- [Канал автора]({CHANNEL_URL}): новые инструменты с каждым роликом",
            f"- [Чат канала]({CHAT_URL}): вопросы и находки"]
    return "\n".join(out) + "\n"


def llms_full(v, updated):
    out = [
        "# База AI-инструментов @privatekey_ai (полный текст)",
        "",
        f"Обновлено {updated}. Инструментов: {len(v['tools'])}. Канал автора: {CHANNEL_URL}",
        "",
        AGENT_HOWTO,
    ]
    for sec in v["sections"]:
        out += ["", f"# Раздел: {sec}", ""]
        out += [tool_md(t, v["by_short"], level=2) for t in v["tools"] if t["section"] == sec]
    return "\n".join(out)


def tool_html(t, by_short):
    """Статичная страница инструмента для поиска: тот же текст, без JS."""
    e = html.escape
    url = f"{BASE_URL}tools/{t['id']}.html"
    videos = "".join(
        f'<li><a href="{e(by_short[s]["video"]["youtube"])}">Ролик: {e(by_short[s]["title"])}</a></li>'
        for s in t["shorts"] if by_short[s].get("video", {}).get("youtube"))
    parts = [
        "<!doctype html>",
        '<html lang="ru">',
        "<head>",
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; style-src 'self'\">",
        f"<title>{e(t['name'])} — База AI-инструментов</title>",
        f'<meta name="description" content="{e(summary(t))}">',
        f'<link rel="canonical" href="{e(url)}">',
        f'<link rel="alternate" type="text/markdown" href="{e(t["id"])}.md">',
        '<link rel="stylesheet" href="../page.css">',
        "</head>",
        "<body>",
        '<main class="card">',
        f'<p class="crumbs"><a href="../">База AI-инструментов</a> · {e(t["section"])}</p>',
        f"<h1>{e(t['name'])}</h1>",
        f'<p class="meta">Добавлен {e(t["published"][:10])}' + (f" · автор {e(t['by'])}" if t.get("by") else "") + "</p>",
        "<h2>Что делает</h2>",
        f"<p>{e(t['what'])}</p>",
        "<h2>Команды и шаги</h2>",
        f"<pre><code>{e(chr(10).join(t['commands']))}</code></pre>",
    ]
    if t.get("hint"):
        parts.append(f"<p>{e(t['hint'])}</p>")
    if t.get("note"):
        parts += ["<h2>Учти</h2>", f"<p>{e(t['note'])}</p>"]
    parts += [
        "<h2>Ссылки</h2>",
        (f'<ul><li><a href="{e(t["url"])}">Источник</a></li>{videos}'
         f'<li><a href="{e(APP_URL)}?startapp={e(t["id"])}">Открыть в Telegram</a></li></ul>'),
        f'<p class="channel">Новые инструменты с каждым роликом: <a href="{CHANNEL_URL}">@privatekey_ai</a></p>',
        "</main>",
        "</body>",
        "</html>",
    ]
    return "\n".join(parts) + "\n"


def sitemap(v, updated):
    urls = [BASE_URL, f"{BASE_URL}llms.txt"] + [f"{BASE_URL}tools/{t['id']}.html" for t in v["tools"]]
    body = "".join(f"<url><loc>{html.escape(u)}</loc><lastmod>{updated}</lastmod></url>" for u in urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{body}</urlset>\n')


def write(site, now=None):
    """Пишет файлы для агентов в папку сайта; возвращает число инструментов. tools/ пересоздаётся целиком."""
    site = Path(site)
    now = now or datetime.now(MSK)
    data = json.loads((site / "data.json").read_text(encoding="utf-8"))
    v = visible(data, now)
    # Дата меняется, только когда меняется содержимое: сборка базы или выход нового инструмента.
    # Иначе ежедневный запуск в Actions коммитил бы одну смену даты.
    updated = max([data["updated"], *(t["published"][:10] for t in v["tools"])])
    tools_dir = site / "tools"
    shutil.rmtree(tools_dir, ignore_errors=True)
    tools_dir.mkdir()
    for t in v["tools"]:
        (tools_dir / f"{t['id']}.md").write_text(tool_md(t, v["by_short"]), encoding="utf-8", newline="\n")
        (tools_dir / f"{t['id']}.html").write_text(tool_html(t, v["by_short"]), encoding="utf-8", newline="\n")
    files = {
        "llms.txt": llms_txt(v, updated),
        "llms-full.txt": llms_full(v, updated),
        "sitemap.xml": sitemap(v, updated),
        "robots.txt": f"User-agent: *\nAllow: /\n\nSitemap: {BASE_URL}sitemap.xml\n",
    }
    for name, text in files.items():
        (site / name).write_text(text, encoding="utf-8", newline="\n")
    return len(v["tools"])


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    site = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent / "site"
    n = write(site)
    print(f"файлы для агентов: {n} инструментов -> {site}")


if __name__ == "__main__":
    main()
