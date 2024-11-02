from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the model and tokenizer
model_name = "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def extract_keywords(text):
    inputs = tokenizer.encode(text, return_tensors='pt')
    
    with torch.no_grad():
        outputs = model.generate(inputs, max_length=50)
    
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Basic keyword extraction logic
    keywords = set(generated_text.split())  # Change this to your extraction logic
    return keywords

if __name__ == "__main__":
    # Example input text (you may want to replace this with your resume text)
    input_text = "Your resume text goes here"
    keywords = extract_keywords(input_text)
    
    print("Extracted Keywords:")
    for keyword in keywords:
        print(f" - {keyword}")