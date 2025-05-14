import type { CommandDefinition } from "~/types";

export const nounsCommands: Pick<CommandDefinition, "id" | "meta">[] = [
  {
    id: "objects:generate",
    meta: {
      label: "Generate Object",
      description: "Generate a new object from inputs.",
      group: "Objects",
      kind: "single",
      params: [
        { name: "root", label: "Root", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
      ],
    },
  },
  {
    id: "requests:create",
    meta: {
      label: "Create Generation Request",
      group: "Requests",
      description: "Create a request to generate a new object.",
      kind: "single",
      params: [
        { name: "root", label: "Root", type: "string", required: true },
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
