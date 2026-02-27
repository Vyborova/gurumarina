# Дипломный проект: комплексное тестирование (Web, API)

## Описание проекта

Репозиторий содержит автоматизированные тесты для двух приложений:

- **UI:** RealWorld QA Guru — веб-платформа для создания и управления статьями с системой авторизации
- **API:** Airport Gap API — сервис для работы с аэропортами, расчёта расстояний и управления избранными

## Технологический стек

| Инструмент | Назначение |
|---|---|
| JavaScript (ES6+) | Язык разработки |
| Playwright Test | Тестовый фреймворк |
| @faker-js/faker | Генерация тестовых данных |
| dotenv | Управление переменными окружения |
| Allure Report | Отчётность |
| GitHub Actions | CI/CD |

**Паттерны проектирования:** Page Object Model, Facade, Builder, Fixtures

## Структура проекта

```
├── src/
│   ├── builders/
│   │   ├── airport.builder.js   # Билдер тестовых данных аэропорта
│   │   ├── article.builder.js   # Билдер статей
│   │   └── user.builder.js      # Билдер пользователей
│   ├── fixture/
│   │   ├── api.fixture.js       # Фикстура для API тестов
│   │   └── ui.fixture.js        # Фикстура для UI тестов
│   ├── helpers/
│   │   └── data-generator.js    # Генератор тестовых данных
│   ├── pages/                   # Page Object классы (UI)
│   └── services/
│       ├── airport.facade.js    # Фасад для Airport Gap API
│       └── airport.service.js   # Сервис запросов Airport Gap API
├── tests/
│   ├── airport-api.spec.js      # API тесты
│   └── ui.spec.js               # UI тесты
├── playwright.config.js
└── .env                         # Переменные окружения (не в репозитории)
```

## Тестируемые приложения

### UI — RealWorld QA Guru

**URL:** https://realworld.qa.guru/#/

| Сценарий |
|---|
| Авторизация пользователя |
| Создание новой статьи |
| Редактирование статьи |
| Добавление комментариев |
| Добавление статьи в избранное |
| Проверка отображения статьи в Global Feed |

### API — Airport Gap

**URL:** https://airportgap.com/api

| Сценарий |
|---|
| Получение токена авторизации |
| Получение списка аэропортов |
| Получение аэропорта по ID |
| Расчёт расстояния между аэропортами |
| Добавление аэропорта в избранное |

**Всего:** 5 UI + 5 API = 10 автоматизированных тестов

## Установка и запуск

### Требования

- Node.js 18+
- npm 8+

### Установка

```bash
git clone https://github.com/Vyborova/diplomguru.git
cd diplomguru
npm install
npx playwright install
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```
UI_BASE_URL=https://realworld.qa.guru/#/
API_BASE_URL=https://airportgap.com/api
```

### Запуск тестов

```bash
# Все тесты
npm test

# Только UI тесты
npx playwright test ui.spec.js

# Только API тесты
npx playwright test airport-api.spec.js

# Интерактивный режим (Playwright UI)
npm run ui
```

### Отчёты

```bash
# HTML отчёт Playwright
npm run report

# Генерация Allure отчёта
npm run allure:generate

# Просмотр Allure отчёта
npm run allure:open

# Allure сервер (генерация + открытие)
npm run allure:serve
```

## CI/CD

### GitHub Actions

Автоматический запуск тестов при `push` и `pull request`. Workflow включает:

- установку зависимостей и браузеров Playwright
- запуск UI и API тестов
- сохранение артефактов (отчёты, скриншоты, trace)

### Jenkins

- Запуск автотестов
- Публикация Allure Report
- Отправка уведомлений в Telegram

**Для работы уведомлений необходимо настроить:** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
