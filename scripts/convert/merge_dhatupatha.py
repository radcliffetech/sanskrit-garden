import pandas as pd

# === Load input files ===
dhatupatha_file = "data/dhatupatha_2.csv"
lookup_file = "data/dhatu_class_voice_lookup.csv"

# Read both CSVs
df_main = pd.read_csv(dhatupatha_file)
df_lookup = pd.read_csv(lookup_file)

# Ensure consistent column names
df_main.columns = [col.strip().capitalize() for col in df_main.columns]
df_lookup.columns = [col.strip().capitalize() for col in df_lookup.columns]

# Merge on 'Transliteration'
merged = df_main.merge(df_lookup, on="Transliteration", how="left", suffixes=("", "_lookup"))

# Fill missing values from lookup
merged["Class"] = merged["Class"].combine_first(merged["Class_lookup"])
merged["Voice"] = merged["Voice"].combine_first(merged["Voice_lookup"])

# Add a new column 'ClassAsString' that converts 'Class' to a string representation
merged["ClassAsString"] = merged["Class"].apply(lambda x: str(int(x)) if pd.notnull(x) else "")

# Drop temporary columns
merged.drop(columns=["Class_lookup", "Voice_lookup"], inplace=True)

merged.drop(columns=["Transitivity"], inplace=True)

# Remove the Class column and rename ClassAsString to Class
merged.drop(columns=["Class"], inplace=True)
merged.rename(columns={"ClassAsString": "Class"}, inplace=True)

# get a count of the number of rows that dont have a class
missing_class_count = merged[merged["Class"].isnull()].shape[0]

# Print the number of missing classes
print(f"Number of rows with missing class: {missing_class_count}")


# Save to output
output_file = "tmp/dhatupatha_merged.csv"
merged.to_csv(output_file, index=False)
print(f"✅ Merged file saved as: {output_file}")