# Floorplan

Раздел: Агенты. Добавлен в базу: 2026-11-06.
Автор: Hayden Smith.

## Что делает

Плагин для Claude Code и Codex: рисует интерактивную карту твоего приложения простыми словами, подсвечивает, что поменял агент, и ищет типичные дыры: ключи в коде, открытые таблицы, адреса без входа.

## Команды и шаги

```
claude plugin marketplace add haydenschmitty/floorplan
claude plugin install floorplan@floorplan
Make me a floorplan of this app.
```

Нужен Node.js 18+. После установки открой новую сессию и попроси карту, после правок: «Update the floorplan». В Codex: Plugins → Add a marketplace → haydenschmitty/floorplan. Живое демо: haydenschmitty.github.io/floorplan-demo

## Учти

Первая карта большого проекта рисуется долго и расходует лимит подписки: агент описывает каждый файл.

## Ссылки

- Источник: https://github.com/haydenschmitty/floorplan
- Ролик: https://youtube.com/shorts/QIo9EIfQd6c (Агент написал приложение? Floorplan покажет, что внутри)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=floorplan
- Эта страница: https://privatekey7.github.io/links/tools/floorplan.md
