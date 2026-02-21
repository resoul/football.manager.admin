# FM Admin

Небольшой фронт для проверки админ-аутентификации в `fm-api`.

## Переменные окружения

`.env`:

```env
VITE_API_BASE_URL=http://api.fm.localhost/api/v1
```

## Запуск

```bash
npm install
npm run dev
```

## Что проверяет UI

- `POST /admin/auth/login`
- `GET /admin/auth/check`

Токен сохраняется в `localStorage` под ключом `fm-admin-auth-token`.
