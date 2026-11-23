# Чёрный октябрь: источники

Раздел: Безопасность. Добавлен в базу: 2026-11-04.
Автор: Wiz, MATT Research.

## Что делает

Разбор октябрьской волны: девять платформ для разработчиков (Railway, OpenCode, Warp, Fireworks AI и другие) взломали ради сохранённых ключей от нейросетей. Плюс PHP2Shell, заражённый LiteLLM 1.107.0 и слабые ключи eMudhra.

## Команды и шаги

```
https://www.wiz.io/blog/php2shell-php-rce
https://blog.railway.com/p/preliminary-report-october-security-incident
https://docs.litellm.ai/blog/security-incident-oct-21-2026
https://blog.cloudflare.com/emudhra-certificate-compromise
```

Сверху вниз: PHP2Shell, Railway, LiteLLM, eMudhra. Хранил ключ на Railway до 21.10: перевыпусти его и поставь лимит трат у провайдера.

## Учти

Массовых взломов через PHP2Shell на 03.11 не подтверждено, но PHP всё равно обнови до 8.2.35, 8.3.36, 8.4.27 или 8.5.12.

## Ссылки

- Источник: https://www.matt.security/blog/black-october-ai-developer-platforms
- Ролик: https://youtube.com/shorts/9GR13LDMnOI (ИИ не положил интернет: сверил факты «Чёрного октября»)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=black-october
- Эта страница: https://privatekey7.github.io/links/tools/black-october.md
