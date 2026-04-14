import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import './MapView.css';

// Fix Leaflet's default icon path issue with Vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * MapView – renders a Leaflet map with a polygon draw tool.
 *
 * @param {function} onRegionDrawn – called with a GeoJSON Feature when a
 *   polygon is completed. Replaces any previously drawn polygon.
 */
function MapView({ onRegionDrawn }) {
  const mapRef = useRef(null);       // Leaflet Map instance
  const mapDivRef = useRef(null);    // DOM node for the map container
  const drawnLayerRef = useRef(null); // Currently drawn polygon layer

  useEffect(() => {
    if (mapRef.current) return; // already initialised

    // Initialise the map centred roughly over central Europe / global crop area
    const map = L.map(mapDivRef.current, {
      center: [20, 0],
      zoom: 3,
      zoomControl: true,
    });

    // Base tile layer – OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Feature group that holds drawn layers
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Draw control – polygon only
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: '#166534',
            fillColor: '#166534',
            fillOpacity: 0.15,
          },
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    });
    map.addControl(drawControl);

    // When a new polygon is drawn, replace any previous one and notify parent
    map.on(L.Draw.Event.CREATED, (e) => {
      // Remove old layer if present
      if (drawnLayerRef.current) {
        drawnItems.removeLayer(drawnLayerRef.current);
      }
      drawnLayerRef.current = e.layer;
      drawnItems.addLayer(e.layer);

      if (onRegionDrawn) {
        onRegionDrawn(e.layer.toGeoJSON());
      }
    });

    // When the drawn layer is deleted, clear state
    map.on(L.Draw.Event.DELETED, () => {
      drawnLayerRef.current = null;
      if (onRegionDrawn) {
        onRegionDrawn(null);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mapDivRef} className="leaflet-map" aria-label="Field map" />;
}

export default MapView;
