# xj-scanner: ИИ-агент читает старый Jeep через Arduino за 3 доллара

Раздел: Разное. Добавлен в базу: 2026-11-19.
Автор: Muhammad Zulali (MZULALI).

## Что делает

Три провода от диагностического разъёма старого Jeep к Arduino Nano, плата в ноутбук. Дальше Claude Code или Codex читает ошибки и живые данные двигателя, пишет лог поездки и запускает встроенные проверки блока (бензонасос, форсунки, катушки). Автор так нашёл, почему его Jeep 1994 года не проходил тест выхлопа.

## Команды и шаги

```
git clone https://github.com/MZULALI/xj-scanner
Help me hook this up to my Jeep.
```

Вторую фразу скажи агенту в папке проекта (по-русски: «Помоги подключить это к моему Jeep»), он прочитает AGENTS.md и поведёт по шагам. Только Jeep и Chrysler 1991–1995 с блоками SBEC (OBD1); проверено на одной машине. Железо около 15 долларов: клон Arduino Nano, макетка, провода, мультиметр. Ролики: Jeep https://youtu.be/WPj3aQ-xxpI, пикап GMC с клоном блока https://youtu.be/hYMICks5nDg

## Учти

Гнездо 6 разъёма даёт 12 В: ничего к нему не подключать, сначала прозвонить все гнёзда мультиметром. Работа с блоком двигателя на свой риск.

## Ссылки

- Источник: https://github.com/MZULALI/xj-scanner
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=xj-scanner
- Эта страница: https://privatekey7.github.io/links/tools/xj-scanner.md
