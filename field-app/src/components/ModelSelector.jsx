import React from 'react';
import './ModelSelector.css';

/** Available classification models */
const MODELS = [
  {
    id: 'baseline',
    label: 'Baseline Multi-Source Annotated Model',
    description:
      'Standard crop-health analysis using annotated multispectral satellite and UAV imagery. ' +
      'Detects common disease signatures and vegetation indices (NDVI, EVI).',
    underDev: false,
    icon: '🛰️🚁',
  },
  {
    id: 'afm',
    label: 'Agricultural Foundation Model (AFM)',
    description:
      'A self-supervised model pre-trained on multi-modal farm data, enabling ' +
      'few-shot transfer to any new crop or region.',
    underDev: true,
    icon: '🧬',
  },
];

/**
 * ModelSelector – radio-button list of available models.
 *
 * @param {string}   selectedModel    – ID of the currently selected model.
 * @param {function} setSelectedModel – state setter for selectedModel.
 */
function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <section className="model-selector" aria-label="Model selection">
      <h2 className="control-heading">
        <span className="panel-icon">🤖</span> Model
      </h2>
      <ul className="model-list" role="radiogroup" aria-label="Classification model">
        {MODELS.map((model) => {
          const isSelected = selectedModel === model.id;
          return (
            <li key={model.id}>
              <label
                className={`model-card ${isSelected ? 'model-card--selected' : ''} ${model.underDev ? 'model-card--dev' : ''}`}
                aria-disabled={model.underDev}
              >
                <input
                  type="radio"
                  name="model"
                  value={model.id}
                  checked={isSelected}
                  onChange={() => setSelectedModel(model.id)}
                  className="sr-only"
                />
                <span className="model-icon">{model.icon}</span>
                <span className="model-body">
                  <span className="model-label">
                    {model.label}
                    {model.underDev && (
                      <span className="badge-dev" title="Not yet available">
                        Under Development
                      </span>
                    )}
                  </span>
                  <span className="model-desc">{model.description}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ModelSelector;
