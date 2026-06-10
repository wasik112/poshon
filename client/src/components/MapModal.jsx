import { useEffect } from 'react';

export default function MapModal({ location, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!location) return null;

  const bbox = [
    location.lng - 0.03,
    location.lat - 0.02,
    location.lng + 0.03,
    location.lat + 0.02
  ].join('%2C');
  const marker = `${location.lat}%2C${location.lng}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <header className="modal-header">
          <div>
            <small>Booth</small>
            <h3>{location.name}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-xmark" />
          </button>
        </header>
        <p className="modal-body">{location.description}</p>
        <iframe
          title={`Map of ${location.name}`}
          className="modal-map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
        />
        <a
          className="btn btn-ghost"
          href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=14/${location.lat}/${location.lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in OpenStreetMap <i className="fas fa-arrow-up-right-from-square" />
        </a>
      </div>
    </div>
  );
}
