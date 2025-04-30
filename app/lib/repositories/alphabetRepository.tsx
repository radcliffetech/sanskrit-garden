const sanskritAlphabet = [
    // Vowels
    { char: "अ", latin: "a", pronunciation: "uh (as in 'ago')" },
    { char: "आ", latin: "ā", pronunciation: "aah (as in 'father')" },
    { char: "इ", latin: "i", pronunciation: "ih (as in 'bit')" },
    { char: "ई", latin: "ī", pronunciation: "ee (as in 'machine')" },
    { char: "उ", latin: "u", pronunciation: "oo (as in 'put')" },
    { char: "ऊ", latin: "ū", pronunciation: "oo (as in 'food')" },
    { char: "ऋ", latin: "ṛ", pronunciation: "ri (retroflex 'ri')" },
    { char: "ॠ", latin: "ṝ", pronunciation: "ree (retroflex 'ree')" },
    { char: "ऌ", latin: "ḷ", pronunciation: "li (retroflex 'li', rare)" },
    { char: "ॡ", latin: "ḹ", pronunciation: "lee (retroflex 'lee', rare)" },
    { char: "ए", latin: "e", pronunciation: "ay (as in 'they')" },
    { char: "ऐ", latin: "ai", pronunciation: "eye (as in 'aisle')" },
    { char: "ओ", latin: "o", pronunciation: "oh (as in 'go')" },
    { char: "औ", latin: "au", pronunciation: "ow (as in 'cow')" },

    // Consonants
    // Gutturals
    { char: "क", latin: "ka", pronunciation: "ka (as in 'kite')" },
    { char: "ख", latin: "kha", pronunciation: "kha (aspirated 'ka')" },
    { char: "ग", latin: "ga", pronunciation: "ga (as in 'go')" },
    { char: "घ", latin: "gha", pronunciation: "gha (aspirated 'ga')" },
    { char: "ङ", latin: "ṅa", pronunciation: "nga (as in 'sing')" },

    // Palatals
    { char: "च", latin: "ca", pronunciation: "cha (as in 'churn')" },
    { char: "छ", latin: "cha", pronunciation: "chha (aspirated 'cha')" },
    { char: "ज", latin: "ja", pronunciation: "ja (as in 'jug')" },
    { char: "झ", latin: "jha", pronunciation: "jha (aspirated 'ja')" },
    { char: "ञ", latin: "ña", pronunciation: "nya (as in 'canyon')" },

    // Retroflexes
    { char: "ट", latin: "ṭa", pronunciation: "ṭa (retroflex 'ta')" },
    { char: "ठ", latin: "ṭha", pronunciation: "ṭha (aspirated, retroflex 'tha')" },
    { char: "ड", latin: "ḍa", pronunciation: "ḍa (retroflex 'da')" },
    { char: "ढ", latin: "ḍha", pronunciation: "ḍha (aspirated, retroflex 'dha')" },
    { char: "ण", latin: "ṇa", pronunciation: "ṇa (retroflex 'na')" },

    // Dentals
    { char: "त", latin: "ta", pronunciation: "ta (as in 'top', dental)" },
    { char: "थ", latin: "tha", pronunciation: "tha (aspirated 'ta', dental)" },
    { char: "द", latin: "da", pronunciation: "da (as in 'dog', dental)" },
    { char: "ध", latin: "dha", pronunciation: "dha (aspirated 'da', dental)" },
    { char: "न", latin: "na", pronunciation: "na (as in 'nap')" },

    // Labials
    { char: "प", latin: "pa", pronunciation: "pa (as in 'pot')" },
    { char: "फ", latin: "pha", pronunciation: "pha (aspirated 'pa')" },
    { char: "ब", latin: "ba", pronunciation: "ba (as in 'bat')" },
    { char: "भ", latin: "bha", pronunciation: "bha (aspirated 'ba')" },
    { char: "म", latin: "ma", pronunciation: "ma (as in 'man')" },

    // Semivowels
    { char: "य", latin: "ya", pronunciation: "ya (as in 'yes')" },
    { char: "र", latin: "ra", pronunciation: "ra (as in Spanish 'pero')" },
    { char: "ल", latin: "la", pronunciation: "la (as in 'lotus')" },
    { char: "व", latin: "va", pronunciation: "va (between 'v' and 'w')" },

    // Sibilants and aspirate
    { char: "श", latin: "śa", pronunciation: "sha (as in 'shy', palatal)" },
    { char: "ष", latin: "ṣa", pronunciation: "sha (retroflex 'sha')" },
    { char: "स", latin: "sa", pronunciation: "sa (as in 'sun')" },
    { char: "ह", latin: "ha", pronunciation: "ha (as in 'hot')" },

    // Special characters
    { char: "ं", latin: "ṃ", pronunciation: "nasal (as in 'song')" },
    { char: "ः", latin: "ḥ", pronunciation: "aspirated breath (as in 'aha')" },
    { char: "ँ", latin: "m̐", pronunciation: "nasalized tone (as in French 'bon')" },
    { char: "ऽ", latin: "’", pronunciation: "glottal stop (as in 'uh-oh')" }
  ];

const groupings = {
  "phonetic_classification": {
    "vowels": {
      "short": ["अ", "इ", "उ", "ऋ", "ऌ"],
      "long": ["आ", "ई", "ऊ", "ॠ", "ॡ"],
      "diphthongs": ["ए", "ऐ", "ओ", "औ"],
      "specials": ["ं", "ः"]
    },
    "consonants": {
      "gutturals": ["क", "ख", "ग", "घ", "ङ"],
      "palatals": ["च", "छ", "ज", "झ", "ञ"],
      "retroflexes": ["ट", "ठ", "ड", "ढ", "ण"],
      "dentals": ["त", "थ", "द", "ध", "न"],
      "labials": ["प", "फ", "ब", "भ", "म"],
      "semivowels": ["य", "र", "ल", "व"],
      "sibilants_and_aspirate": ["श", "ष", "स", "ह"]
    },
    "mahesvara_sutras": [
      { "sutra": "अइउण्", "phonemes": ["अ", "इ", "उ"] },
      { "sutra": "ऋऌक्", "phonemes": ["ऋ", "ऌ"] },
      { "sutra": "एओङ्", "phonemes": ["ए", "ओ"] },
      { "sutra": "ऐऔच्", "phonemes": ["ऐ", "औ"] },
      { "sutra": "हयवरत्", "phonemes": ["ह", "य", "व", "र"] },
      { "sutra": "लण्", "phonemes": ["ल"] },
      { "sutra": "ञमङणनम्", "phonemes": ["ञ", "म", "ङ", "ण", "न"] },
      { "sutra": "झभञ्", "phonemes": ["झ", "भ"] },
      { "sutra": "घढधष्", "phonemes": ["घ", "ढ", "ध"] },
      { "sutra": "जबगडदश्", "phonemes": ["ज", "ब", "ग", "ड", "द"] },
      {
        "sutra": "खफछठथचटतव्",
        "phonemes": ["ख", "फ", "छ", "ठ", "थ", "च", "ट", "त", "व"]
      },
      { "sutra": "कपय्", "phonemes": ["क", "प", "य"] },
      { "sutra": "शषसर्", "phonemes": ["श", "ष", "स"] },
      { "sutra": "हल्", "phonemes": ["ह", "ल"] }
    ]
  },
  "functional_classification": {
    "vowels": [
      "अ",
      "आ",
      "इ",
      "ई",
      "उ",
      "ऊ",
      "ऋ",
      "ॠ",
      "ऌ",
      "ॡ",
      "ए",
      "ऐ",
      "ओ",
      "औ"
    ],
    "specials": ["ं", "ः"],
    "consonants": {
      "stops": [
        "क",
        "ख",
        "ग",
        "घ",
        "च",
        "छ",
        "ज",
        "झ",
        "ट",
        "ठ",
        "ड",
        "ढ",
        "त",
        "थ",
        "द",
        "ध",
        "ट",
        "ठ",
        "ड",
        "ढ",
        "प",
        "फ",
        "ब",
        "भ"
      ],
      "nasals": ["ङ", "ञ", "ण", "न", "म"],
      "semivowels": ["य", "र", "ल", "व"],
      "sibilants": ["श", "ष", "स"],
      "aspirate": ["ह"]
    }
  },
  "phonological_features": {
    "क": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "velar"
    },
    "ख": {
      "voiced": false,
      "aspirated": true,
      "nasal": false,
      "place": "velar"
    },
    "ग": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "velar"
    },
    "घ": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "velar"
    },
    "ङ": {
      "voiced": true,
      "aspirated": false,
      "nasal": true,
      "place": "velar"
    },

    "च": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "palatal"
    },
    "छ": {
      "voiced": false,
      "aspirated": true,
      "nasal": false,
      "place": "palatal"
    },
    "ज": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "palatal"
    },
    "झ": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "palatal"
    },
    "ञ": {
      "voiced": true,
      "aspirated": false,
      "nasal": true,
      "place": "palatal"
    },

    "ट": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "retroflex"
    },
    "ठ": {
      "voiced": false,
      "aspirated": true,
      "nasal": false,
      "place": "retroflex"
    },
    "ड": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "retroflex"
    },
    "ढ": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "retroflex"
    },
    "ण": {
      "voiced": true,
      "aspirated": false,
      "nasal": true,
      "place": "retroflex"
    },

    "त": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "dental"
    },
    "थ": {
      "voiced": false,
      "aspirated": true,
      "nasal": false,
      "place": "dental"
    },
    "द": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "dental"
    },
    "ध": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "dental"
    },
    "न": {
      "voiced": true,
      "aspirated": false,
      "nasal": true,
      "place": "dental"
    },

    "प": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "labial"
    },
    "फ": {
      "voiced": false,
      "aspirated": true,
      "nasal": false,
      "place": "labial"
    },
    "ब": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "labial"
    },
    "भ": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "labial"
    },
    "म": {
      "voiced": true,
      "aspirated": false,
      "nasal": true,
      "place": "labial"
    },

    "य": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "palatal"
    },
    "र": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "retroflex"
    },
    "ल": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "dental"
    },
    "व": {
      "voiced": true,
      "aspirated": false,
      "nasal": false,
      "place": "labiodental"
    },

    "श": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "palatal"
    },
    "ष": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "retroflex"
    },
    "स": {
      "voiced": false,
      "aspirated": false,
      "nasal": false,
      "place": "dental"
    },
    "ह": {
      "voiced": true,
      "aspirated": true,
      "nasal": false,
      "place": "glottal"
    }
  },
  "metaphysical_classification": {
    "vowels_as_kalas": [
      "अ",
      "आ",
      "इ",
      "ई",
      "उ",
      "ऊ",
      "ऋ",
      "ॠ",
      "ऌ",
      "ॡ",
      "ए",
      "ऐ",
      "ओ",
      "औ",
      "ं",
      "ः"
    ],
    "consonants_as_tattvas": [
      "क",
      "ख",
      "ग",
      "घ",
      "ङ",
      "च",
      "छ",
      "ज",
      "झ",
      "ञ",
      "ट",
      "ठ",
      "ड",
      "ढ",
      "ण",
      "त",
      "थ",
      "द",
      "ध",
      "न",
      "प",
      "फ",
      "ब",
      "भ",
      "म",
      "य",
      "र",
      "ल",
      "व",
      "श",
      "ष",
      "स",
      "ह"
    ],
    "additional_tantric_letters": ["ळ", "क्ष"]
  },
  "visual_grouping": {
    "symmetrical_shapes": ["म", "न", "ल", "ह", "अ", "आ", "उ", "ऊ", "ए", "ओ"],
    "looped_shapes": ["घ", "झ", "ओ", "औ", "ल", "क"],
    "diagonal_strokes": ["क", "य", "स", "प", "व", "त", "र"],
    "complex_glyphs": ["झ", "ष", "श्र", "क्ष", "ज्ञ", "ऋ", "ॠ"],
    "simple_glyphs": ["अ", "इ", "उ", "ए", "ओ", "त", "क", "न", "म"]
  },

  "pedagogical_grouping": {
    "simple_vowels": ["अ", "आ", "इ", "ई", "उ", "ऊ"],
    "simple_consonants": ["क", "ग", "त", "न", "प", "म", "ब", "द"],
    "intermediate_consonants": [
      "ख",
      "च",
      "ज",
      "भ",
      "ध",
      "श",
      "ह",
      "र",
      "ल",
      "व",
      "स",
      "य"
    ],
    "difficult_consonants": [
      "छ",
      "झ",
      "ठ",
      "ढ",
      "ञ",
      "ङ",
      "ण",
      "ष",
      "ट",
      "ड",
      "थ",
      "फ",
      "ऋ",
      "ॠ",
      "ऌ",
      "ॡ",
      "ऐ",
      "औ",
      "ं",
      "ः",
      "क्ष",
      "ज्ञ"
    ]
  }
};


  export function getAlphabetRepository() {
    return {
        getAlphabet: () => sanskritAlphabet,
        getGroupings: () => groupings,
    }
  }