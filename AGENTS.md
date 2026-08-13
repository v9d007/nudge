# Project Agent Rules — Nudge Mobile App

## Tech Stack & Core Framework
- **Framework**: React Native with **Expo (SDK 51+)**.
- **Navigation**: **React Navigation v6/v7** (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`).
- **Language**: **TypeScript** (Strict mode enabled, strict type checking).
- **Styling**: **Pure React Native `StyleSheet` API** with Stitch "Lumina Productivity" Design Tokens.
  - No Tailwind CSS or external CSS transformers.
  - Never hardcode color hex values directly in component files.
  - Use exact Stitch design tokens from `src/theme/colors.ts` and Redux theme state.
  - Support both **Dark** (Default Stitch Glassmorphism) and **Light** theme modes dynamically.
- **Animations & Micro-interactions**: **React Native Reanimated 3** and `react-native-gesture-handler`.
- **Charts & Data Visualization**: GPU-accelerated graphics using `react-native-svg` with smooth animated progress rings.
- **State & Data Layer**:
  - **Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)** for global application state (theme state, metrics, user session, nudge items, analytics data).
  - Modular service abstraction layer to accommodate REST, GraphQL, or Firebase backend engines.

## Stitch Lumina Productivity Design System Tokens
- **Background**: `#15121b` (Dark Surface Base) / `#F8FAFC` (Light Base)
- **Primary Action (Purple Gradient)**: `#7c3aed` (Container), `#d2bbff` (Text/Accent), `#3f008e` (On Primary)
- **Secondary (Teal Success)**: `#44e2cd` / `#03c6b2` (Task Completed & Success States)
- **Tertiary (Amber Accent)**: `#fbbc06` / `#846100` (Streak & Priority Alerts)
- **Card Containers (Elevated Glass)**: `#221e28` (Container), `#2c2833` (High Container), `#37333e` (Highest), Border: `#4a4455`
- **Typography**: `#e8dfee` (Primary Text), `#ccc3d8` (Secondary Text), `#958da1` (Muted/Outline)
- **Shapes & Radius**: `24px` for Container/Cards, `16px` for Buttons/Inputs, `9999px` for Pills

## Architectural Guidelines
- **Folder Structure**: Clean Architecture with feature-based organization.
  ```text
  src/
    ├── navigation/         # React Navigation stack and tab configurators
    │   ├── AppNavigator.tsx
    │   ├── TabNavigator.tsx
    │   └── types.ts
    ├── components/         # Reusable UI primitives (Button, Card, ProgressRing, StatCard)
    ├── features/           # Feature modules
    │   ├── dashboard/      # Metrics, progress ring widgets, quick actions
    │   └── analytics/      # Performance charts, trend graphs, timeframe filters
    ├── services/           # API integration contracts (REST, GraphQL, Firebase adapters)
    ├── store/              # Redux Toolkit slices and store configuration
    │   ├── store.ts
    │   ├── themeSlice.ts
    │   ├── dashboardSlice.ts
    │   └── analyticsSlice.ts
    ├── theme/              # Stitch color palettes, typography, spacing tokens
    ├── types/              # Domain models & TypeScript interfaces
    └── utils/              # Formatting helpers
  App.tsx                   # Root entry point with Redux Provider & NavigationContainer
  ```

## Quality & Execution Rules
- **Pure StyleSheet**: Use React Native `StyleSheet.create` for all components.
- **Component Isolation**: Keep UI components modular, accessible, and fluidly responsive across screen sizes.
- **Performance**: Execute animations on the native UI thread using Reanimated. Avoid main thread JS bottlenecks.
- **Verification**: Run type checking (`tsc --noEmit`) before completing tasks.
