# hiring-panel

Раздел: Скиллы. Добавлен в базу: 2026-11-07.
Автор: Alex Chen (@nocodealex).

## Что делает

Скилл Claude Code: робот-фильтр, нанимающий менеджер и пятеро читателей (рекрутер, директор, коллега, конкурент, менеджер) по одному пытаются отклонить резюме, потом скилл собирает претензии и переписывает резюме, исправив каждую.

## Команды и шаги

```
https://github.com/alexyc9381/hiring-panel-skill
Install this skill, then confirm /hiring-panel works.
/hiring-panel ~/Documents/resume.pdf  Продакт-менеджер в финтех
```

Первую команду вставь в Claude Code, он поставит скилл сам. Потом новый сеанс и вторая команда: путь к резюме и вакансия (лучше вставить текст вакансии целиком). Итог в папке .hiring-panel/: PANEL.md и RESUME-IMPROVED.md.

## Учти

Один прогон это восемь агентов, заметно ест лимит Claude. Цифр и мест работы не выдумывает: где не хватает, ставит [ADD: …] и спрашивает. Автор просит подписывать «/hiring-panel skill by Alex Chen (@nocodealex)».

## Ссылки

- Источник: https://github.com/alexyc9381/hiring-panel-skill
- Ролик: https://youtube.com/shorts/rTqRKWhABgY (Семь Claude пытаются завалить твоё резюме)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=hiring-panel
- Эта страница: https://privatekey7.github.io/links/tools/hiring-panel.md
