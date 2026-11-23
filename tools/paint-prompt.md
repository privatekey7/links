# Промпт: Claude рисует в Paint мышкой

Раздел: Промпты. Добавлен в базу: 2026-11-20.
Автор: опыт u/wollymonjac (Reddit), шаблон промпта usecases.sh.

## Что делает

Claude в приложении для компьютера сам открывает Paint, пробует кисти и рисует картину мышкой слоями, проверяя холст скриншотом после каждой партии мазков. У автора вышла рождественская улица за 2,5 часа.

## Команды и шаги

```
Через управление компьютером открой [Paint или другую простую рисовалку] и нарисуй [детальную сцену, например заснеженную улицу в сумерках]. Без картинки-образца. Сначала попробуй каждую кисть и размер на черновом месте и посмотри, какой след они оставляют. Потом спланируй картину слоями, от фона к деталям. Каждый слой рисуй короткими скриптами движения мыши и после каждого скрипта делай скриншот, чтобы проверить холст. Остановись и покажи холст после [число] слоёв или если расход превысит [бюджет], в конце сохрани файл как [имя].
Using computer use, open [MS Paint or another simple paint app] and paint [a detailed scene, e.g. a snowy street at dusk]. Do not use any reference image. First test each brush and size on a scratch area and look at the marks they leave. Then plan the picture in layers from background to detail. Draw each layer by writing short mouse-movement scripts, and take a screenshot after every script to check the canvas before the next one. Stop and show me the canvas after [number] layers or if the cost passes [budget], and save the file as [filename] when done.
```

Нужно приложение Claude для компьютера с включённым управлением компьютером. Пока он рисует, мышь занята. Эксперименты: Paint https://www.reddit.com/r/ClaudeAI/comments/1xvghd1/, рука-робот с акварелью https://www.reddit.com/r/Anthropic/comments/1xwr5r3/

## Учти

Долго и дорого: у автора 2,5 часа и около $45 по ценам API. Ставь лимит в промпте.

## Ссылки

- Источник: https://usecases.sh/use-case/paint-a-detailed-scene-in-ms-paint-by-driving-the-mouse-with-computer-use
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=paint-prompt
- Эта страница: https://privatekey7.github.io/links/tools/paint-prompt.md
