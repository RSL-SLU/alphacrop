import React, { useState } from 'react';
import MapView from './components/MapView.jsx';
import ModelSelector from './components/ModelSelector.jsx';
import DataSourceToggle from './components/DataSourceToggle.jsx';
import { analyzeField } from './api.js';
import './App.css';

function App() {
  const logoSrc = `${import.meta.env.BASE_URL}images/rsl-logo-transparent.png`;
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedModel, setSelectedModel] = useState('baseline');
  const [dataSources, setDataSources] = useState({
    satellite: true,
    iot: false,
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedRegion) {
      alert('Please draw a region of interest on the map first.');
      return;
    }
    setLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeField(selectedRegion, selectedModel, dataSources);
      setAnalysisResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">🌿 AlphaCrop</span>
          <span className="header-title">Field Analysis App</span>
          <a
            href="/"
            className="header-back"
            title="Back to landing page"
          >
            ← Back
          </a>
        </div>
      </header>

      <main className="app-main">
        {/* ── Map panel ─────────────────────────────────────────────────── */}
        <section className="panel panel-map" aria-label="Map view">
          <h2 className="panel-heading">
            <span className="panel-icon">🗺️</span> Region of Interest
          </h2>
          <p className="panel-hint">
            Use the draw tool to outline your field polygon on the map.
          </p>
          <div className="map-container">
            <MapView onRegionDrawn={setSelectedRegion} />
          </div>
          {selectedRegion && (
            <p className="roi-status">
              ✅ Region selected ({selectedRegion.geometry.coordinates[0].length - 1} vertices)
            </p>
          )}
        </section>

        {/* ── Controls panel ────────────────────────────────────────────── */}
        <aside className="panel panel-controls" aria-label="Analysis controls">
          <ModelSelector
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />

          <hr className="divider" />

          <DataSourceToggle
            dataSources={dataSources}
            setDataSources={setDataSources}
          />

          <hr className="divider" />

          <section className="run-section" aria-label="Run analysis">
            <button
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={loading || !selectedRegion}
              aria-busy={loading}
            >
              {loading ? '⏳ Analyzing…' : '🔍 Run Analysis'}
            </button>

            {!selectedRegion && (
              <p className="hint-text">Draw a polygon on the map to enable analysis.</p>
            )}

            {analysisResult && (
              <div
                className={`result-box ${analysisResult.status === 'ok' ? 'result-ok' : 'result-stub'}`}
                role="status"
              >
                <strong>Result:</strong>
                <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
              </div>
            )}
          </section>
        </aside>
      </main>

      <footer className="app-footer">
        <div className="footer-branding">
          <a href="https://www.remotesensinglab.org" target="_blank" rel="noopener noreferrer">
            <img
              src={logoSrc}
              alt="Remote Sensing Lab logo"
              className="footer-logo"
            />
          </a>
        </div>
        <p>© {new Date().getFullYear()} <strong>AlphaCrop</strong> · Proof of Concept · Built at RSL-SLU</p>
        <p className="footer-github-wrap">
          <a
            href="https://github.com/RSL-SLU/alphacrop"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-link"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
