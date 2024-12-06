from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for local testing

# Predefined technical terms for filtering
TECHNICAL_TERMS = {
    # Core CS and Engineering Topics
    "algorithm", "data", "api", "machine learning", "deep learning", "nlp", "artificial intelligence", "cloud",
    "computer vision", "neural networks", "data structures", "distributed systems", "compiler", "operating systems",
    "embedded systems", "software engineering", "object-oriented programming", "functional programming",
    "microprocessors", "parallel computing", "robotics", "digital communication systems", "signal transmission",

    # Programming Languages
    "python", "java", "c", "c++", "javascript", "typescript", "ruby", "scala", "go", "rust", "html", "css",
    "sql", "bash", "matlab", "r", "swift", "kotlin", "assembly", "vhdl", "verilog",

    # Web Development
    "reactjs", "angular", "vuejs", "express", "django", "flask", "spring", "nextjs", "nodejs",

    # Databases and Data Engineering
    "database", "sql", "nosql", "postgresql", "mysql", "mongodb", "cassandra", "redis", "hadoop", "spark",
    "data analytics", "etl", "data warehouse", "data pipeline",

    # DevOps and Infrastructure
    "docker", "kubernetes", "ci/cd", "aws", "azure", "google cloud platform", "terraform", "ansible",
    "jenkins", "nginx", "linux", "bash scripting", "serverless",

    # Electrical and Computer Engineering
    "circuit design", "vhdl", "verilog", "embedded systems", "microcontrollers", "fpga", "pcb design",
    "digital signal processing", "analog circuits", "power systems", "control systems", "robotics",
    "wireless communication", "networking", "sensor systems", "arduino", "raspberry pi",
    "fsm", "modulation", "bpsk", "synchronous fsm", "statecad", "pld", "dac", "waveform generator",
    "narrowband amplifier", "high-frequency amplifier design",

    # Mathematics and Theoretical Concepts
    "linear algebra", "calculus", "probability", "statistics", "discrete math", "graph theory", "optimization",
    "cryptography", "numerical methods",

    # Technical Tools and Frameworks
    "git", "github", "jira", "slack", "latex", "vim", "vs code", "xcode", "android studio", "eclipse", "intellij",
    "tensorflow", "pytorch", "keras", "scikit-learn", "opencv", "pandas", "numpy", "matplotlib", "seaborn",
    "xilinx", "orcad", "pspice", "dadisp", "ads", "micro-cap",

    # Networking and Security
    "networking", "tcp/ip", "udp", "http", "https", "firewalls", "vpn", "ssl", "tls", "penetration testing",
    "cybersecurity", "encryption", "authentication", "authorization", "zero trust", "network protocols",

    # Leadership and Miscellaneous
    "ieee", "power engineering society", "treasurer", "project lead", "technical projects", "team management"
}

def preprocess_text(text):
    """Clean and preprocess the text."""
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text).lower()
    return text

def extract_keywords(text):
    """Extract keywords from the text based on predefined terms."""
    words = set(preprocess_text(text).split())
    return words.intersection(TECHNICAL_TERMS)

@app.route('/', methods=['GET'])
def home():
    """Default route to check server status."""
    return "Flask server is running!"

@app.route('/upload', methods=['POST'])
def upload_parsed_text():
    """Endpoint to handle uploaded parsed text."""
    print("Received a request at /upload")  # Debug log
    data = request.json  # Parse incoming JSON request
    if not data or "parsedText" not in data:
        print("No parsed text provided")  # Debug log for missing data
        return jsonify({"error": "No parsed text provided"}), 400

    parsed_text = data["parsedText"]
    print("Parsed text:", parsed_text)  # Debug log for received text

    # Extract keywords
    extracted_keywords = extract_keywords(parsed_text)

    # Return success response
    return jsonify({
        "message": "Parsed text received successfully",
        "textLength": len(parsed_text),
        "keywords": list(extracted_keywords)  # Convert to list for JSON serialization
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)  # Run server