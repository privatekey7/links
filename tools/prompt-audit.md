# Аудит CLAUDE.md: /doctor prompt-audit

Раздел: Агенты. Добавлен в базу: 2026-11-23.
Автор: Anthropic, промпт Alex Albert.

## Что делает

Flavio Copes считал свою инструкцию на 107 строк нормальной, а команда нашла в ней 10 проблем: пути, которых нет, противоречия и правила под старые модели. Даёт отчёт и diff, сам ничего не меняет, пока не попросишь.

## Команды и шаги

```
/doctor prompt-audit
/doctor prompt-audit CLAUDE.md
Read this entire project and find everything that's broken, inconsistent, inefficient, or no longer needed. Fix what you're sure about and list the rest for me to review.
```

Нужна версия 2.1.283+ (claude --version). Один файл проверяется около минуты. Третье: промпт Alex Albert из Anthropic на каждую новую модель, он правит сразу, поэтому сначала отдельная ветка git.

## Учти

Если в репо есть и CLAUDE.md, и AGENTS.md: Claude Code читает только CLAUDE.md, добавь в него строку @AGENTS.md.

## Ссылки

- Источник: https://code.claude.com/docs
- Ролик: https://youtube.com/shorts/DDg1Ev3F5I0 (Одна команда нашла 10 ошибок в его CLAUDE.md)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=prompt-audit
- Эта страница: https://privatekey7.github.io/links/tools/prompt-audit.md
