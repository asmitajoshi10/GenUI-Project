import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Union, Dict, Any
from groq import Groq  # ◄─ Make sure this is imported

app = FastAPI(title="Generative UI Multi-Agent Analytics Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Free Groq Client
client = Groq(api_key=os.getenv("GROQ_API_KEY", "MISSING_KEY"))

class UserPrompt(BaseModel):
    prompt: str

class SimulationRequest(BaseModel):
    multiplier: float

# --- Layout Engine Component Schema ---
class ComponentSchema(BaseModel):
    id: str
    type: str
    props: Dict[str, Any]

class DashboardLayoutResponse(BaseModel):
    explanation_of_design: str
    components: List[ComponentSchema]

@app.post("/api/v1/generate-ui")
async def generate_ui(request: UserPrompt):
    try:
        # Prompt telling Llama 3.3 exactly how to build our layout blocks
        system_instruction = (
            "You are a Senior UI/UX Architect. "
            "CRITICAL WRITING RULE: Do not use ANY emojis under any circumstances in your text, labels, or titles. Keep all copy clean, professional, and corporate. "
            "Return a valid JSON response matching this schema: "
            "{'explanation_of_design': 'string', 'components': [{'id': 'string', 'type': 'MetricCard|InteractiveSlider|LineChart|GridContainer', 'props': {}}]} "
            "Allowed components and props:\n"
            "- GridContainer: { 'children': [components] }\n"
            "- MetricCard: { 'title': str, 'value': str, 'icon': 'DollarSign'|'Percent'|'TrendingUp' }\n"
            "- InteractiveSlider: { 'label': str, 'min_value': float, 'max_value': float, 'on_change': {'action_type': 'trigger_forecast'} }\n"
            "- LineChart: { 'title': str }\n"
            "CRITICAL: Return ONLY raw JSON. No markdown formatting, no ```json blocks."
        )

        # Call Groq's active Llama 3.3 model
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # ◄─ Change this string right here
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"Build a dashboard for: {request.prompt}"}
            ],
            temperature=0.2,
        )
        
        # Parse text directly into standard JSON object
        import json
        raw_content = completion.choices[0].message.content.strip()
        
        # Clean up code blocks if the model accidentally included them
        if raw_content.startswith("```"):
            raw_content = raw_content.split("\n", 1)[1].rsplit("\n", 1)[0]
            
        json_layout = json.loads(raw_content)
        return json_layout

    except Exception as e:
        print("\n❌ GENERATIVE UI CRASH TRACE:", str(e), "\n")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/simulate-forecast")
async def simulate_forecast(request: SimulationRequest):
    try:
        # Baseline trend multiplied by user slider input
        steps = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        base_values = [100, 120, 145, 130, 165, 190]
        
        simulated_data = [
            {"step": step, "value": round(val * request.multiplier, 1)}
            for step, val in zip(steps, base_values)
        ]
        return {"status": "success", "forecast": simulated_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))