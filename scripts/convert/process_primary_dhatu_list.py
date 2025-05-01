import csv
import json
import indic_transliteration
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from indic_transliteration.sanscript import transliterate, SLP1, IAST

csv_path_1 = 'sanskrit_dhatus.csv'
csv_path_2 = 'dhatupatha.csv'
output_path = 'dhatupatha.json'


dhatus_1 = []
dhatus_2 = []   

def load_csv_1(path):
    with open(path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip header row
        for row in reader:
            # print(row)
            # pop the first element
            row.pop(0)
            meaning = row[3]
            # for meaning, find any words in the string ending with to replaice it with "/nto", unless to is the first
            # word in the string

            meaning = meaning.replace("to", "\\nto")
            # string initial newline
            meaning = meaning.replace("\\n", "", 1)



            dhatus_2.append([
                row[0],  # root
                row[1],  # transliteration
                meaning,  # meaning
                "",     # class
                "", # voice
                "", # transitivity

            ])

def load_csv_2(path):
    with open(path, newline='', encoding='utf-8') as csvfile:
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
            iast_root = transliterate(slp1_root, sanscript.SLP1, sanscript.HK)
            # rmove any // from the root
            #devanagari_root = devanagari_root.replace("\\", "")
            #iast_root = iast_root.replace("\\", "")
            

            

            # entry = {
            #     "root": devanagari_root,
            #     "meaning": "TODO",
            #     "transliteration": slp1_to_normalized_iast(iast_root),
            #     "class": verb_class,
            #     "voice": "P",
            #     "transitivity": "intransitive"
            # }
            dhatus_1.append([
                devanagari_root,  # root
                iast_root,  # transliteration
            ])


load_csv_1(csv_path_1)
load_csv_2(csv_path_2)



# # output the dhatus_1 to a csv file
# with open('dhatupatha_1.csv', 'w', encoding='utf-8') as csvfile:
#     writer = csv.writer(csvfile)
#     writer.writerow(['root', 'transliteration', 'meaning'])
#     for dhatu in dhatus_1:
#         writer.writerow(dhatu)

# # output the dhatus_2 to a csv file
with open('dhatupatha_2.csv', 'w', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Root', 'Transliteration', 'Meaning', 'Class', 'Voice', 'Transitivity'])
    for dhatu in dhatus_2:
        writer.writerow(dhatu)
# # Merge the two lists

# Write to JSON
# with open(output_path, 'w', encoding='utf-8') as jsonfile:
#     json.dump(dhatus, jsonfile, ensure_ascii=False, indent=2)
