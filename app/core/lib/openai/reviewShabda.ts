import type {
  CurationReview,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import OpenAI from "openai";
import type { ShabdaEntry } from "~/types";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set.");
}

const openai = new OpenAI({ apiKey });

export const shabdaReviewer: ReviewGenerator<ShabdaEntry> = {
  async review(entry) {
    const prompt = generateReviewPrompt(entry);
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    if (!result.choices.length) {
      throw new Error("No review response from OpenAI");
    }

    const content = result.choices[0].message?.content?.trim();
    if (!content) {
      throw new Error("No review content returned from OpenAI");
    }

    const review: CurationReview<ShabdaEntry> = JSON.parse(content);
    if (Array.isArray(review.suggestions)) {
      review.suggestions = review.suggestions.map((s) =>
        typeof s === "string" ? s : JSON.stringify(s)
      );
    }

    return {
      ...review,
      id: crypto.randomUUID(),
      objectId: entry.id,
      createdAt: new Date().toISOString(),
      status: "new",
    };
  },
};

function generateReviewPrompt(entry: ShabdaEntry): string {
  return `You are a Sanskrit grammar assistant reviewing a declined noun entry.

Your job is to verify that the noun is declined correctly based on its gender and stem class. The data includes 24 forms (8 cases × 3 numbers), each with Devanagari, IAST, and English meaning.

✔ If all forms are correct, return:
- "approved": true
- "suggestions": []
- no patch

❌ If there are errors:
- "approved": false
- list specific issues in "suggestions"
- include a "patch" with only the corrected keys

⚠ Do not make stylistic changes.
⚠ Do not suggest alternate correct spellings.
⚠ Do not suggest changes unless a form violates grammatical rules.

Respond in JSON format with:
- confidence: 0–1 float
- summary: short assessment
- approved: true/false
- suggestions: array of issues or improvements (optional)

If you detect any errors or improvements, include a patch key that shows a partial corrected version of the input structure.
If any field is incorrect (iast, devanagari, meaning), include all corrected fields in the patch. Do not leave incorrect parts untouched.

Example outputs:

  {
    "confidence": 0.92,
    "summary": "This appears to be a correct masculine a-stem declension.",
    "approved": true,
    "suggestions": [],
    "patch": {
      "forms": {
        "genitive_plural": {
          "iast": "rāmāṇām",
          "devanagari": "रामाणाम्",
          "meaning": "of Ramas"
        }
      },
      "justification": "The genitive plural form is incorrect. It should be 'rāmāṇām' instead of 'rāmāṇoḥ'."
    }
  }

----
    {
      "confidence": 0.68,
    "summary": "Some of the dual forms appear questionable, but without clear alternatives.",
    "approved": false,
    "suggestions": [
      "Review the instrumental dual form — expected ending is '-bhyām' but input uses '-bhyā'.",
      "Double-check the accusative plural; it may conflate with nominative."
    ]
  }
----    
  {
    "confidence": 0.77,
    "summary": "Most forms are consistent, but one form appears to be a typo.",
    "approved": false,
    "suggestions": [
      "Correct the genitive singular to match a-stem masculine endings."
    ],
    "patch": {
      "forms": {
        "genitive_singular": {
          "iast": "rāmasya",
          "devanagari": "रामस्य",
          "meaning": "of Rama"
        }
      }
    },
    "justification": "The submitted genitive singular was 'rāmasa' which is not a valid form for this class."
  }
----
  {
    "confidence": 0.65,
    "summary": "The form set does not fully align with expected consonant-stem declensions.",
    "approved": false,
    "suggestions": [
      "Vocative singular may need to be a bare stem form.",
      "Nominative plural form deviates from typical -ayaḥ ending."
    ]
  }
]
---

Here is the Entry to review:

${JSON.stringify(entry, null, 2)}
`.trim();
}
