import csv
import json

# File paths
input_csv_path = "data/dhatupatha_merged_corrected.csv"
output_json_path = "tmp/dhatu_catalog.json"

# Output list
dhatu_catalog = []

# Open and read the CSV file
with open(input_csv_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # print(row)
        root = row["Root_x"].strip()
        translit = row["Transliteration"].strip()
        meaning = row["Meaning"].strip()
        voice = row["Voice"].strip()
        class_ = row["Class"].strip()

        # Skip if Class or Voice is missing
        if not class_ or not voice:
            continue
        
        class_num = str(class_)
        if not class_num: 
            continue # Skip if class number is emptyp

        # Construct the dictionary
        entry = {
            "root": root,
            "transliteration": translit,
            "meaning": meaning,
            "voice": voice,
            "class": int(class_num.replace(".0", "")),
        }
        print(entry)
        dhatu_catalog.append(entry)

# Save to JSON file
with open(output_json_path, 'w', encoding='utf-8') as jsonfile:
    json.dump(dhatu_catalog, jsonfile, indent=2, ensure_ascii=False)

print(f"Saved {len(dhatu_catalog)} entries to {output_json_path}")