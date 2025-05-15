# 🧪 Smoke Test: `verbs` Domain (VerbEntry)

Ensure all CLI commands for the `verbs` curation domain work end-to-end.

---

## ✅ Precondition

Ensure Firestore collections are empty:

- `verbs_v1`
- `verb_reviews_v1`
- `verb_audit_v1`
- `verb_requests_v1`

CLI namespace should be:

```bash
pnpm curations verbs ...
```

---

## 📋 1. List All Verbs

```bash
pnpm curations verbs objects:list
```

✅ Expect: empty list or table of existing verb entries.

---

## 🧠 2. Create a Generation Request

```bash
pnpm curations verbs requests:create bhū 1 active laṭ
```

✅ Expect:

- Console message confirming the request
- Entry appears in `verb_requests_v1` with `status: "pending"`

---

## 🤖 3. Generate a Verb from Request

```bash
pnpm curations verbs requests:process
```

✅ Expect:

- Verb entry saved to `verbs_v1` as `status: "candidate"`
- Console confirms success
- Request is updated to `"generated"`

NOTE: If this is the first run on this curation, you might have to create the Firestore Indexes.

---

## 🔍 4. Generate a Review

```bash
pnpm curations verbs reviews:generate
```

✅ Expect:

- Review written to `verb_reviews_v1`
- Output includes summary and suggestions

---

## 🔎 5. Review All

```bash
pnpm curations verbs reviews:review-all
```

Respond to CLI prompt:

- `[a]pprove`, `[p]atch+approve`, or `[s]kip`

✅ Expect:

- Entry status becomes `"staged"`
- Audit log written for the patch/approval

---

## 🚀 6. Deploy the Verb

```bash
pnpm curations verbs objects:deploy-all
```

✅ Expect:

- Entry status becomes `"approved"`
- Deployment confirmation in console
- Audit log for `"approved"`

---

## 🧾 7. View Audit Log

```bash
pnpm curations verbs audits:list <id>
```

✅ Expect:

- List of actions performed on the verb

---

## 🧹 8. Cleanup

```bash
pnpm curations verbs objects:delete <id>
pnpm curations verbs reviews:flush
pnpm curations verbs audits:flush
```

✅ Expect:

- All relevant data removed

---

## ✅ Test Passes If

- All commands complete without error
- Object flows correctly through request → generate → review → deploy
- CLI outputs are clear and accurate

💚 End of Smoke Test.
