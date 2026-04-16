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

## Local Development Workflow

### 1. Run the Landing Page (repo root)

From the repository root, start a simple static server for `index.html`:

```bash
# Option A (Node)
npx serve . -l 8080

# Option B (Python)
python -m http.server 8080
```

Landing page URL: `http://localhost:8080`

### 2. Run the Field App (separate terminal)

In a second terminal:

```bash
cd field-app
npm install
npm run dev
```

Field app URL: `http://localhost:3000/field-app/`

### 3. Use Both Together

1. Open the landing page at `http://localhost:8080`.
2. Use the Field App button/link to open `http://localhost:3000/field-app/` in development.
3. In the field app, draw your region of interest on the map.
4. Choose a classification model.
5. Select data sources (Satellite and/or IoT).
6. Run the analysis.

### 4. Backend API Connection

To connect to your Python backend:

- Create a `.env.local` file in `field-app/` with:
  ```
  VITE_API_URL=http://localhost:8000
  ```

- Backend expects:
  - `POST /analyze` for analysis job (region, model, data sources).
  - `POST /sensors` for IoT sensor readings (polygon in GeoJSON).

See the minimal backend example in `field-app/README.md` for FastAPI code.

### Production Deployment with Vercel

Instead of running two servers locally, you can deploy the entire project to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from repo root)
vercel
```

Vercel automatically:

1. **Builds** the landing page (`index.html`) and the field app (`field-app/dist/`) once.
2. **Routes** traffic via `vercel.json`:
   - `/` → landing page
   - `/field-app/*` → field app
   - `/images/*` → public images
3. **Hosts** both under a single domain (e.g., `alphacrop.vercel.app`).

The field app's `base: "/field-app/"` in `vite.config.js` ensures all assets resolve correctly in production.

### 5. Models

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
