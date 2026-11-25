# App Store Compliance: проверка до отправки

Раздел: Скиллы. Добавлен в базу: 2026-11-25.
Автор: mjmirza.

## Что делает

В 2025 Apple отклонила 2 млн заявок из 9,1 млн. Скрипт собрал причины отказов, проверяет проект до отправки и не даёт выпустить сборку с ошибкой. BLOCKED: чинишь каждую [CRITICAL] по строке fix. и запускаешь снова; CLEAR: проходишь чек-лист docs/PRE-SUBMISSION-CHECKLIST.md.

## Команды и шаги

```
git clone https://github.com/mjmirza/app-store-compliance ~/repositories/app-store-compliance
bash ~/repositories/app-store-compliance/agent-os/hooks/app-store-compliance-guard.sh "/путь/к/приложению"
bash ~/repositories/app-store-compliance/scripts/install.sh
```

Первые две: разовая проверка (git и bash, на Windows Git Bash). Третья ставит насовсем в Claude Code, дальше /app-store-audit.

## Учти

Валится большинство на двух вещах: рабочий демо-аккаунт для проверяющего и форма приватности, которая совпадает с тем, что реально делают приложение и все SDK.

## Ссылки

- Источник: https://github.com/mjmirza/app-store-compliance
- Ролик: https://youtube.com/shorts/R7z3LNs64BI (Apple пачками отклоняет вайбкод. Файл знает 117 причин)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=app-store-compliance
- Эта страница: https://privatekey7.github.io/links/tools/app-store-compliance.md
