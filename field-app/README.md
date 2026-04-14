# AlphaCrop – Field Analysis App (React PoC)

A stand-alone React proof-of-concept that lets farmers:

1. **Draw a region of interest** (polygon) on a Leaflet basemap.
2. **Select a classification model** for plant-disease detection / yield forecast.
3. **Toggle data sources** (Satellite, IoT Sensor Network) – currently simulated.
4. **Run analysis** – calls a Python backend when configured, or returns a stub response.

---

## Prerequisites

| Tool | Minimum version |
|------|-----------------|
| Node.js | 18 |
| npm | 9 |

---

## Quick Start

```bash
# From the repository root:
cd field-app

# Install dependencies
npm install

# Start the development server (opens http://localhost:3000)
npm run dev
```

The app will open automatically at **http://localhost:3000**.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with hot-reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Project Structure

```
field-app/
├── index.html              # Vite entry HTML
├── vite.config.js          # Vite configuration
├── package.json
├── README.md
└── src/
    ├── main.jsx            # React root mount
    ├── index.css           # Global reset
    ├── App.jsx             # Main layout (map + controls)
    ├── App.css             # Layout & component styles
    ├── api.js              # ← Python backend stub (see below)
    └── components/
        ├── MapView.jsx          # Leaflet map with polygon draw tool
        ├── MapView.css
        ├── ModelSelector.jsx    # Model radio buttons
        ├── ModelSelector.css
        ├── DataSourceToggle.jsx # Satellite / IoT toggles
        └── DataSourceToggle.css
```

---

## Connecting a Python Backend

### 1 – Set the API base URL

Create a `.env.local` file in `field-app/` (never commit this file):

```env
VITE_API_URL=http://localhost:8000
```

The app reads `VITE_API_URL` at build time via `import.meta.env.VITE_API_URL`.

---

### 2 – Implement the Python endpoints

The stub in `src/api.js` expects two endpoints:

#### `POST /analyze`

Accepts a JSON body and returns analysis results.

```json
// Request
{
  "polygon":      { "type": "Feature", "geometry": { ... } },
  "model":        "baseline",
  "data_sources": { "satellite": true, "iot": false }
}

// Response
{
  "status":       "ok",
  "disease_risk": 0.12,
  "ndvi_mean":    0.67
}
```

#### `POST /sensors`

Returns simulated or real IoT readings for the given polygon.

```json
// Request
{ "polygon": { "type": "Feature", "geometry": { ... } } }

// Response (array)
[
  { "sensor_id": "S-001", "temperature_c": 24.3, "humidity_pct": 61, "timestamp": "..." }
]
```

---

### 3 – Minimal FastAPI example

```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    polygon: dict[str, Any]
    model: str
    data_sources: dict[str, bool]

@app.post("/analyze")
async def analyze(body: AnalyzeRequest):
    # TODO: run your model here
    return {"status": "ok", "disease_risk": 0.0, "ndvi_mean": 0.0}

@app.post("/sensors")
async def sensors(body: dict):
    # TODO: query real IoT sensors
    return []
```

Run with:

```bash
pip install fastapi uvicorn
uvicorn backend.main:app --reload --port 8000
```

---

## Models

| ID | Name | Status |
|----|------|--------|
| `baseline` | Baseline Satellite Model | ✅ Available |
| `afm` | Agricultural Foundation Model | 🚧 Under Development |

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` | UI framework |
| `leaflet` | Interactive map engine |
| `leaflet-draw` | Polygon draw toolbar |
| `react-leaflet` | React bindings for Leaflet |
| `vite` | Build tool and dev server |

---

## License

Proof of concept – research use only. See repository root for full licence terms.
