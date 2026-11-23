# Socratic Tutor: ИИ-репетитор без готовых ответов

Раздел: Скиллы. Добавлен в базу: 2026-11-16.
Автор: Jane Street.

## Что делает

Текстовый навык: включает в Claude Code или в обычном чате режим строгого репетитора. Сначала 3-5 вопросов, чтобы понять твой уровень, дальше только вопросы по одному, без подсказок и готовых ответов, карта навыков с уровнями от 0 до 5 и итоговая проверка.

## Команды и шаги

```
git clone https://github.com/janestreet/agent_skills
Скопируй папку agent_skills/socratic-tutor в ~/.claude/skills/ (Windows: %USERPROFILE%\.claude\skills\)
teach me <тема>
В обычном чате: вставь текст из socratic-tutor/SKILL.md, ниже допиши: teach me <тема>
В диалоге: show progress, harder, easier, just tell me, save state
```

Обычный вопрос «что такое X» навык не запускает, он нужен именно для обучения. Команда just tell me отключает режим на один вопрос. Запускающая фраза английская, русский вариант не проверен.

## Учти

Навык простой текст, выигрыш зависит от модели. Часть пользователей на Hacker News пишет, что похожий результат даёт одна строка промпта.

## Ссылки

- Источник: https://github.com/janestreet/agent_skills
- Ролик: https://youtube.com/shorts/5Wsb5mUN4Gs (Просишь ИИ объяснить тему, а он гоняет тебя вопросами)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=socratic-tutor
- Эта страница: https://privatekey7.github.io/links/tools/socratic-tutor.md
