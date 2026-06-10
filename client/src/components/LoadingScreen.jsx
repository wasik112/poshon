export default function LoadingScreen({ error, onRetry }) {
  return (
    <div className="loading-screen">
      <div className="loading-mark">🐾</div>
      {error ? (
        <>
          <h2>Couldn't reach the server</h2>
          <p>{error.message}</p>
          <button className="btn btn-primary" onClick={onRetry}>
            Try again
          </button>
        </>
      ) : (
        <>
          <h2>Loading POSHON…</h2>
          <p>Fetching site content from the backend.</p>
        </>
      )}
    </div>
  );
}
