# no-agent-summary

Раздел: Разное. Добавлен в базу: 2026-11-01.
Автор: Flamerix AI.

## Что делает

Заплатка против строчки статуса фоновых агентов Claude Code: она тайком съедает около 16% лимита. Плюс как снять свой замер расхода.

## Команды и шаги

```
curl -fsSL https://gist.githubusercontent.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce/raw/no-agent-summary.js -o ~/.local/share/no-agent-summary.js
claude daemon stop --any
BUN_OPTIONS="${BUN_OPTIONS:+$BUN_OPTIONS }--preload=$HOME/.local/share/no-agent-summary.js" claude
npx ccusage daily
```

Первые три строки ставят заплатку и запускают Claude Code с ней. Последняя показывает твой расход по дням, но эту строчку статуса не видит: её видно только в экспорте OpenTelemetry.

## Учти

Неофициально, только Linux и Mac. Любое обновление Claude Code может тихо её снять, проверяй после обновлений. Без заплатки помогает меньше фоновых агентов и подагентов и почаще новая сессия.

## Ссылки

- Источник: https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce
- Ролик: https://youtube.com/shorts/XQC4AC5uvBM (Кто ворует твой лимит Claude Code: три подозреваемых)
- Ролик: https://youtube.com/shorts/KlWLtYg0z4w (Claude Code тратит пятую часть лимита на строчку статуса)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=no-agent-summary
- Эта страница: https://privatekey7.github.io/links/tools/no-agent-summary.md
