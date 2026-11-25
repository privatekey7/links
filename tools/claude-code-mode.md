# Code Mode в Claude Code

Раздел: Агенты. Добавлен в базу: 2026-11-25.
Автор: Anthropic.

## Что делает

Вместо десятка шагов по одному Claude сразу пишет маленький скрипт и гоняет всё разом. У Flavio Copes та же задача заняла 15 секунд вместо 35 и меньше места в контексте. Ctrl+O покажет код, который он написал.

## Команды и шаги

```
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
$env:CLAUDE_CODE_EXPERIMENTAL_CODE_MODE = "1"
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "1"
  }
}
```

Нужна версия 2.1.323+ (claude --version, иначе claude update). Первое: разово в bash, второе: PowerShell (потом claude), третье: насовсем в ~/.claude/settings.json.

## Учти

Экспериментальный: только интерактивный терминал (не -p, не VS Code, не десктоп), не стартует с DISABLE_TELEMETRY, могут поменять в любой версии.

## Ссылки

- Источник: https://code.claude.com/docs
- Ролик: https://youtube.com/shorts/duKQ07GPfL8 (Одна строка, и Claude Code делает задачу вдвое быстрее)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=claude-code-mode
- Эта страница: https://privatekey7.github.io/links/tools/claude-code-mode.md
