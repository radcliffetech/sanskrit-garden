
const USE_STUBS = false;


export async function storytellerRequest(prompt: string): Promise<{ title: string; story: string; questions: string[]; branches: string[]; reference: string }> {
  console.log("[Client] Sending prompt to server:", prompt);

  if (USE_STUBS) {
    await sleep(1000);
    return {
      title: `The Tale of ${prompt}`,
      story: `Once upon a time in the realm of ${prompt}, a great adventure began...\nThe hero, a brave soul, set forth on a quest to discover the secrets of the universe. Along the way, they encountered mystical beings and faced formidable challenges that tested their resolve.\n\nAs the sun set over the horizon, casting a golden hue over the land, the hero found themselves at a crossroads, where destiny awaited.`,
      questions: [
        "What obstacle did the hero face next?",
        "Who offered unexpected aid to the hero?",
        "What secret was revealed about the hero's past?",
        "How did the villain respond to the hero's actions?",
      ],
      branches: [
        "The hero encountered a vast desert with hidden dangers.",
        "An old hermit revealed forgotten lore.",
        "The hero discovered a mysterious birthmark of prophecy.",
        "The villain retaliated by summoning an ancient beast.",
      ],
      reference: "Inspired by tales from the Mahabharata and local folklore."
    };
  }

  const formData = new FormData();
  formData.append("prompt", prompt);

  const response = await fetch("/api/ai-storyteller", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[Client] Server error:", text);
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  console.log("[Client] Received story data:", data);
  return data;
}


/**

    "title": "Brahma's Enlightenment through the Cosmic Yajna",
    "story": "Amidst the calming swirl of celestial energies, Brahma sat upon the timeless petals of the golden lotus, his mind a reservoir seeking channels for divine knowledge. As his meditation grew deeper, the AUM resonated not only through his being but began to harmonize with the Vedas that surrounded him, like whispers of the universe speaking secrets from the fabric of existence.\n\nIn this divine trance, the Vedas appeared not as mere scriptures but as living manifestations; Devoid of material forms, they danced and pulsated in rhythm with the heart of the cosmos. It was then that Brahma witnessed the great Yajna - the sacrificial fire ritual symbolizing the perpetual creation and destruction cycle, a cosmic exchange where life emerged transformed and anew. From the flames, sages emerged, embodying the tenets of each Veda, and sang the hymns of profound clarity and eternal truths.\n\nEach hymn bestowed upon Brahma a fragment of understanding - the essence of stability from Rigveda, the vitality of movement from Yajurveda, the melody of harmony from Samaveda, and the depth of knowledge from Atharvaveda. Thus invigorated by the sages' chants, Brahma gained insight into the cosmic balance necessary for creation. Guided by these truths, he embarked on his cosmic duty with renewed vigor, his mind and heart aligned with the rhythm of the universe.",
    "questions": [
        "What role do the Vedas play in guiding Brahma's actions?",
        "How does AUM serve as a medium for Brahma's understanding?",
        "What realizations does Brahma have during his meditation?",
        "Why is balance essential for creation in Brahma's vision?"
    ],
    "branches": [
        "As Brahma listens to the Rigveda, he understands the essence of order and balance, crucial for structuring the cosmos in harmony with universal laws.",
        "AUM serves as the primordial frequency that aligns Brahma’s consciousness with the higher realms, allowing him to transcend physical reality and perceive the interconnectedness of all things.",
        "Through his meditation, Brahma realizes the cyclical nature of the universe and the importance of balance between creation and dissolution in sustaining cosmic harmony.",
        "For Brahma, balance is fundamental since creation without order would lead to chaos; thus, it is through balance that he can ensure a stable and nurturing universe, where dharma prevails."
    ],
    "reference": "Reference: [Devi Bhagavata Purana], [Book 3, Chapter 5]"
}

 */

export async function continueStoryRequest(baseStory: string, question: string, branchSegment: string): Promise<{
  title: string;
  story: string;
  questions: string[];
  branches: string[];
  reference: string;
}> {
  console.log("[Client] Sending continuation request to server:", question);

  if (USE_STUBS) {
    await sleep(1000);
    return {
      title: `The Journey Continues`,
      story: `Building upon the previous tale, new paths unfolded before the hero...\nThe hero, now wiser and more attuned to the cosmic energies, faced a new challenge that tested their resolve. As they ventured deeper into the unknown, the echoes of the past guided their steps, revealing hidden truths and forgotten relics that would shape their destiny.\n\nIn this chapter, the hero encounters allies and adversaries alike, each with their own motives and secrets. The trials ahead promise to be as enlightening as they are perilous.`,
      questions: [
        "Which ally turns against the hero?",
        "What trial must be completed to reach the final goal?",
        "What unexpected twist changes the hero's fate?",
        "What forgotten relic is rediscovered?",
      ],
      branches: [
        "A trusted companion hides a dark agenda.",
        "The hero must pass a test of courage in a labyrinth.",
        "An ancient prophecy is misinterpreted.",
        "An artifact hidden for centuries resurfaces.",
      ],
      reference: "Inspired by tales from the Ramayana and related folklore."
    };
  }

  const formData = new FormData();
  formData.append("baseStory", baseStory);
  formData.append("question", question);
  formData.append("branchSegment", branchSegment);

  const response = await fetch("/api/ai-storyteller-continue", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[Client] Server error during continuation:", text);
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  console.log("[Client] Received continuation story:", data);
  return data;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
