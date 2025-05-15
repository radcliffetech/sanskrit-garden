export type CurationRequest<T> = {
  id: string;
  data: Partial<T>;
  createdAt: string;
  status: "pending" | "started" | "generated" | "skipped" | "error";
  reason?: string;
  requestedBy?: string;
  generatedObjectId?: string;
  errorMessage?: string;
  updatedAt?: string;
};

export type CurationReview<T> = {
  id: string;
  objectId: string;
  createdAt: string;
  updatedAt?: string;
  confidence: number;
  summary: string;
  justification?: string;
  approved: boolean;
  suggestions?: string[];
  patch?: Partial<T>;
  status: "new" | "applied" | "rejected" | "skipped";
  reviewedBy?: string;
};

export type CurationAudit<T> = {
  id: string;
  objectId: string;
  timestamp: string;
  action:
    | "approved"
    | "patch-applied"
    | "rejected"
    | "skipped"
    | "deleted"
    | "edited";
  performedBy: string;
  patch?: Partial<T>;
  reviewId?: string;
  reason?: string;
};

export type CurationObject = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  validatedAt?: string;
  status: string;
};

export interface ContentGenerator<T extends CurationObject> {
  generate(input: Partial<T>): Promise<T>;
}

export interface ReviewGenerator<T extends CurationObject> {
  review(entry: T): Promise<CurationReview<T>>;
}

export type CommandParam = {
  name: string;
  label: string;
  type: "string" | "number" | "boolean";
  required?: boolean;
  inputHint?: "text" | "textarea" | "select";
};
export type CommandGroup =
  | "Objects"
  | "Reviews"
  | "Audits"
  | "Requests"
  | "General";

export type CommandDefinition = {
  id: string;

  meta: {
    label: string;
    description: string;
    group?: CommandGroup;
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

export type CurationField = {
  name: string;
  label: string;
  type: "string" | "number" | "boolean";
  required?: boolean;
  inputHint?: "text" | "textarea" | "select";
};
