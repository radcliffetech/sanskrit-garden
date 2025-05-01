import csv
import json
import indic_transliteration
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from indic_transliteration.sanscript import transliterate, SLP1, IAST

csv_path = 'dhatupatha.csv'
json_path = 'dhatupatha.json'

dhatus = []

with open(csv_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip header row
    for row in reader:
        if len(row) < 3:
            continue  # skip malformed rows
        try:
            verb_class = int(row[0])
        except ValueError:
            continue  # skip rows with non-numeric class

        slp1_root = row[2]

        devanagari_root = transliterate(slp1_root, sanscript.SLP1, sanscript.DEVANAGARI)
        iast_root = transliterate(slp1_root, sanscript.SLP1, sanscript.IAST)
        # rmove any // from the root
        devanagari_root = devanagari_root.replace("\\", "")
        iast_root = iast_root.replace("\\", "")
        
        def slp1_to_normalized_iast(slp1):
            iast = transliterate(slp1, SLP1, IAST)
            if iast.endswith("~"):
                iast = iast[:-1] + "ṁ"
            return iast
        

        entry = {
            "root": devanagari_root,
            "meaning": "TODO",
            "transliteration": slp1_to_normalized_iast(iast_root),
            "class": verb_class,
            "voice": "P",
            "transitivity": "intransitive"
        }
        dhatus.append(entry)

# Write to JSON
with open(json_path, 'w', encoding='utf-8') as jsonfile:
    json.dump(dhatus, jsonfile, ensure_ascii=False, indent=2)