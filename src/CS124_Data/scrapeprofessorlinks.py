import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin

def scrape_professor_links(base_url):
    try:
        # Fetch the webpage content
        response = requests.get(base_url)
        response.raise_for_status()  # Raise an error for bad status codes

        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all professor links (assuming they're <a> tags)
        professor_links = []
        for link in soup.find_all('a', href=True):
            if link.text.strip():  # Ensure it has visible text
                absolute_url = urljoin(base_url, link['href'])  # Convert to absolute URL
                professor_links.append(absolute_url)

        # Save to JSON
        with open('professor_links.json', 'w') as json_file:
            json.dump(professor_links, json_file, indent=4)
        
        print("Professor links saved to 'professor_links.json'")
        print(json.dumps(professor_links, indent=4))
    except Exception as e:
        print(f"An error occurred: {e}")

# URL of the faculty page
faculty_page_url = "https://siebelschool.illinois.edu/about/people/all-faculty"

# Scrape the page and generate the JSON file
scrape_professor_links(faculty_page_url)
