# 🧱 Sanskrit Garden Tech Stack Overview

This document provides a comprehensive overview of the technologies used to build and run the Sanskrit Garden application, along with how these tools integrate across the frontend, backend, and infrastructure.

---

## 🌐 Frontend

### Remix

- **Why**: A full-stack web framework optimized for server-rendered React apps. Provides built-in routing, loaders/actions, and great developer ergonomics.
- **Usage**: All routing and page composition are done using Remix file-based routes (`app/routes/`).

### React + TypeScript

- **Why**: React provides modular UI components, while TypeScript improves safety and developer confidence.
- **Usage**: All components in `app/components/` and route logic are typed with TypeScript.

---

## 🔥 Backend and Auth

### Firebase Authentication

- **Why**: Secure, scalable identity provider that integrates seamlessly with Firebase Admin SDK.
- **Usage**: Users log in via `signInWithEmailAndPassword`. Tokens are verified on the server (`auth.server.ts`) using Firebase Admin SDK.

### Firebase Admin SDK

- **Why**: Used on the server to verify ID tokens and manage claims for authorization.
- **Usage**: Called within Remix loaders/actions to enforce access control.

---

## ☁️ Hosting & Deployment

### Firebase Hosting + Cloud Run

- **Why**: Reliable hosting with minimal setup, supports SSR apps via Cloud Run or Cloud Functions.
- **Usage**: Deployment configuration is defined in `apphosting.yaml` and `firebase.json`.

### Environment Variables

- Managed through `apphosting.yaml`, with secrets injected using Firebase-managed runtime environment variables.
- `VITE_` prefix is used for variables exposed to the browser (e.g., Firebase client config).
- Secure server-only vars (e.g., `OPENAI_API_KEY`) are unprefixed.

---

## 🤖 AI Integration

### OpenAI API

- **Why**: Power generative features like the Concept Explainer and Storyteller.
- **Usage**: Server-only integration in `lib/openai.server.ts`, using `OPENAI_API_KEY` to access GPT models.

---

## 🎨 Styling

### Tailwind CSS

- **Why**: Utility-first styling system that enables rapid UI development.
- **Usage**: Styling is done inline using class names. Config in `tailwind.config.ts`.

---

## 🧪 Testing

### Jest (currently)

- **Why**: Used for unit testing key components.
- **Usage**: Tests live alongside components in `*.test.tsx`.

### Vitest (planned)

- Migration target for faster, Vite-native testing and DX improvements.

---

## ⚙️ Development Tooling

- **pnpm**: Fast, disk-efficient package manager.
- **Vite**: Lightning-fast dev server and bundler.
- **GitHub Actions**: CI pipeline for linting and testing.
- **Storybook (planned)**: Isolated component development and design system documentation.
- **ESLint + Prettier**: Enforce consistent code style.

---

## 🔄 Data & Scripts

- `scripts/`: Contains utilities for backup, claim setting, and data conversion.
- `data/`: Static JSON and test fixtures for dhatus, verbs, and texts.
