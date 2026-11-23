# gpu-unlock

Раздел: Разное. Добавлен в базу: 2026-10-31.
Автор: Zagitta.

## Что делает

Модуль для Linux: снимает с игровых GeForce программное ограничение тензорных ядер, локальные нейросети читают запрос и рисуют картинки быстрее.

## Команды и шаги

```
git clone https://github.com/Zagitta/gpu-unlock && cd gpu-unlock && make install
gpu_unlock.targets=all
```

Первая команда ставит модуль. Вторую строку добавь в параметры ядра в загрузчике (для GRUB: GRUB_CMDLINE_LINUX и sudo grub-mkconfig -o /boot/grub/grub.cfg), потом перезагрузись.

## Учти

Только Linux. Стабильно на RTX 30, RTX 20 и 40 экспериментально, RTX 50 не поддерживается. Скорость печати ответа и игры не меняются. Готовым установщикам для Windows из интернета автор советует не верить.

## Ссылки

- Источник: https://github.com/Zagitta/gpu-unlock
- Ролик: https://youtube.com/shorts/PFpM-Zgsum8 (Альтман против твоей видеокарты: GeForce считает ИИ вполовину скорости)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=gpu-unlock
- Эта страница: https://privatekey7.github.io/links/tools/gpu-unlock.md
