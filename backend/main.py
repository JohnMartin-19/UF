import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from anthropic import AnthropicFoundry  # Updated Import
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="UniFund AI Chatbot Backend")

# Initialize Azure Client
# This aligns with Phase 2: RAG & AI development [cite: 23]
client = AnthropicFoundry(
    azure_api_key=os.getenv("AZURE_AI_FOUNDRY_KEY"),
    azure_ad_token_provider=None, # Use this if using Managed Identity
    api_version="2024-06-01",
    azure_endpoint=os.getenv("AZURE_AI_FOUNDRY_ENDPOINT")
)

def main():
    return('Unis Fund Backend')
class ChatRequest(BaseModel):
    message: str
    student_id: str | None = None

@app.get("/")
def health_check():
    return {"status": "online", "model": "Claude 3.5 Sonnet on Azure AI Foundry"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Persona: Helpful, Official, and Authoritative [cite: 21]
        system_prompt = (
            "You are the Universities Fund AI Assistant. Your tone is helpful, official, and authoritative[cite: 21]. "
            "You provide accurate information regarding the New Higher Education Funding Model, "
            "scholarship bands, and institutional funding[cite: 4]. "
            "Always cite sources such as Circulars or Acts of Parliament[cite: 27]."
        )

        response = client.messages.create(
            model="claude-3-5-sonnet", 
            max_tokens=1024,
            system=system_prompt,
            messages=[
                {"role": "user", "content": request.message}
            ]
        )
        
        return {"response": response.content[0].text}
    
    except Exception as e:
        # Error handling for Phase 4: Testing & Accuracy [cite: 35]
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    main()
