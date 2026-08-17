# Nudge

Nudge is a productivity-focused React Native mobile app built with Expo and TypeScript. It helps users stay on track with daily goals, momentum tracking, focus sessions, analytics, and personalized theme controls.

## Highlights

- Dashboard overview with daily progress and priority actions
- Analytics and insight tracking for trend monitoring
- Task management with filters and completion states
- Profile section with user progress and achievements
- Light/dark theme switching with a custom design system
- Safe-area aware mobile layout for modern devices

## Tech Stack

- React Native + Expo
- TypeScript
- Redux Toolkit
- React Navigation
- React Native SVG
- react-native-safe-area-context
- lucide-react-native

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+
- npm or yarn
- Expo Go installed on your mobile device, or an Android/iOS emulator

## Installation

```bash
cd /Users/vinod/Documents/nudge
npm install
```

## Run the app

Start the Expo development server:

```bash
npm start
```

Then run one of the following:

```bash
npm run android
npm run ios
npm run web
```

## Available scripts

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

The `lint` script runs a TypeScript check:

```bash
npx tsc --noEmit
```

## Project structure

```text
.
├── App.tsx
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   ├── features/
│   ├── navigation/
│   ├── services/
│   ├── store/
│   ├── theme/
│   ├── types/
│   └── utils/
└── README.md
```

## Notes

This project uses a custom Stitch-inspired theme system and a tab-based navigation flow. The layout is designed to work across dynamic light/dark modes and device safe areas while maintaining a polished mobile-first experience.

## License

This project is currently for internal development and has no formal open-source license assigned yet.
