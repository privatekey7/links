# reanimate

Раздел: Скиллы. Добавлен в базу: 2026-11-06.
Автор: Niaz Morshed.

## Что делает

Скилл Claude Code: снимает анимацию с сайта, записи экрана, mp4, gif или Lottie, повторяет её в твоём коде и сверяет копию с оригиналом кадр за кадром, пока не совпадёт.

## Команды и шаги

```
npx skills add NiazMorshed2007/reanimate -g -a claude-code
/reanimate the hero entrance on https://example.com, into components/Hero.tsx
```

Нужен Bun 1.1 или новее. По умолчанию копирует движение, а вид оставляет тебе; для точной копии допиши «match it exactly». Страницы за логином и YouTube не снимает: дай ему запись экрана.

## Учти

Проверен на macOS и Linux, Windows не тестировался. Первый запуск докачивает ffmpeg и Chromium, около 250 МБ. Шрифты, картинки и код чужого сайта остаются чужими.

## Ссылки

- Источник: https://github.com/NiazMorshed2007/reanimate
- Ролик: https://youtube.com/shorts/zxmVbO2Dq9w (Скилл Claude Code копирует анимацию с любого сайта до кадра)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=reanimate
- Эта страница: https://privatekey7.github.io/links/tools/reanimate.md
