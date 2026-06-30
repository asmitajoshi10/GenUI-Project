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

##  System Architecture & Engineering Trade-Offs (Criterion 4)

### 1. Unified Schema Parsing Guardrails
* **Design Choice:** Implemented `Pydantic` validation schemas (`DashboardLayoutResponse`) directly on the FastAPI REST endpoint.
* **Trade-off:** This introduces minor latency overhead during JSON parsing, but it provides strict system safety. It guarantees that any non-conforming or hallucinated LLM payloads are intercepted and handled at the server level before they can reach the frontend and crash the client UI grid.

### 2. High-Speed Inference vs. Multi-Cloud Portability
* **Design Choice:** Selected the Groq SDK (`llama-3.3-70b-versatile`) for local execution while designing standard OpenAI-compatible abstraction layers.
* **Trade-off:** While a full cloud deployment (e.g., Azure OpenAI or AWS Bedrock) offers enterprise-level security, utilizing Groq dramatically lowers operational computing costs and provides sub-second inference speeds, which is crucial for dynamic, real-time interface synthesis.

### 3. State Mutation vs. Network Traffic
* **Design Choice:** Offloaded simulation calculations (`/api/v1/simulate-forecast`) to backend REST endpoints rather than processing them client-side in React state.
* **Trade-off:** This introduces network round-trips when adjusting the slider UI, but it allows the application to handle high-frequency parameter modifications via scalable, stateless Python logic—mirroring real-world enterprise data-streaming architectures.

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


