# Проверка: не утекли ли секреты из .claude/settings.local.json

Раздел: Безопасность. Добавлен в базу: 2026-11-17.
Автор: Apiiro (Shmulik Cohen и Matan Giladi), шаги проверки по их рекомендациям.

## Что делает

Claude Code при «Yes, and don't ask again» может сохранить команду вместе с паролем в файл .claude/settings.local.json. Apiiro нашла 1 122 таких файла с секретами в публичных репозиториях GitHub. Три команды показывают, не попал ли такой файл в твой репозиторий.

## Команды и шаги

```
git ls-files .claude
git log --all --oneline -- .claude/settings.local.json .claude/settings.json
grep -nE 'PGPASSWORD=|sshpass -p|mysql .*-p|[Bb]earer |://[^/:@ ]+:[^@ ]+@' .claude/settings.local.json .claude/settings.json
git rm --cached .claude/settings.local.json
```

Нашёл файл: сначала смени пароль или ключ в самом сервисе, потом чисти файл. История и форки хранят старые копии. Последнюю команду запускай, только если файл закоммичен, и добавь его в .gitignore проекта.

## Учти

Пустой результат не гарантия: секрет без привычного формата grep может не поймать.

## Ссылки

- Источник: https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html
- Ролик: https://youtube.com/shorts/Gnf4YZHKjlA («Больше не спрашивать» в Claude Code сливает пароли на GitHub)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=settings-local-check
- Эта страница: https://privatekey7.github.io/links/tools/settings-local-check.md
