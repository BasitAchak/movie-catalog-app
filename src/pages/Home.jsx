import { useEffect, useMemo, useState } from "react";
import { movies, genres } from "../data/movies";

function Home({ user, onLogout }) {
  const storageKey = `reelspace-favorites-${user.uid}`;

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedMovie(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query);

      const matchesGenre =
        genre === "All" || movie.genre === genre;

      const matchesFavorites =
        !showFavorites || favorites.includes(movie.id);

      return (
        matchesSearch &&
        matchesGenre &&
        matchesFavorites
      );
    });
  }, [search, genre, showFavorites, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setGenre("All");
    setShowFavorites(false);
  };

  return (
    <div className="app-shell">

      <header className="navbar">

        <button
          className="brand"
          onClick={clearFilters}
        >
          <span className="brand-icon">▶</span>
          ReelSpace
        </button>

        <div className="search-wrapper">
          <span>⌕</span>

          <input
            type="search"
            placeholder="Search movies, series, or genres..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="nav-actions">

          <span
            className="user-chip"
            title={user.email}
          >
            {user.email?.charAt(0).toUpperCase()}
          </span>

          <button
            className={
              showFavorites
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() =>
              setShowFavorites((current) => !current)
            }
          >
            ♥
            <span>Favorites</span>

            {favorites.length > 0 && (
              <b className="favorite-count">
                {favorites.length}
              </b>
            )}
          </button>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>
      </header>

      <main>

        <section className="hero">

          <div className="hero-content">

            <span className="eyebrow">
              YOUR PERSONAL CINEMA
            </span>

            <h1>
              Discover something
              <br />
              worth watching.
            </h1>

            <p>
              Explore memorable movies and series,
              find your next favorite, and build
              a personal collection of titles you love.
            </p>

            <div className="hero-actions">

              <button
                className="hero-button"
                onClick={() =>
                  document
                    .getElementById("catalogue")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore catalogue ↓
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  setShowFavorites(true)
                }
              >
                View favorites
              </button>

            </div>

            <small className="user-email">
              Signed in as {user.email}
            </small>

          </div>

          <button
            className="hero-poster"
            onClick={() =>
              setSelectedMovie(movies[1])
            }
          >
            <img
              src={movies[1].image}
              alt="Interstellar poster"
            />

            <div className="poster-overlay">

              <span>Featured title</span>

              <strong>
                Interstellar
              </strong>

              <small>
                2014 · Sci-Fi · ★ 8.7
              </small>

            </div>

          </button>

        </section>

        <section
          className="catalogue"
          id="catalogue"
        >

          <div className="section-heading">

            <div>

              <span className="eyebrow">
                EXPLORE
              </span>

              <h2>
                {showFavorites
                  ? "Your Favorites"
                  : "Browse Titles"}
              </h2>

            </div>

            <span className="result-count">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1
                ? "title"
                : "titles"}
            </span>

          </div>

          <div className="filters">

            {genres.map((item) => (
              <button
                key={item}
                className={
                  genre === item
                    ? "filter active"
                    : "filter"
                }
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}

          </div>

          {filteredMovies.length === 0 ? (

            <div className="empty-state">

              <div>🎬</div>

              <h3>
                No titles found
              </h3>

              <p>
                Try another search or remove
                some filters.
              </p>

              <button
                className="hero-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>

            </div>

          ) : (

            <div className="movie-grid">

              {filteredMovies.map((movie) => (

                <article
                  className="movie-card"
                  key={movie.id}
                >

                  <div className="poster-container">

                    <button
                      className="poster-click"
                      onClick={() =>
                        setSelectedMovie(movie)
                      }
                      aria-label={`View ${movie.title}`}
                    >
                      <img
                        src={movie.image}
                        alt={`${movie.title} poster`}
                      />

                      <span className="poster-hint">
                        View details
                      </span>
                    </button>

                    <button
                      className={
                        favorites.includes(movie.id)
                          ? "favorite active"
                          : "favorite"
                      }
                      onClick={() =>
                        toggleFavorite(movie.id)
                      }
                      aria-label={
                        favorites.includes(movie.id)
                          ? "Remove favorite"
                          : "Add favorite"
                      }
                    >
                      {favorites.includes(movie.id)
                        ? "♥"
                        : "♡"}
                    </button>

                    <span className="rating">
                      ★ {movie.rating}
                    </span>

                  </div>

                  <div className="movie-details">

                    <h3>
                      {movie.title}
                    </h3>

                    <div className="metadata">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.type}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

      <footer>

        <span>
          ReelSpace
        </span>

        <span>
          React + Firebase · Personal movie discovery
        </span>

      </footer>

      {selectedMovie && (

        <div
          className="modal-backdrop"
          onMouseDown={() =>
            setSelectedMovie(null)
          }
        >

          <section
            className="movie-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedMovie(null)
              }
            >
              ×
            </button>

            <img
              src={selectedMovie.image}
              alt=""
            />

            <div className="modal-content">

              <span className="eyebrow">
                {selectedMovie.genre}
              </span>

              <h2>
                {selectedMovie.title}
              </h2>

              <div className="modal-meta">

                <span>
                  {selectedMovie.year}
                </span>

                <span>•</span>

                <span>
                  {selectedMovie.type}
                </span>

                <span>•</span>

                <strong>
                  ★ {selectedMovie.rating}
                </strong>

              </div>

              <p>
                {selectedMovie.description}
              </p>

              <button
                className="hero-button"
                onClick={() =>
                  toggleFavorite(selectedMovie.id)
                }
              >
                {favorites.includes(
                  selectedMovie.id
                )
                  ? "♥ Remove from favorites"
                  : "♡ Add to favorites"}
              </button>

            </div>

          </section>

        </div>

      )}

    </div>
  );
}

export default Home;