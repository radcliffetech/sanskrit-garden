export const commandMeta: Pick<CommandDefinition, "id" | "meta">[] = [
  {
    id: "review",
    meta: {
      label: "Generate Review",
      description: "Generate a new review for a shabda candidate.",
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
    id: "list",
    meta: {
      label: "List Reviews",
      description: "List all reviews for a given shabda.",
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
    id: "get",
    meta: {
      label: "Inspect Review",
      description: "View full details for a review by ID.",
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
    id: "delete",
    meta: {
      label: "Delete Review",
      description: "Delete a review by ID.",
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
      description: "Deletes all shabda reviews.",
      kind: "batch",
    },
  },
  {
    id: "list-reviews",
    meta: {
      label: "List Reviews by Status",
      description: "View reviews by workflow status.",
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
    id: "generate-reviews",
    meta: {
      label: "Generate Reviews",
      description: "Generate reviews for all candidate shabdas.",
      kind: "batch",
    },
  },
  {
    id: "generate-shabda",
    meta: {
      label: "Generate One Shabda",
      description: "Create a new shabda candidate entry from inputs.",
      kind: "single",
      params: [
        { name: "stem", label: "Stem", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
      ],
    },
  },
];

export type CommandParam = {
  name: string;
  label: string;
  type: "string" | "number" | "boolean";
  required?: boolean;
  inputHint?: "text" | "textarea" | "select";
};

export type CommandDefinition = {
  id: string;

  meta: {
    label: string;
    description: string;
    group?: string;
    icon?: string;
    kind?: "single" | "batch" | "data";
    params?: CommandParam[];
    visibleTo?: string[];
    returns?: "json" | "table" | "text";
  };

  /** CLI-friendly function for stdout-style behavior */
  action?: (args: Record<string, string>) => Promise<void>;

  /** React/server-friendly handler that returns data */
  handler?: (args: Record<string, string>) => Promise<any>;
};
