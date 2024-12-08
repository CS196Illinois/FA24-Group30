import os
import re

# Path to the folder containing the files
folder_path = r"C:\Users\srbel\FA24-Group30\src\CS124_Data\professor_collection"

# Function to extract the numeric part of the filename
def extract_number(filename):
    match = re.search(r"\((\d+)\)", filename)  # Extract the number inside parentheses
    return int(match.group(1)) if match else float('inf')  # Return a high value if no match

# Get all files in the folder
files = [f for f in os.listdir(folder_path) if f.endswith(".png")]

# Sort files numerically based on the number in the filename
sorted_files = sorted(files, key=extract_number)

# Print the sorted filenames with the full path
for file in sorted_files:
    print("src\\CS124_Data\\professor_collection\\" + file)