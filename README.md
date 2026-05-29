# A Generative UI Dashboard & Predictive Simulation Engine

This project creates a modern, full-stack application that explores the concept of **Generative UI**. Instead of relying on static, hardcoded layouts, this platform allows users to describe what analytics they want to see in plain English. An AI orchestrator dynamically evaluates the request, designs a structured dashboard layout, and translates that layout into interactive React components on the fly.

To make the dashboard truly functional, the application integrates a secondary machine learning simulation pipeline. When users adjust live UI components (like a budget slider), a predictive backend instantly re-calculates data trends and dynamically updates synchronized visual charts.

---

##  Key Features

* **Generative UI Canvas:** Uses an LLM orchestrator to translate natural language prompts into structural component layouts rather than simple text outputs.
* **Predictive Simulation Pipeline:** Features an interactive forecasting engine that updates live data models instantly as parameters shift.
* **Minimalist, Academic Design:** Styled with a sophisticated, editorial matte-beige workspace environment (`#FDFBF7`) using clean typography and subtle interactive animations.
* **Strict Structural Safety:** The layout engine relies on zero-shot strict JSON mapping to ensure dynamic components always render perfectly without breaking the visual grid.

---

##  The Tech Stack

### Frontend
* **React (Vite):** Powering a modular, high-performance user interface.
* **Tailwind CSS (v4):** Providing full system-wide semantic layout rules and custom visual tokens.
* **Recharts & Lucide React:** Driving data visualizations and clean iconography.

### Backend
* **FastAPI (Python):** Handling low-latency, asynchronous endpoints for UI orchestration and dataset mutations.
* **Groq API (Llama 3.3 Versatile):** Running high-speed text-to-JSON visual structural inference.
* **Uvicorn:** Managing local server reload mechanisms.

---

##  How it Works under the Hood

1. **The Intent Phase:** The user inputs a text request (e.g., *"Show me marketing spend and a budget slider to simulate acquisition"*).
2. **The Layout Matrix:** The FastAPI backend wraps this query with an architectural system instruction, prompting the Llama 3.3 engine to return strict structural JSON maps containing specific matching blocks : MetricCard, InteractiveSlider, LineChart).
3. **The Hydration Phase:** The React frontend parses the incoming structural blueprint using a custom interpreter engine, generating native visual components seamlessly.
4. **The Simulation Phase:** Interacting with the generated UI blocks fires calculations back to our predictive data endpoint, instantly morphing the underlying chart data values in real-time.


# Activate on Windows:
.\venv\Scripts\activate

