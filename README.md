## Business Recommendation AI Agent

This is a smart AI-powered web application that provides **location-based business suggestions** and **business-based location recommendations** using Advanced LLM. Ideal for aspiring entrepreneurs and startups to identify high-potential business opportunities based on real-world demand.

---

### Features

Two smart AI recommendation modes:

1. **Location → Business** (based on area and budget)
2. **Business → Location** (best zones for a given business idea)

AI powered intelligence with web-search capability
Clean and responsive React frontend
Flask backend with secure API integration
Easy to customize and extend with your own models later

---

### Use Cases

#### Case 1: Location-Based Business Recommendation

User Inputs:

- City
- Area
- Budget (Low-Medium / Medium-High / High)

> Output: Lists businesses in that area, mentions demand, and recommends top 2–3 businesses.

#### Case 2: Business Idea Based Location Recommendation

User Inputs:

- Business Idea (e.g., Restaurant)
- City/State

> Output: Recommends top 2–3 areas within the city for the business idea with reasons.

---

### Tech Stack

| Layer      | Tech Used      |
| ---------- | -------------- |
| Frontend   | React.js       |
| Backend    | Flask (Python) |
| Hosting    | Vercel         |
| Versioning | Git + GitHub   |

---

### Project Structure

```
└──business-recomendation-agent/
    ├── frontend/
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── .gitignore
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.js
    │       ├── reportWebVitals.js
    │       ├── setupTests.js
    │       └── components/
    │           └── Main.jsx
    └── server/
        ├── app.py
        ├── requirements.txt
        ├── .env
        └── utils/
            ├── prompt_generator.py
            └── __pycache__/

```

---

### Setup Instructions

#### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/Business-recomendation-Agent.git
cd Business-recomendation-Agent
```

---

#### 2. Setup Backend (Flask + Gemini)

```bash
cd server
pip install -r requirements.txt
```

Run Flask server:

```bash
python app.py
```

---

#### 3. Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`
Backend runs at `http://localhost:5000`

---

### How It Works

- User selects the mode and submits form input.
- React sends data to Flask using Axios.
- Flask generates a dynamic prompt.
- Gemini API analyzes the prompt and returns a response.
- Frontend displays the result in a clean, structured format.

---

### Future Improvements

- Add database for analytics
- Multi-language support
- Real-time trend analysis with external APIs
- Replace Gemini with custom ML model later
