import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { usePageData } from '../components/Layout.jsx';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const accentIcon = L.divIcon({
  className: 'booth-marker',
  html: '<span class="booth-marker-pin"><i class="fas fa-paw"></i></span>',
  iconSize: [44, 56],
  iconAnchor: [22, 52],
  popupAnchor: [0, -48]
});

function FlyTo({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, zoom || 14, { duration: 1.2 });
  }, [position, zoom, map]);
  return null;
}

function MapResizer({ trigger }) {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 250);
    return () => clearTimeout(id);
  }, [trigger, map]);
  return null;
}

export default function BoothsPage() {
  const { t } = useTranslation();
  const { locations } = usePageData();
  const [focused, setFocused] = useState(null);
  const [isFullscreen, setFullscreen] = useState(false);
  const markerRefs = useRef({});

  const center = useMemo(() => {
    if (!locations.length) return [23.81, 90.41];
    const lat = locations.reduce((a, l) => a + l.lat, 0) / locations.length;
    const lng = locations.reduce((a, l) => a + l.lng, 0) / locations.length;
    return [lat, lng];
  }, [locations]);

  const focus = (loc) => {
    setFocused([loc.lat, loc.lng]);
    const m = markerRefs.current[loc.id];
    if (m) setTimeout(() => m.openPopup(), 800);
  };

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e) => { if (e.key === 'Escape') setFullscreen(false); };
    document.body.classList.add('booths-fullscreen-lock');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('booths-fullscreen-lock');
      window.removeEventListener('keydown', onKey);
    };
  }, [isFullscreen]);

  return (
    <main className="booths-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('booths.eyebrow')}</span>
          <h1>{t('booths.title')}</h1>
          <p>{t('booths.intro')}</p>
        </div>
      </section>

      <section className="booths-map-section">
        <div className="container booths-map-grid">
          <div className={`booths-map-wrap ${isFullscreen ? 'is-fullscreen' : ''}`}>
            <button
              type="button"
              className="map-fs-toggle"
              onClick={() => setFullscreen((v) => !v)}
              aria-label={isFullscreen ? t('booths.exitFullscreen') : t('booths.fullscreen')}
            >
              <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} />
              <span>{isFullscreen ? t('booths.exitFullscreen') : t('booths.fullscreen')}</span>
            </button>

            <MapContainer
              center={center}
              zoom={12}
              scrollWheelZoom={true}
              zoomControl={false}
              className="booths-map"
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={accentIcon}
                  ref={(ref) => { if (ref) markerRefs.current[loc.id] = ref; }}
                  eventHandlers={{ click: () => setFocused([loc.lat, loc.lng]) }}
                >
                  <Popup>
                    <div className="booth-popup">
                      {loc.image && (
                        <div
                          className="booth-popup-img"
                          style={{ backgroundImage: `url(${loc.image})` }}
                        />
                      )}
                      <div className="booth-popup-body">
                        <strong>{loc.name}</strong>
                        <span>{loc.description}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <FlyTo position={focused} zoom={14} />
              <MapResizer trigger={isFullscreen} />
            </MapContainer>
          </div>

          <aside className={`booths-list ${isFullscreen ? 'is-hidden' : ''}`}>
            <h3>{t('booths.count', { count: locations.length })}</h3>
            <p className="booths-list-help">{t('booths.tip')}</p>
            <div className="booths-list-items">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  className="booth-list-item"
                  onClick={() => focus(loc)}
                  type="button"
                >
                  {loc.image ? (
                    <span
                      className="booth-list-thumb"
                      style={{ backgroundImage: `url(${loc.image})` }}
                    />
                  ) : (
                    <span className="booth-list-icon">
                      <i className="fas fa-location-dot" />
                    </span>
                  )}
                  <span className="booth-list-text">
                    <strong>{loc.name}</strong>
                    <small>{loc.description}</small>
                  </span>
                  <i className="fas fa-arrow-right booth-list-arrow" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
