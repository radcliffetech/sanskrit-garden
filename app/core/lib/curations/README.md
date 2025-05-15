# 🧠 Curations Framework

This module provides a scalable, AI-integrated pipeline for creating, reviewing, and deploying structured data objects — such as Sanskrit noun entries, verb paradigms, dad jokes, or any other repeatable format.

---

## 🧱 Architecture Overview

Each curation domain (e.g. `nouns`, `dadJokes`) consists of:

- A **type** (`T`) that defines the structure of the content
- A `ContentGenerator<T>` to synthesize data (usually from OpenAI)
- A `ReviewGenerator<T>` to validate and optionally patch data
- A `CurationRepository<T>` to persist entries, reviews, audits, and requests
- A CLI `commandBus` to manage the full lifecycle of entries

These are defined in one self-contained domain config file under `domains/`.

---

## 🔧 Key Concepts

- `createCuration(config)` – Creates a full domain pipeline using generator, reviewer, and repo
- `createLLMGenerator()` – Generates structured content from a prompt + parser
- `createLLMReviewer()` – Validates and optionally patches objects
- `generateBaseActions()` – Provides a full CLI command set for any domain
- `createCurationCommandBus()` – Assembles all command handlers and meta for the CLI

---

## 📂 Structure

```
curations/
├── domains/           # One file per curation domain
│   ├── myDomain.tsx
│   ├── domain2.tsx
├── helpers/           # Core CLI/command logic
├── llm/               # LLM wrappers and interfaces
├── stores/            # Firestore interaction
├── types/             # Shared types and configs
├── index.ts           # Domain registry and CLI command bus
└── toolkit/           # Simplified import hub
```

---

## 🛠 Usage

### CLI

Each curation exposes its own CLI namespace:

```bash
pnpm curations myDomain objects:list
pnpm curations domain2 reviews:process
pnpm curations domain2 requests:create ...
```

### Adding a New Domain

Create a single file in `domains/`:

```ts
export const myDomainConfig = createCuration<MyEntry>({
  namespace: "myDomain",
  repo: new CurationRepository<MyEntry>(...),
  generator: createLLMGenerator({ ... }),
  reviewer: createLLMReviewer({ ... }),
  ...
});
```

Done.

---

## ✅ Supported Lifecycle

1. `requests:create`
2. `requests:process` → `objects:add`
3. `reviews:generate`
4. `reviews:process`
5. `objects:deploy`
6. `audits:list`

---

## 🧪 Testing

Each domain supports a full smoke test using CLI-only actions.

---

## 💬 Why This Exists

Curation is the process of turning **partial or messy input** into **trusted, structured, approved content** — this system gives you a full review, audit, and deploy pipeline per domain, with AI assist and human-in-the-loop review.

```
"Given a type, a generator, and a reviewer, you get a complete curation pipeline."
```
