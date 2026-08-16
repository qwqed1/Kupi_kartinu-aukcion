# Kupi Kartinu — онлайн-аукцион картин

Стартовый монорепозиторий проекта. Сейчас активная разработка ведётся во frontend; WordPress и пространство backend подготовлены для следующих этапов.

## Структура

```text
apps/
  frontend/   Next.js, TypeScript, App Router, Tailwind CSS
  wordpress/  WordPress-админка и MariaDB в Docker
  backend/    место для будущего API (стек пока не выбран)
docs/         архитектурные решения и проектная документация
```

## Быстрый старт frontend

Требования: Node.js 22+ и npm 10+.

```powershell
Copy-Item apps/frontend/.env.example apps/frontend/.env.local
npm run dev
```

Приложение откроется на <http://localhost:3000>.

## WordPress (когда понадобится)

Требуется Docker Desktop. Сначала скопируйте `apps/wordpress/.env.example` в `apps/wordpress/.env` и замените все тестовые пароли на свои случайные значения, затем выполните:

```powershell
npm run wordpress:up
```

WordPress будет доступен только локально на <http://localhost:8080>. Остановка: `npm run wordpress:down`.

## Правила окружения

- Настоящие `.env`-файлы и пароли не коммитятся.
- Публичные переменные Next.js должны начинаться с `NEXT_PUBLIC_`; секреты — никогда.
- Backend не привязан к фреймворку до отдельного архитектурного решения.
- Для новых решений добавляйте короткую запись в `docs/decisions/`.

