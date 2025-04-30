const sanskritAlphabet = [
  { char: "ॐ", latin: "oṃ", pronunciation: "om (sacred sound)" },
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
  {
    char: "ठ",
    latin: "ṭha",
    pronunciation: "ṭha (aspirated, retroflex 'tha')",
  },
  { char: "ड", latin: "ḍa", pronunciation: "ḍa (retroflex 'da')" },
  {
    char: "ढ",
    latin: "ḍha",
    pronunciation: "ḍha (aspirated, retroflex 'dha')",
  },
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
  {
    char: "ँ",
    latin: "m̐",
    pronunciation: "nasalized tone (as in French 'bon')",
  },
  { char: "ऽ", latin: "’", pronunciation: "glottal stop (as in 'uh-oh')" },
];



export function getAlphabetRepository() {
  return {
    getAlphabet: () => sanskritAlphabet,
  };
}
