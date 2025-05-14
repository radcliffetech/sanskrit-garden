import type { CommandDefinition } from "~/types";

export const commandMeta: Pick<CommandDefinition, "id" | "meta">[] = [
  // ───────────────────────────────────────
  // 🔵 Shabda Management
  // ───────────────────────────────────────
  {
    id: "generate-shabda",
    meta: {
      label: "Generate One Shabda",
      description: "Create a new shabda candidate entry from inputs.",
      group: "Shabdas",
      kind: "single",
      params: [
        { name: "stem", label: "Stem", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
      ],
    },
  },
  {
    id: "list-all",
    meta: {
      label: "List All Shabdas",
      description: "List all shabdas in the system.",
      kind: "batch",
      group: "Shabdas",
    },
  },
  {
    id: "deploy",
    meta: {
      label: "Deploy Shabda",
      group: "Shabdas",
      description: "Promote a validated shabda to approved status.",
      kind: "single",
      params: [
        {
          name: "shabdaId",
          label: "Shabda ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "deploy-all",
    meta: {
      label: "Deploy All Shabdas",
      group: "Shabdas",
      description: "Promote all validated shabdas to approved status.",
      kind: "batch",
    },
  },
  {
    id: "delete-shabda",
    meta: {
      label: "Delete Shabda",
      group: "Shabdas",
      description: "Delete a shabda by ID.",
      kind: "single",
      params: [
        {
          name: "shabdaId",
          label: "Shabda ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },

  // ───────────────────────────────────────
  // 🟡 Review Management
  // ───────────────────────────────────────
  {
    id: "review-all",
    meta: {
      label: "Review All Shabdas",
      description: "Review all candidate shabdas with open reviews.",
      kind: "batch",
      group: "Reviews",
    },
  },
  {
    id: "generate-reviews",
    meta: {
      label: "Generate Reviews",
      group: "Reviews",
      description: "Generate reviews for all candidate shabdas.",
      kind: "batch",
    },
  },
  {
    id: "list-reviews",
    meta: {
      label: "List Reviews by Status",
      description: "View reviews by workflow status.",
      group: "Reviews",
      kind: "batch",
      params: [
        {
          name: "status",
          label: "Review Status",
          type: "string",
          inputHint: "select",
        },
      ],
    },
  },
  {
    id: "list-reviews-for-shabda",
    meta: {
      label: "List Reviews",
      description: "List all reviews for a given shabda.",
      kind: "single",
      group: "Reviews",
      params: [
        {
          name: "shabdaId",
          label: "Shabda ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "get-review",
    meta: {
      label: "Inspect Review",
      description: "View full details for a review by ID.",
      kind: "single",
      group: "Reviews",
      params: [
        {
          name: "reviewId",
          label: "Review ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "delete-review",
    meta: {
      label: "Delete Review",
      description: "Delete a review by ID.",
      kind: "single",
      group: "Reviews",
      params: [
        {
          name: "reviewId",
          label: "Review ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "flush-reviews",
    meta: {
      label: "Flush All Reviews",
      group: "Reviews",
      description: "Deletes all shabda reviews.",
      kind: "batch",
    },
  },
  {
    id: "re-review",
    meta: {
      label: "Re-review Approved Shabda",
      group: "Reviews",
      description: "Trigger a new review for an approved shabda.",
      kind: "single",
      params: [
        {
          name: "shabdaId",
          label: "Shabda ID",
          type: "string",
          required: true,
        },
      ],
    },
  },

  // ───────────────────────────────────────
  // 🟢 Audit Logging
  // ───────────────────────────────────────
  {
    id: "list-audits",
    meta: {
      label: "List Shabda Audit Logs",
      description: "Display audit log entries for a given shabda ID.",
      group: "Audits",
      kind: "single",
      params: [
        {
          name: "shabdaId",
          label: "Shabda ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "list-all-audits",
    meta: {
      label: "List All Audit Logs",
      group: "Audits",
      description: "Display all audit log entries.",
      kind: "batch",
    },
  },
  {
    id: "flush-audits",
    meta: {
      label: "Flush All Audit Logs",
      group: "Audits",
      description: "Deletes all audit log entries from the system.",
      kind: "batch",
    },
  },

  // ───────────────────────────────────────
  // 🟣 Generation Requests
  // ───────────────────────────────────────
  {
    id: "request-shabda",
    meta: {
      label: "Request Shabda Generation",
      group: "Requests",
      description: "Create a request to generate a new shabda from input.",
      kind: "single",
      params: [
        { name: "stem", label: "Stem", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
        {
          name: "requestedBy",
          label: "Requested By",
          type: "string",
          inputHint: "text",
        },
        {
          name: "reason",
          label: "Reason",
          type: "string",
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "list-requests",
    meta: {
      label: "List Shabda Generation Requests",
      group: "Requests",
      description: "View all shabda generation requests.",
      kind: "batch",
    },
  },
  {
    id: "generate-from-requests",
    meta: {
      label: "Generate Shabdas from Requests",
      description: "Processes pending shabda generation requests.",
      group: "Requests",
      kind: "batch",
    },
  },
];
