# Futurist OS Landing Page

Одностраничное Vue приложение для продвижения Futurist OS Chat. Сайт поддерживает русский и английский языки в зависимости от конфигурации, предоставляемой через Nginx.

## Архитектура проекта

### Технологический стек
- **Vue 3** с TypeScript
- **Vite** для сборки и разработки
- **Vue Router** для маршрутизации
- **Anime.js** для анимаций
- **Nginx** для продакшн-сервера
- **Docker** для контейнеризации

### Структура проекта

```
src/
├── modules/landing/        # Компоненты лендинга
│   ├── components/         # Секции страницы (Hero, Features, Footer и т.д.)
│   └── pages/              # Страницы
├── composables/            # Vue композаблы (useAppLanguage, useChatWidget)
├── config/                 # Конфигурация приложения
├── constants/              # Константы и ключи для dependency injection
├── i18n/                   # Интернационализация (переводы и промпты)
├── router/                 # Маршрутизация
├── utils/                  # Утилиты (перехватчик инструкций)
└── ui/                     # Переиспользуемые UI компоненты
```

## Как это работает

### 1. Загрузка конфигурации языка

При запуске приложение загружает `/config.json` (без кеширования) для определения языка интерфейса:

```json
{ "lang": "ru" }
```

Поддерживаемые значения: `ru` и `en`. Если запрос не удался, используется значение из переменной окружения `VITE_DEFAULT_LANG` (по умолчанию `ru`).

**Процесс загрузки:**
1. `main.ts` вызывает `loadAppConfig()` из `src/config/appConfig.ts`
2. Запрос к `/config.json` выполняется с заголовком `cache: 'no-store'`
3. Язык применяется к `document.documentElement.lang`
4. Язык передается через Vue provide/inject во все компоненты

### 2. Чат-виджет

Чат-виджет (`<chat-widget>`) встроен в `App.vue` и отображается только на главной странице (`/`).

**Особенности:**
- Атрибуты виджета реактивны и зависят от языка
- Приветственное сообщение и имя бота берутся из `src/i18n/landingContent.ts`
- Все запросы к `/api/message` перехватываются в `src/utils/instructionInterceptor.ts`
- Каждый запрос автоматически получает правильный системный промпт (русский или английский)

**Перехватчик инструкций:**
- Перехватывает `fetch` и `XMLHttpRequest` запросы к `/api/message`
- Автоматически добавляет поле `instruction` в тело запроса
- Инструкция загружается из `src/i18n/prompts/widget.{lang}.txt`
- Обновляется при смене языка

### 3. Интернационализация

**Контент лендинга:**
- Хранится в `src/i18n/landingContent.ts`
- Используется через композабл `useLandingContentSection()`

**Системные промпты:**
- Хранятся в `instructions.yml` с метаданными
- Текстовые файлы: `src/i18n/prompts/widget.ru.txt` и `widget.en.txt`
- Используются виджетом через перехватчик инструкций

### 4. Сборка и деплой

**Разработка:**
- Vite dev server на порту 5173 (по умолчанию)
- Hot Module Replacement (HMR)
- Используется `public/config.json` для локальной разработки

**Продакшн:**
- Multi-stage Docker build:
  1. `deps` — установка зависимостей (`npm ci`)
  2. `builder` — сборка проекта (`npm run build`)
  3. `runner` — Nginx с собранными файлами из `/dist`
- Nginx конфигурация в `docker/nginx.conf`:
  - SPA routing (fallback на `index.html`)
  - Кеширование статических ресурсов (1 год)
  - Без кеширования для `index.html`

## Как запустить

### Локальная разработка

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Запустите dev server:**
   ```bash
   npm run dev
   ```

3. **Откройте браузер:**
   ```
   http://localhost:5173
   ```

4. **Измените язык для разработки:**
   Отредактируйте `public/config.json`:
   ```json
   { "lang": "en" }
   ```

### Продакшн сборка

1. **Соберите проект:**
   ```bash
   npm run build
   ```

2. **Результат в папке `/dist`**

3. **Для локального просмотра:**
   ```bash
   npm run preview
   ```

### Запуск через Docker

1. **Соберите образ:**
   ```bash
   docker build -t futurist-land .
   ```

2. **Запустите контейнер:**
   ```bash
   docker run -p 3001:80 futurist-land
   ```

3. **Откройте браузер:**
   ```
   http://localhost:3001
   ```

### Запуск через Docker Compose

1. **Создайте `.env` файл (если нужно):**
   ```bash
   HOST_PORT=3001
   ```

2. **Запустите стек:**
   ```bash
   docker compose up -d
   ```

3. **Проверьте статус:**
   ```bash
   docker compose ps
   ```

4. **Просмотр логов:**
   ```bash
   docker compose logs -f web
   ```

### Деплой на удаленный сервер

Используйте скрипт `deploy.sh`:

```bash
./deploy.sh
```

**Настройка через переменные окружения:**
```bash
SSH_USER=deploy \
SSH_HOST=your-server.com \
SSH_PORT=22 \
HOST_PORT=3001 \
./deploy.sh
```

**Что делает скрипт:**
1. Создает удаленную директорию (если не существует)
2. Синхронизирует код через `rsync` (исключая `node_modules`, `dist`, `.git`)
3. Копирует `.env.example` → `.env` на сервере (если `.env` не существует)
4. Собирает Docker образы на удаленном сервере
5. Перезапускает Docker Compose стек

## Настройка Nginx для продакшн

Для каждого домена необходимо настроить `/config.json` с правильным языком:

```nginx
server {
    listen 80;
    server_name futurist.ru;

    root /usr/share/nginx/html;
    index index.html;

    # Возвращаем русский язык
    location = /config.json {
        add_header Content-Type application/json;
        return 200 '{"lang":"ru"}';
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name futurist.com;

    root /usr/share/nginx/html;
    index index.html;

    # Возвращаем английский язык
    location = /config.json {
        add_header Content-Type application/json;
        return 200 '{"lang":"en"}';
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Переменные окружения

- `VITE_DEFAULT_LANG` — язык по умолчанию (если `/config.json` недоступен), значения: `ru` или `en`
- `VITE_CHAT_WIDGET_ENDPOINT` — URL эндпоинта для чат-виджета
- `VITE_CHAT_WIDGET_THEME` — тема виджета
- `HOST_PORT` — порт хоста для Docker Compose (по умолчанию `3001`)

## Полезные команды

```bash
# Разработка
npm run dev          # Запуск dev server
npm run build        # Продакшн сборка
npm run preview      # Просмотр собранного проекта

# Docker
docker compose up -d              # Запуск в фоне
docker compose down               # Остановка
docker compose logs -f web       # Логи контейнера
docker compose ps                 # Статус контейнеров
docker compose restart web        # Перезапуск контейнера

# Деплой
./deploy.sh                      # Деплой на сервер по умолчанию
SSH_HOST=example.com ./deploy.sh # Деплой на другой сервер
```

## Структура маршрутов

- `/` — главная страница (лендинг с чат-виджетом)
- `/test` — тестовая страница

## Дополнительная информация

- Чат-виджет загружается из внешнего скрипта (`public/chat-widget.js`)
- Виджет регистрируется как custom element `<chat-widget>`
- Vue настроен на игнорирование custom elements с префиксом `chat-widget`
- Все запросы виджета автоматически получают системные инструкции на нужном языке
