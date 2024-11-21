from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the model and tokenizer
model_name = "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def suggest_keywords(resume, missing_keywords):
    suggestions = []
    for keyword in missing_keywords:
        if "algorithm" in keyword:
            suggestions.append(f"Consider adding a project showcasing algorithm development in your resume.")
        elif "API" in keyword:
            suggestions.append(f"Highlight API integration experience in your projects.")
        else:
            suggestions.append(f"Emphasize experience or skills related to: {keyword}")
    return suggestions

if __name__ == "__main__":
    resume_text = """
    EDUCATION: University of Illinois Urbana-Champaign, Expected May 2027, 
    Bachelor of Science in Computer Science + Advertising, GPA: 4.0/4.0, James Scholar Honors Student

    EXPERIENCE: SHS Connect, Internship, Lincolnshire, IL, Full Stack Mobile App Developer, Team Lead, 
    March 2023 - August 2024, Directed team of 4 to develop an iOS messaging app for communication between deans 
    and 4,000+ students, Automated push notifications with Firebase Cloud Functions (JS), Integrated with APNS, 
    Ensured real-time notifications, Implemented secure user authentication with FirebaseAuth, Automated CSV uploads 
    to Firestore using Firebase Functions.

    SKILLS: JavaScript (Vue.js, React.js), Swift, Python, Java, C, Bootstrap, XCode, VSCode, 
    Language: English (Native), Spanish (Fluent), Marathi (Native), Hindi (Intermediate)
    """
    
    research_posting = """
    Position Title: Undergraduate Research Assistant - Software Engineering (SWE)

    Responsibilities:
    - Design and implement software solutions for research experiments, including front-end interfaces and back-end services.
    - Develop and optimize algorithms for data analysis, machine learning, and natural language processing.
    - Collaborate with team members to test, evaluate, and document research prototypes.
    - Integrate and interact with APIs for data collection and system evaluation.
    - Assist in the preparation of research papers, presentations, and technical documentation.
    """
    
    # Extract keywords from both texts
    missing_keywords = {
        "algorithms", "data analysis", "machine learning", "research papers", "technical documentation"
    }  # Example keywords for testing

    suggestions = suggest_keywords(resume_text, missing_keywords)

    print("Keyword Suggestions:")
    for suggestion in suggestions:
        print(f"- {suggestion}")