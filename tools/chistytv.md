# ЧистыйТВ

Раздел: Телевизор. Добавлен в базу: 2026-10-29.
Автор: by-sonic (Никита Гниденко).

## Что делает

Скрипт для Windows убирает рекламу и мусор с Яндекс ТВ, Салют ТВ, Xiaomi, TCL и других Android TV по Wi-Fi, с откатом.

## Команды и шаги

```
irm https://raw.githubusercontent.com/by-sonic/chistytv/main/chistytv.ps1 | iex
https://github.com/by-sonic/chistytv/blob/main/docs/ADB.md
https://github.com/by-sonic/chistytv/releases/latest/download/ChistyTV.apk
```

Сначала включи отладку на телевизоре (вторая ссылка), потом запусти первую строку в PowerShell на компе в той же Wi-Fi сети. Третья ссылка: версия для телефона.

## Учти

Проверено автором на одном Xiaomi. После обновления прошивки Яндекс ТВ реклама возвращается, запусти ещё раз. В сервисном меню Яндекс ТВ трогай только ADB Mode.

## Ссылки

- Источник: https://github.com/by-sonic/chistytv
- Ролик: https://youtube.com/shorts/w-ICc91lMv0 (Яндекс ТВ без рекламы одной строчкой)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=chistytv
- Эта страница: https://privatekey7.github.io/links/tools/chistytv.md
