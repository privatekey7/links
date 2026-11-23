# PhoneBox: старый Android как панель для компьютера

Раздел: Разное. Добавлен в базу: 2026-11-19.
Автор: Ersin KOÇ (ersinkoc).

## Что делает

Старый Android-телефон у клавиатуры показывает нагрузку компьютера, музыку, лимиты Claude и Codex и сессии Claude Code. Когда Claude Code просит разрешение, на телефоне кнопки «Разрешить» и «Отклонить». Больше сотни виджетов, редактор в браузере, USB или Wi‑Fi, без облака.

## Команды и шаги

```
irm https://raw.githubusercontent.com/ersinkoc/phonebox/main/setup.ps1 | iex
curl -fsSL https://raw.githubusercontent.com/ersinkoc/phonebox/main/setup.sh | bash
Телефон: включи «Отладку по USB» и подключи кабель (приложение поставится само) или поставь APK из https://github.com/ersinkoc/phonebox/releases/latest и сопряги по Wi‑Fi через QR-код
Кнопки разрешений: Settings → General → Claude Code permission prompts → Install hook
```

Первая команда для Windows (PowerShell), вторая для Linux и Mac. Нужен Android 7+. Настройки панели: http://127.0.0.1:8765 на компьютере. Агент для Windows пока без подписи, SmartScreen может предупредить. Русская инструкция: https://github.com/ersinkoc/phonebox/blob/main/docs/README.ru.md

## Учти

Проекту 10 дней, релизы выходят по несколько в день. Лимит Claude читается через недокументированный адрес Anthropic и может перестать работать. Не путать с phonebox.dev (другой продукт).

## Ссылки

- Источник: https://github.com/ersinkoc/phonebox
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=phonebox
- Эта страница: https://privatekey7.github.io/links/tools/phonebox.md
