# AlphaCrop

AlphaCrop is an advanced open-source platform for field-level crop analysis, combining interactive web tools with Python-based analytic backends for researchers and agricultural practitioners.

---

## Capabilities

- **Region Selection:** Draw polygons on a basemap (Leaflet, in the web app) to define areas of interest in a field.
- **Model Inference:** Select classifiers for plant disease detection or crop yield forecasts.
- **Data Source Integration:** Toggle between satellite and IoT sensor network data as analysis sources (simulated in the PoC).
- **End-to-end Analysis:** Send regions and selected models/data sources to a Python backend for analysis (FastAPI/ML).
- **IoT Sensor Data:** Request and display simulated or real sensor readings within the selected field region.
- **Extensible Models:** Supports multiple underlying analysis models (e.g., Baseline Satellite or Agricultural Foundation Model).
- **Proof-of-Concept Web UI:** Fast, interactive interface built with React, Vite, and Leaflet.

---

## Workflow

### 1. Start and Use the Web App

```bash
cd field-app
npm install
npm run dev
# App opens at http://localhost:3000
```

1. Draw your region of interest on the map.
2. Choose a classification model.
3. Select data sources (Satellite and/or IoT).
4. Run the analysis.

### 2. Backend API Connection

To connect to your Python backend:

- Create a `.env.local` file in `field-app/` with:
  ```
  VITE_API_URL=http://localhost:8000
  ```

- Backend expects:
  - `POST /analyze` for analysis job (region, model, data sources).
  - `POST /sensors` for IoT sensor readings (polygon in GeoJSON).

See the minimal backend example in `field-app/README.md` for FastAPI code.

### 3. Models

| ID         | Name                          | Status             |
|------------|-------------------------------|--------------------|
| baseline   | Baseline Satellite Model      | ✅ Available       |
| afm        | Agricultural Foundation Model | 🚧 Under Development |

---

## Project Structure

- `field-app/` — Modern React (Vite) front end for drawing, model selection, and analysis launch.
- (optional) `backend/` — FastAPI Python backend for real or simulated model inference and sensor data.
- `README.md` — Main documentation (you’re here).

---

## License

Proof of concept – research use only. See repository root for full license terms.

---

## Further Info

- See [`field-app/README.md`](field-app/README.md) for full app setup instructions and example backend.
