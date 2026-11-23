# openskycam

Раздел: Агенты. Добавлен в базу: 2026-11-01.
Автор: Deibler.

## Что делает

Открытая камера неба: пишет ночное видео на свой диск, а Claude Code через MCP сам разбирает находки, отсеивает ложные и утром присылает метеоры.

## Команды и шаги

```
curl -fsSL https://raw.githubusercontent.com/Deibler/openskycam/main/setup/install.sh | bash
```

Команда скачает openskycam в ~/openskycam и запустит пошаговую настройку. Ответы сохраняются в .env, настройку можно прервать и продолжить командой npm run setup.

## Учти

Нужны RTSP-камера, Raspberry Pi рядом с ней, компьютер с большим диском и аккаунт Cloudflare со своим доменом. Первый вход в Cloudflare, туннель и ключи API делаешь руками.

## Ссылки

- Источник: https://github.com/Deibler/openskycam
- Ролик: https://youtube.com/shorts/AUUyvQ59wOc (Пока ты спишь, Claude смотрит в небо и ловит метеоры)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=openskycam
- Эта страница: https://privatekey7.github.io/links/tools/openskycam.md
