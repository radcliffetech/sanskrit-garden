import type { CommandDefinition } from "~/core/lib/curations/types/curation";

export const baseCommands: Pick<CommandDefinition, "id" | "meta">[] = [
  {
    id: "objects:list-all",
    meta: {
      label: "List All Objects",
      description: "List all object entries.",
      kind: "batch",
      group: "Objects",
    },
  },
  {
    id: "objects:deploy",
    meta: {
      label: "Deploy Object",
      group: "Objects",
      description: "Deploy a validated object to approved status.",
      kind: "single",
      params: [
        {
          name: "objectId",
          label: "Object ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "objects:deploy-all",
    meta: {
      label: "Deploy All Objects",
      group: "Objects",
      description: "Deploy all staged objects.",
      kind: "batch",
    },
  },
  {
    id: "objects:delete",
    meta: {
      label: "Delete Object",
      group: "Objects",
      description: "Delete an object by ID.",
      kind: "single",
      params: [
        {
          name: "objectId",
          label: "Object ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },

  {
    id: "reviews:review-all",
    meta: {
      label: "Review All",
      description: "Review all objects with open reviews.",
      kind: "batch",
      group: "Reviews",
    },
  },
  {
    id: "reviews:generate",
    meta: {
      label: "Generate All Reviews",
      group: "Reviews",
      description: "Generate reviews for all unreviewed objects.",
      kind: "batch",
    },
  },
  {
    id: "reviews:list-by-status",
    meta: {
      label: "List Reviews by Status",
      description: "List reviews filtered by review status.",
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
    id: "reviews:list-for-object",
    meta: {
      label: "List Reviews",
      description: "List all reviews for an object.",
      kind: "single",
      group: "Reviews",
      params: [
        {
          name: "objectId",
          label: "Object ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "reviews:get",
    meta: {
      label: "Inspect Review",
      description: "Show full details for a review by ID.",
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
    id: "reviews:delete",
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
    id: "reviews:flush",
    meta: {
      label: "Flush All Reviews",
      group: "Reviews",
      description: "Delete all reviews.",
      kind: "batch",
    },
  },
  {
    id: "audits:list",
    meta: {
      label: "List Audit Logs",
      description: "List all audit logs for an object.",
      group: "Audits",
      kind: "single",
      params: [
        {
          name: "objectId",
          label: "Object ID",
          type: "string",
          required: true,
          inputHint: "text",
        },
      ],
    },
  },
  {
    id: "audits:list-all",
    meta: {
      label: "List All Audit Logs",
      group: "Audits",
      description: "List all audit entries in the system.",
      kind: "batch",
    },
  },
  {
    id: "audits:flush",
    meta: {
      label: "Flush Audit Logs",
      group: "Audits",
      description: "Delete all audit log entries.",
      kind: "batch",
    },
  },
  {
    id: "requests:list",
    meta: {
      label: "List Generation Requests",
      group: "Requests",
      description: "List all pending generation requests.",
      kind: "batch",
    },
  },
  {
    id: "reviews:re-review",
    meta: {
      label: "Re-review Object",
      group: "Reviews",
      description: "Submit a new review for an approved object.",
      kind: "single",
      params: [
        {
          name: "objectId",
          label: "Object ID",
          type: "string",
          required: true,
        },
      ],
    },
  },
  {
    id: "requests:process",
    meta: {
      label: "Process Generation Requests",
      description: "Generate objects from all pending requests.",
      group: "Requests",
      kind: "batch",
    },
  },
];
