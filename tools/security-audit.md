# security-audit

Раздел: Безопасность. Добавлен в базу: 2026-10-30.
Автор: Cloudflare.

## Что делает

Скилл для ИИ-агента: сам ищет дыры в коде твоего проекта, перепроверяет каждую находку другим агентом и пишет отчёт.

## Команды и шаги

```
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
security audit this codebase
```

Поставь скилл, открой агента в папке своего проекта и напиши вторую фразу. Отчёт ляжет в папку security-audit-skill в домашней папке.

## Учти

Проверяй только свой код. Один прогон находит примерно половину дыр, лучше запустить два-три раза. Специалиста по безопасности скилл не заменяет.

## Ссылки

- Источник: https://github.com/cloudflare/security-audit-skill
- Ролик: https://youtube.com/shorts/uXasIcrSFCY (Бесплатный аудитор безопасности от Cloudflare для вайбкодеров)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=security-audit
- Эта страница: https://privatekey7.github.io/links/tools/security-audit.md
