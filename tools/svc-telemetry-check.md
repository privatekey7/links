# Проверка на бэкдор svc-telemetry

Раздел: Безопасность. Добавлен в базу: 2026-11-03.
Автор: Cursor.

## Что делает

Одна команда показывает, задел ли тебя подменённый Claude Code 2.1.312 и 2.1.313 из магазина Cursor (29.10.2026).

## Команды и шаги

```
grep -qs svc-telemetry ~/.ssh/authorized_keys && echo "svc-telemetry key found" || echo "No key found; machine not impacted"
$files = "$HOME\.ssh\authorized_keys", "C:\ProgramData\ssh\administrators_authorized_keys" | Where-Object { Test-Path $_ }
if ($files -and (Select-String svc-telemetry $files)) { "svc-telemetry key found" } else { "No key found; machine not impacted" }
```

Первая команда для Mac (Терминал), вторая для Windows (PowerShell). «svc-telemetry key found» значит, задело: скачай скрипт очистки со страницы Cursor и смени пароли и токены с другого компьютера.

## Учти

Удалить расширение мало: скрипты автозапуска остаются. Задело только тех, кто ставил или обновлял расширение в Cursor 29.10.

## Ссылки

- Источник: https://cursor.com/blog/claude-code-extension-security-notice
- Ролик: https://youtube.com/shorts/erivEU55LD4 (Claude Code в магазине Cursor подменили: проверь компьютер одной командой)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=svc-telemetry-check
- Эта страница: https://privatekey7.github.io/links/tools/svc-telemetry-check.md
