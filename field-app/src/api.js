/**
 * api.js – Stub for the AlphaCrop Python backend.
 *
 * Replace the stub implementations below with real fetch() calls once a
 * Python backend (FastAPI / Flask) is available.
 *
 * Expected backend base URL (configure via environment variable):
 *   VITE_API_URL=http://localhost:8000
 *
 * Example Python endpoint (FastAPI):
 *
 *   @app.post("/analyze")
 *   async def analyze(body: AnalyzeRequest):
 *       polygon      = body.polygon       # GeoJSON Feature
 *       model        = body.model         # "baseline" | "afm"
 *       data_sources = body.data_sources  # { satellite: bool, iot: bool }
 *       ...
 *       return { "status": "ok", "disease_risk": 0.12, "ndvi_mean": 0.67 }
 */

const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Analyze a field region of interest.
 *
 * @param {object} polygon     – GeoJSON Feature (Polygon geometry)
 * @param {string} model       – Model ID, e.g. "baseline" or "afm"
 * @param {object} dataSources – { satellite: boolean, iot: boolean }
 * @returns {Promise<object>}  – Analysis result from the backend
 */
export async function analyzeField(polygon, model, dataSources) {
  if (!API_BASE) {
    // ── Stub response (no backend connected) ──────────────────────────────
    return {
      status: 'stub',
      message:
        'Backend not connected. Set VITE_API_URL and implement the /analyze endpoint.',
      received: { polygon, model, dataSources },
    };
  }

  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ polygon, model, data_sources: dataSources }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch the latest IoT sensor readings for a given region.
 *
 * @param {object} polygon – GeoJSON Feature (Polygon geometry)
 * @returns {Promise<object[]>} – Array of sensor reading objects
 */
export async function getSensorReadings(polygon) {
  if (!API_BASE) {
    return [
      { sensor_id: 'SIM-001', temperature_c: 24.3, humidity_pct: 61, timestamp: new Date().toISOString() },
      { sensor_id: 'SIM-002', temperature_c: 23.8, humidity_pct: 65, timestamp: new Date().toISOString() },
    ];
  }

  const response = await fetch(`${API_BASE}/sensors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ polygon }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
