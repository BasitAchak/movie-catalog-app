import { useEffect, useState } from "react";
import { movies } from "../data/movies";

// Health-check page: fetches (simulated) data and renders status.
// Swap the mock fetch below for a real endpoint once one exists.
function fetchStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "ok",
        timestamp: new Date().toISOString(),
        movieCount: movies.length,
      });
    }, 300);
  });
}

function Health() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md rounded-xl border border-[var(--border)] p-6">
        <h1 className="text-xl font-semibold mb-4">Health Check</h1>

        {error && <p className="text-red-600">Error: {error}</p>}

        {!data && !error && <p className="text-[var(--text)]">Checking status...</p>}

        {data && (
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="font-medium">Status</dt>
            <dd>{data.status}</dd>

            <dt className="font-medium">Movies loaded</dt>
            <dd>{data.movieCount}</dd>

            <dt className="font-medium">Checked at</dt>
            <dd>{data.timestamp}</dd>
          </dl>
        )}
      </div>
    </div>
  );
}

export default Health;
