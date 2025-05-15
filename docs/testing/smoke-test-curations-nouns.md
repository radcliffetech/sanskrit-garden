# 🔥 Sanskrit Curation System Smoke Test Plan

This plan walks through the full lifecycle of a `ShabdaEntry` using the CLI:

**Request → Generate → Review → Patch/Approve → Deploy**

---

## ✅ PRECONDITIONS

- Firebase is clean (no lingering test data)
- CLI entrypoint is aliased via `pnpm shabda`
- All collections (`shabda_v1`, `shabda_reviews_v1`, `shabda_audit_v1`, `shabda_generation_requests_v1`) are empty or clean

---

## 🟣 STEP 1: Submit a Generation Request

```bash
pnpm curations nouns requests:create gaja masculine a-stem --requestedBy=smoke-test --reason="common noun"
```

### ✅ Expected:

- Console confirms request: `📥 Generation request submitted: gaja-masculine-a-stem`
- Entry appears in `shabda_generation_requests_v1` with `status: "pending"`

You can verify this on the command line as well:

```bash
pnpm curations nouns requests:list
```

---

## 🔵 STEP 2: Generate Shabda from Requests

```bash
pnpm curations nouns requests:process
```

### ✅ Expected:

- Console shows `🧠 Generating: gaja-masculine-a-stem`
- Shabda is saved in `shabda_v1` with `status: "candidate"`
- Request is updated to `status: "generated"`
- Console confirms `✅ Generated: gaja-masculine-a-stem`

---

## 🧠 STEP 3: Generate Review for New Shabda

```bash
pnpm curations nouns reviews:generate
```

### ✅ Expected:

- Console shows `✅ Reviewed: gaja-masculine-a-stem`
- Review saved to `shabda_reviews_v1` with `status: "new"`

---

## 🧪 STEP 4: Review and Validate

```bash
pnpm curations nouns reviews:review-all
```

Respond to CLI prompt:

- Read confidence, summary, suggestions
- If patch makes sense: `[p]`
- Otherwise: `[a]` or `[r]`

### ✅ Expected:

- Review is updated (`status: "applied"` or `"rejected"`)
- Shabda status becomes `"staged"` (if patch or approved)
- Audit log created in `shabda_audit_v1`

---

## 🚀 STEP 5: Deploy Shabda

```bash
pnpm curations nouns objects:deploy gaja-masculine-a-stem
```

Respond: `y`

### ✅ Expected:

- Shabda status becomes `"approved"`
- Console shows: `🚀 Shabda deployed`
- Audit log created with `action: "approved"`

---

## 📋 STEP 6: Verify CLI Listings

```bash
pnpm curations nouns objects:list-all
pnpm curations nouns reviews:list-for-object gaja-masculine-a-stem
pnpm curations nouns audits:list gaja-masculine-a-stem
```

### ✅ Expected:

- Shabda appears as `"approved"`
- One or more reviews shown
- Audit log includes "approved" and "patch-applied" or "rejected"

---

## ❌ STEP 7: Cleanup (Optional)

```bash
pnpm curations nouns objects:delete gaja-masculine-a-stem
pnpm curations nouns reviews:flush
pnpm curations nouns audits:flush
```

---

## ✅ TEST PASSES IF:

- All commands execute without error
- Data flows logically through each step
- Each stage modifies the status as expected
- Audit log correctly captures each action
- No orphaned or broken entries remain

---

💚 End of Smoke Test.
