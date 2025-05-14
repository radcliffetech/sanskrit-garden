import { VerseCard } from "./VerseCard"; // Adjust the path if necessary
import { render } from "@testing-library/react";

let testVerse = {
  id: "verse-1",
  verse: 1,
  sanskrit:
    "मनोबुद्ध्यहङ्कारचित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे ।\nन च व्योम भूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम् ॥१॥",
  transliteration:
    "manobuddhyahaṅkāracittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre |\nna ca vyoma bhūmir na tejo na vāyuś cidānandarūpaḥ śivo'ham śivo'ham ||1||",
  translation:
    "I am not the mind, intellect, ego, or memory; not the ears or the tongue, nor the nose or the eyes. I am not space, earth, fire, or air. I am pure consciousness and bliss—**Śiva am I, Śiva am I**.",
  commentary:
    "This verse opens with a sweeping negation of the body-mind complex and sensory apparatus. By asserting 'I am not this', the seeker is led to discern the witness behind all experience. This is neti-neti in action—guiding awareness beyond form to the essence, which is **cidānandarūpaḥ śivaḥ**.",
};

describe("VerseCard", () => {
  it("renders the verse content correctly", () => {
    render(<VerseCard verse={testVerse} index={1} />);
  });
});
