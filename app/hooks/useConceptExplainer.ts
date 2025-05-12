import { useState } from "react";
const EXAMPLES = Array.from(new Set([
    "Shiva", "Vishnu", "Brahma", "Ganesha", "Devi", "Shakti",
    "Karma", "Dharma", "Moksha", "Maya", "Atman", "Brahman",
    "Samsara", "Nirvana", "Kundalini", "Chakra", "Mantra", "Yantra",
    "Mudra", "Sutra", "Tantra", "Puja", "Yajna", "Homa",
    "Prana", "Shanti", "Veda", "Upanishad",
    "Bhagavad Gita", "Ramayana", "Mahabharata", "Puranas", "Smriti",
    "Shruti", "Sanskrit", "Manusmriti", "Bhakti", "Yoga",
    "Meditation", "Ayurveda", "Astrology", "Vastu", "Vaastu",
    "Samskara", "Ritual", "Ceremony", "Festival", "Tirtha",
    "Pilgrimage", "Ashram", "Guru", "Sadhu", "Sannyasa",
    "Sadhana", "Bhajan", "Kirtan", "Aarti", "Prasad",
    "Sankalpa", "Vrat", "Upavasa", "Tapasya", "Dhyana",
    "Shloka", "Chanting", "Recitation",
]));

function getRandomExamples() {
    return EXAMPLES
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .slice(0, 8)
        .map(({ value }) => value);
}

export function useConceptExplainer() {
    const [exampleSet, setExampleSet] = useState<string[]>(getRandomExamples());

    function shuffleExamples() {
        setExampleSet(getRandomExamples());
    }

    return { exampleSet, shuffleExamples };
}
