# 🧠 Turnkey Curation by Composition

## Overview

This system enables the rapid construction of a complete, end-to-end curation workflow for any structured content domain. It is based on the idea that with just three core inputs, we can scaffold a fully functioning CLI and repository system that manages the lifecycle of generated and validated content.

---

## 🔧 Minimum Requirements

To support curation for a new content domain, you only need:

### 1. A Data Type (`T`)

A structured data definition for your domain object:

```ts
type T = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  // domain-specific fields...
};
```

### 2. A Content Generator

Implements the `ContentGenerator<T>` interface:

```ts
generate(input: Partial<T>): Promise<T>
```

Used to synthesize complete objects from partial inputs.

### 3. A Review Generator

Implements the `ReviewGenerator<T>` interface:

```ts
review(entry: T): Promise<CurationReview<T>>
```

Used to validate existing objects and suggest improvements via patching.

---

## ✅ What This Unlocks Automatically

Once you supply the above, the system gives you:

- Firestore persistence for `T`
- Lifecycle tracking (`candidate`, `staged`, `approved`)
- CLI and UI actions:
  - `objects:generate`
  - `requests:create`
  - `requests:process`
  - `reviews:generate`
  - `reviews:re-review`
  - `objects:deploy`
- Audit logging for all changes
- Support for AI/human-in-the-loop validation

---

## 🧱 Architecture Summary

```
ContentGenerator<T>
      ↓
Partial<T> → generate() → Full Object<T>
                                      ↓
                               store as candidate
                                      ↓
ReviewGenerator<T>
      ↓
review(object) → CurationReview<T> with patch
                                      ↓
human review + patch applied
                                      ↓
mark as staged
                                      ↓
deploy() → approved object
```

---

## 💡 Curation Is a Pipeline

The curation system formalizes the journey from idea to trusted object:

```
Request → Generate → Review → Patch → Approve → Deploy
```

And it does so with modular, domain-neutral architecture.

---

## 🌍 Domains Supported

This approach can be used for:

- Noun entries (`ShabdaEntry`)
- Verb paradigms (`VerbEntry`)
- Articles / passages
- Concepts / glossaries
- Audio / media metadata
- Source-linked annotations

---

## 💬 Why This Matters

Curation ensures content is:

- ✅ Validated
- ✅ Auditable
- ✅ Patchable
- ✅ Lifecycle-aware

It bridges AI-generation, human review, and structured deployment — a full loop of content governance.
