# Effort в Claude Code

Раздел: Модели. Добавлен в базу: 2026-11-12.
Автор: Anthropic.

## Что делает

Сколько агент думает и проверяет на одной и той же модели. Пять уровней: low (одна правка без проверок), medium (по умолчанию), high (типы, тесты, линтер), xhigh (долгие сложные задачи), max (только на сессию, склонен загоняться).

## Команды и шаги

```
/effort high
```

Агент ошибся? 1) Поленился: не открыл файл, не прогнал тесты. Подними effort на ступень, модель не трогай. 2) Всё проверил, но путается: ultrathink или /model opusplan, потом Opus. 3) Огромная задача на часы без присмотра: только тогда Fable 5.2.

## Учти

В меню /model effort меняется стрелками влево и вправо. Max не ставь «на всякий случай»: дольше, дороже, код сложнее.

## Ссылки

- Источник: https://code.claude.com/docs/en/model-config
- Ролик: https://www.youtube.com/watch?v=b9FJB3ItK8E (Claude Code: какую модель и effort выбрать)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=claude-effort
- Эта страница: https://privatekey7.github.io/links/tools/claude-effort.md
