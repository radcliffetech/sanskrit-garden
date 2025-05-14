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
  status: string;
};
