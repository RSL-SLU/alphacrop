import React from 'react';
import './DataSourceToggle.css';

/** Available data sources */
const DATA_SOURCES = [
  {
    id: 'satellite',
    label: 'Satellite Imagery',
    description: 'Multispectral data from orbital sensors (simulated).',
    icon: '🛰️',
  },
  {
    id: 'iot',
    label: 'IoT Sensor Network',
    description: 'AlphaCrop ground-sensor telemetry (simulated connection).',
    icon: '📡',
  },
];

/**
 * DataSourceToggle – checkboxes for enabling/disabling data sources.
 *
 * @param {object}   dataSources    – { satellite: bool, iot: bool }
 * @param {function} setDataSources – state setter
 */
function DataSourceToggle({ dataSources, setDataSources }) {
  const handleToggle = (id) => {
    setDataSources((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="datasource-toggle" aria-label="Data sources">
      <h2 className="control-heading">
        <span className="panel-icon">📊</span> Data Sources
      </h2>
      <ul className="source-list">
        {DATA_SOURCES.map((source) => {
          const enabled = dataSources[source.id];
          return (
            <li key={source.id}>
              <label
                className={`source-card ${enabled ? 'source-card--on' : ''}`}
                htmlFor={`source-${source.id}`}
              >
                <span className="source-icon">{source.icon}</span>
                <span className="source-body">
                  <span className="source-label">{source.label}</span>
                  <span className="source-desc">{source.description}</span>
                </span>
                <input
                  type="checkbox"
                  id={`source-${source.id}`}
                  checked={enabled}
                  onChange={() => handleToggle(source.id)}
                  className="source-checkbox"
                  aria-label={`Toggle ${source.label}`}
                />
                <span className={`toggle-pill ${enabled ? 'toggle-pill--on' : ''}`} aria-hidden="true">
                  <span className="toggle-knob" />
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="simulated-note">
        ℹ️ Sensor connections are simulated. Connect a Python backend to enable live data.
      </p>
    </section>
  );
}

export default DataSourceToggle;
