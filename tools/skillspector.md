# SkillSpector: сканер скиллов от NVIDIA

Раздел: Безопасность. Добавлен в базу: 2026-11-24.
Автор: NVIDIA.

## Что делает

Исследование 31 тысячи скиллов: в 26 % уязвимости, у 5,2 % признаки злого умысла. Сканер до установки ищет скрытые команды, кражу токенов и отправку данных наружу. Оценка: 0–20 SAFE, 21–50 CAUTION, 51–100 DO NOT INSTALL.

## Команды и шаги

```
uv tool install --python 3.13 git+https://github.com/NVIDIA/skillspector.git
skillspector scan https://github.com/<автор>/<скилл>
skillspector scan https://github.com/<автор>/<скилл> --no-llm
```

Нужен uv. --no-llm проверяет без ключей и модели. Красные флаги и без сканера: «скачай и запусти», «вставь команду в терминал», архив с паролем.

## Учти

Красный свет это датчик дыма, а не приговор: бывает, ругается на безобидные слова. Открой код и посмотри, куда уходят данные.

## Ссылки

- Источник: https://github.com/NVIDIA/SkillSpector
- Ролик: https://youtube.com/shorts/zLgskttysZk (Каждый 20-й скилл для ИИ-агентов похож на вредоносный)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=skillspector
- Эта страница: https://privatekey7.github.io/links/tools/skillspector.md
