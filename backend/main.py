import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI  # Use OpenAI client for local Ollama compatibility
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="UniFund AI Chatbot Prototype")

# Initialize Local Client (Ollama)
# When you migrate to the cloud, you'll only need to change this base_url and the API key.
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # Required but ignored by local Ollama
)

class ChatRequest(BaseModel):
    message: str
    student_id: str | None = None

@app.get("/")
def health_check():
    return {"status": "online", "model": "Llama 3 (Local via Ollama)"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        system_prompt = (
            "You are the Universities Fund AI Assistant. Your tone is helpful, official, and authoritative. "
            "You provide accurate information regarding the New Higher Education Funding Model, "
            "scholarship bands, and institutional funding. "
            "Always cite sources such as Circulars or Acts of Parliament."
        )

        # Using the standard Chat Completion format
        response = client.chat.completions.create(
            model="llama3", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            max_tokens=1024,
        )
        
        return {"response": response.choices[0].message.content}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)