# Modern Web Guidance: агент пишет современный веб-код

Раздел: Скиллы. Добавлен в базу: 2026-11-17.
Автор: Google Chrome, Microsoft Edge, Mozilla Firefox, MDN.

## Что делает

Навык для кодовых агентов: когда агент пишет веб-код, он подтягивает актуальные приёмы платформы вместо старого JavaScript. Команда legacy-scan проходит по проекту и показывает, где костыли можно заменить возможностями браузера. Примеры замен: AOS и ScrollReveal на CSS Scroll-Driven Animations, react-wrap-balancer на text-wrap: balance, автоподгонка textarea через scrollHeight на field-sizing: content.

## Команды и шаги

```
npx modern-web-guidance@latest install
npx modern-web-guidance@latest legacy-scan .
```

Нужен Node.js 22 или новее. Команда legacy-scan проверяет примерно пятую часть каталога руководств (35 правил), это не полный аудит.

## Учти

Часть рекомендуемых возможностей пока работает только в Chrome, проверяй совместимость. Прирост с 57 до 88 процентов измерили сами авторы.

## Ссылки

- Источник: https://github.com/GoogleChrome/modern-web-guidance
- Ролик: https://youtube.com/shorts/MRtcA_fVpTY (ИИ-агент до сих пор пишет сайты как в 2019 году)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=modern-web-guidance
- Эта страница: https://privatekey7.github.io/links/tools/modern-web-guidance.md
