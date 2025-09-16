# hands-work-app — Руководство

## Что это

React Native приложение для поиска подработки с геолокацией.

**Стек:** React Native + TypeScript + MobX + React Navigation

## Быстрый запуск

### Установка

```bash
git clone https://github.com/illiaGoncharov/hands-work-app.git
cd hands-work-app
npm install
cd ios && pod install && cd ..
```

### Запуск на iOS

```bash
npx react-native run-ios
```

### Если симулятор не работает

1. Откройте Xcode
2. `Xcode` → `Preferences` → `Platforms`
3. Установите iOS Simulator
4. Или запустите через Xcode: `open ios/HandsWorkApp.xcworkspace`

## Архитектура

```
UI (Screens)
    ↓
MobX Store
    ↓
Services (API + Location)
    ↓
External APIs
```

### Файлы

- `src/screens/` - экраны (список и детали смен)
- `src/stores/ShiftStore.ts` - состояние приложения
- `src/services/` - API и геолокация
- `src/components/ShiftCard.tsx` - карточка смены

## Что делает приложение

1. **Запрашивает геолокацию** при запуске
2. **Загружает смены** с API по координатам
3. **Показывает список** с краткой информацией
4. **Открывает детали** при клике на карточку

## Для работодателей

Проект демонстрирует:

- Современный React Native (без Expo)
- TypeScript типизацию
- MobX state management
- Навигацию и архитектуру
- API интеграцию
- Нативные возможности (геолокация)

**Время разработки:** ~6 часов с полной документацией.

## Диаграммы архитектуры

Смотрите в файле [architecture-diagram.md](./architecture-diagram.md) - откройте на GitHub для автоматического отображения Mermaid схем.
