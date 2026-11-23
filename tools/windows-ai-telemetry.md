# Windows 11 записывает запуск ИИ-агентов: как выключить

Раздел: Безопасность. Добавлен в базу: 2026-11-23.
Автор: Xusheng (Binary Ninja).

## Что делает

В свежей Windows нашёлся список claude.exe, codex.exe, copilot.exe, cursor.exe, antigravity.exe. Раз в сутки система собирает отчёт, что из этого ты запускал, и ставит его в очередь на отправку. Промптов и кода там нет.

## Команды и шаги

```
Get-Process AggregatorHost
tasklist /m MissionControlAggregator.dll
```

Выключить: Параметры → Конфиденциальность и защита → Диагностика и отзывы → «Отправлять необязательные диагностические данные». Команды выше проверяют, работает ли компонент (PowerShell от администратора).

## Учти

Microsoft пока не комментирует.

## Ссылки

- Источник: https://xusheng.dev/posts/windows-coding-agent-telemetry/
- Ролик: https://youtube.com/shorts/djSdIqnvY9M (Windows 11 записывает, сидишь ли ты в Claude и Cursor)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=windows-ai-telemetry
- Эта страница: https://privatekey7.github.io/links/tools/windows-ai-telemetry.md
