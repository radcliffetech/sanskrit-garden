import pandas as pd
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

# Load your Vachmi CSV
df = pd.read_csv("data/data-with-categories.csv")

# Extract Devanagari dhatu (first word in the column)
df["Dhatu_Devanagari"] = df["धातु तथा अर्थ"].str.extract(r"^(\S+)")

# Transliterate to IAST
df["Transliteration"] = df["Dhatu_Devanagari"].apply(
    lambda x: transliterate(x, sanscript.DEVANAGARI, sanscript.HK)
)

# Extract class number (from e.g., "भ्वादि (1)")
df["Class"] = df["गण"].str.extract(r"\((\d+)\)").astype(int)

# Map voice (पद) to short form
voice_map = {"परस्मैपद": "P", "आत्मनेपद": "A", "उभयपद": "U"}
df["Voice"] = df["पद"].map(voice_map)

# Output a clean lookup table
df_lookup = df[["Transliteration", "Class", "Voice"]].drop_duplicates()
df_lookup.to_csv("dhatu_class_voice_lookup.csv", index=False)

print("✅ Lookup file saved as 'dhatu_class_voice_lookup.csv'")