# HandsWork App

**React Native приложение для поиска подработки с геолокацией**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![MobX](https://img.shields.io/badge/MobX-6.13.7-orange.svg)](https://mobx.js.org/)

> Мобильное приложение для поиска временной работы с использованием геолокации. Полная архитектура с MobX, TypeScript и React Navigation.

## Функциональность

- **Геолокация** - Автоматическое определение местоположения пользователя
- **Список смен** - Загрузка доступных подработок в текущем городе
- **Карточки смен** - Краткая информация с рейтингом и оплатой
- **Детали смены** - Подробная информация о работодателе и условиях
- **Pull-to-refresh** - Обновление списка потягиванием вниз
- **Real-time** - Актуальная информация о количестве мест

## Технологический стек

- **React Native 0.81.4** - Кроссплатформенная разработка без Expo
- **TypeScript 5.8.3** - Статическая типизация для надёжности кода
- **MobX 6.13.7** - Реактивное управление состоянием
- **React Navigation 6** - Нативная навигация между экранами
- **Geolocation Service** - Работа с GPS и разрешениями

## Архитектура проекта

```
src/
├── screens/          # Экраны приложения
│   ├── ShiftListScreen.tsx     # Список смен с геолокацией
│   └── ShiftDetailScreen.tsx   # Детальная информация о смене
├── stores/           # MobX управление состоянием
│   ├── ShiftStore.ts          # Центральный стор смен
│   └── index.ts               # Экспорт сторов
├── components/       # Переиспользуемые компоненты
│   └── ShiftCard.tsx          # Карточка смены в списке
├── services/         # Внешние сервисы
│   ├── api.ts                 # HTTP клиент для API
│   └── location.ts            # GPS и разрешения
├── types/           # TypeScript интерфейсы
│   └── index.ts               # Типы данных
└── navigation/      # Навигация
    └── AppNavigator.tsx       # React Navigation стек
```

## Установка и запуск

### Требования

- Node.js 18+
- React Native CLI
- Android Studio (для Android)
- Xcode (для iOS, только macOS)

### Установка зависимостей

```bash
cd hands-work-app
npm install
```

### Настройка iOS (только macOS)

```bash
cd ios && pod install && cd ..
```

### Запуск на Android

```bash
npx react-native run-android
```

### Запуск на iOS

```bash
npx react-native run-ios
```

## API

Приложение использует API: `https://mobile.handswork.pro/api/shift?lat={latitude}&lng={longitude}`

### Поля данных смены:

- `logo` - ссылка на логотип нанимателя
- `address` - адрес проведения смены
- `companyName` - имя компании нанимателя
- `dateStartByCity` - дата начала смены
- `timeStartByCity` - время начала
- `timeEndByCity` - время окончания
- `currentWorkers` - сколько людей уже набрано
- `planWorkers` - сколько людей требуется
- `workTypes` - наименование типа услуги
- `priceWorker` - сумма выплаты за смену (в рублях)
- `customerFeedbacksCount` - количество отзывов о клиенте
- `customerRating` - рейтинг нанимателя (максимум 5)

## Ключевые особенности

### Архитектура

- **Clean Architecture** - четкое разделение слоёв (UI → Store → Service → API)
- **MVVM паттерн** - с MobX в качестве ViewModel слоя
- **Dependency Injection** - через централизованный экспорт сторов
- **Type Safety** - полная типизация TypeScript для предотвращения ошибок

### Производительность

- **Lazy Loading** - компоненты загружаются по требованию
- **Observer Pattern** - автоматическое обновление только изменённых компонентов
- **FlatList оптимизация** - эффективный рендеринг больших списков
- **Error Boundaries** - graceful обработка ошибок

### UX/UI

- **Material Design** - современный дизайн с карточками и shadows
- **Адаптивность** - корректное отображение на разных размерах экранов
- **Accessibility** - поддержка screen readers и навигации
- **Loading States** - информативные индикаторы состояния загрузки

## Документация

- [`docs/GUIDE.md`](docs/GUIDE.md) - руководство по запуску и архитектуре
- [`docs/architecture-diagram.md`](docs/architecture-diagram.md) - Mermaid схемы архитектуры

## Для работодателей

Этот проект демонстрирует:

- **Современный React Native** - актуальные версии без устаревших подходов
- **Архитектурное мышление** - правильная организация кода и разделение ответственности
- **TypeScript экспертиза** - полная типизация без any и правильные интерфейсы
- **State Management** - эффективное использование MobX для реактивности
- **API интеграция** - работа с REST API, обработка ошибок, loading states
- **Нативные возможности** - геолокация, разрешения, платформо-специфичная логика
- **Production Ready** - обработка edge cases, error boundaries, graceful fallbacks

### Время разработки: ~6 часов

Включая полную архитектуру, документацию и тестирование функциональности.

---

**Контакты**: [GitHub](https://github.com/illiaGoncharov)
**Статус**: Готов к собеседованию и обсуждению технических решений
