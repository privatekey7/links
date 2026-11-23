# ub-mode, режим Дяди Боба

Раздел: Скиллы. Добавлен в базу: 2026-11-05.
Автор: Robert C. Martin (Uncle Bob).

## Что делает

Скилл для Claude Code от автора «Чистого кода»: сначала тест, потом код, а качество проверяют три его инструмента: сложность функций, повторы кода и тесты на прочность через мутации.

## Команды и шаги

```
mkdir -p ~/.claude/skills/ub-mode && curl -fsSL https://raw.githubusercontent.com/unclebob/ub-mode/master/SKILL.md -o ~/.claude/skills/ub-mode/SKILL.md
git clone https://github.com/unclebob/crapper && git clone https://github.com/unclebob/dryer && git clone https://github.com/unclebob/mutator
/ub-mode
```

Проверки клонируй в одну папку рядом друг с другом: mutator берёт имена функций из ../crapper. Первый запуск каждой сам ставит .venv. Языки: Python, TypeScript, Go, Rust, Java, Clojure.

## Учти

Без трёх проверок скилл остаётся набором правил на словах. Мутации на большом проекте идут долго: начинай с одного файла.

## Ссылки

- Источник: https://github.com/unclebob/ub-mode
- Ролик: https://youtube.com/shorts/LUABNbTkETs (Дядя Боб выложил свой режим для Claude Code)
- Карточка в Telegram: https://t.me/privatekey_ai_bot/base?startapp=ub-mode
- Эта страница: https://privatekey7.github.io/links/tools/ub-mode.md
