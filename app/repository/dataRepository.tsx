const sanskritAlphabet = [
    // Vowels
    { char: "अ", latin: "a", pronunciation: "uh" },
    { char: "आ", latin: "ā", pronunciation: "aah" },
    { char: "इ", latin: "i", pronunciation: "ih" },
    { char: "ई", latin: "ī", pronunciation: "ee" },
    { char: "उ", latin: "u", pronunciation: "oo (short)" },
    { char: "ऊ", latin: "ū", pronunciation: "oo (long)" },
    { char: "ऋ", latin: "ṛ", pronunciation: "ri (retroflex)" },
    { char: "ॠ", latin: "ṝ", pronunciation: "ree (retroflex)" },
    { char: "ऌ", latin: "ḷ", pronunciation: "li (rare)" },
    { char: "ॡ", latin: "ḹ", pronunciation: "lee (rare)" },
    { char: "ए", latin: "e", pronunciation: "ay" },
    { char: "ऐ", latin: "ai", pronunciation: "eye" },
    { char: "ओ", latin: "o", pronunciation: "oh" },
    { char: "औ", latin: "au", pronunciation: "ow" },
  
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
    { char: "ठ", latin: "ṭha", pronunciation: "ṭha (aspirated)" },
    { char: "ड", latin: "ḍa", pronunciation: "ḍa (retroflex 'da')" },
    { char: "ढ", latin: "ḍha", pronunciation: "ḍha (aspirated)" },
    { char: "ण", latin: "ṇa", pronunciation: "ṇa (retroflex 'na')" },
  
    // Dentals
    { char: "त", latin: "ta", pronunciation: "ta (dental 'ta')" },
    { char: "थ", latin: "tha", pronunciation: "tha (aspirated 'ta')" },
    { char: "द", latin: "da", pronunciation: "da (dental 'da')" },
    { char: "ध", latin: "dha", pronunciation: "dha (aspirated 'da')" },
    { char: "न", latin: "na", pronunciation: "na (as in 'nap')" },
  
    // Labials
    { char: "प", latin: "pa", pronunciation: "pa (as in 'pot')" },
    { char: "फ", latin: "pha", pronunciation: "pha (aspirated 'pa')" },
    { char: "ब", latin: "ba", pronunciation: "ba (as in 'bat')" },
    { char: "भ", latin: "bha", pronunciation: "bha (aspirated 'ba')" },
    { char: "म", latin: "ma", pronunciation: "ma (as in 'man')" },
  
    // Semivowels
    { char: "य", latin: "ya", pronunciation: "ya (as in 'yes')" },
    { char: "र", latin: "ra", pronunciation: "ra (flapped 'r')" },
    { char: "ल", latin: "la", pronunciation: "la (as in 'lotus')" },
    { char: "व", latin: "va", pronunciation: "va (between 'v' and 'w')" },
  
    // Sibilants and aspirate
    { char: "श", latin: "śa", pronunciation: "sha (palatal)" },
    { char: "ष", latin: "ṣa", pronunciation: "sha (retroflex)" },
    { char: "स", latin: "sa", pronunciation: "sa (as in 'sun')" },
    { char: "ह", latin: "ha", pronunciation: "ha (as in 'hot')" },
  
    // Special characters
    { char: "ं", latin: "ṃ", pronunciation: "nasal (anusvāra)" },
    { char: "ः", latin: "ḥ", pronunciation: "aspirated breath (visarga)" },
    { char: "ँ", latin: "m̐", pronunciation: "nasalized tone (candrabindu)" },
    { char: "ऽ", latin: "’", pronunciation: "glottal stop (avagraha)" }
  ];
  

  export function getDataRepository() {
    return {
        getAlphabet: () => sanskritAlphabet,
    }
  }