const API_KEY = "d96101d87d0815dcfbe8ef2f9eb22594"; // Replace with your valid API key
const BASE_URL = "https://api.themoviedb.org/3";
const GENRE_URL = `${BASE_URL}/genre/movie/list?language=en&api_key=${API_KEY}`;
const MOVIE_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=`;

const TV_SHOWS_URL = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTYxMDFkODdkMDgxNWRjZmJlOGVmMmY5ZWIyMjU5NCIsIm5iZiI6MTc0MDIwMTEzOC41MzcsInN1YiI6IjY3Yjk1Y2IyYmQ0OGU4OTI0Y2JlYTMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dZulIUVMlUy916dmX3DaxI0NRZyWB2gpgOCn_UKNC40"; // Bearer Token

// Function to fetch and display genres
function fetchGenres() {
  fetch(GENRE_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Genres:", data);
      const genreList = document.getElementById("genreList");
      
      if (genreList) {
        genreList.innerHTML = ""; // Clear previous genres

        if (!data.genres || data.genres.length === 0) {
          genreList.innerHTML = "<p>No genres found.</p>";
          return;
        }

        data.genres.forEach((genre) => {
          const genreItem = document.createElement("button");
          genreItem.classList.add("genre-button");
          genreItem.textContent = genre.name;
          genreItem.dataset.genreId = genre.id;

          // Fetch movies when a genre is clicked
          genreItem.addEventListener("click", () => fetchMoviesByGenre(genre.id, genre.name));

          genreList.appendChild(genreItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching genres:", error);
      const genreList = document.getElementById("genreList");
      if (genreList) {
        genreList.innerHTML = "<p>Failed to load genres. Please try again later.</p>";
      }
    });
}

// Function to fetch movies by genre
function fetchMoviesByGenre(genreId, genreName) {
  const url = MOVIE_URL + genreId;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Movies in ${genreName}:`, data);
      const movieGrid = document.getElementById("movieGrid");
      if (movieGrid) {
        movieGrid.innerHTML = ""; // Clear previous movies

        if (!data.results || data.results.length === 0) {
          movieGrid.innerHTML = `<p>No movies found for ${genreName}.</p>`;
          return;
        }

        data.results.forEach((movie) => {
          const movieItem = document.createElement("div");
          movieItem.classList.add("movie-item");
          movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            <div class="overlay">
              <a href="https://www.imdb.com/title/${movie.id}" target="_blank">
                <span>${movie.title}</span>
              </a>
            </div>
          `;
          movieGrid.appendChild(movieItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      const movieGrid = document.getElementById("movieGrid");
      if (movieGrid) {
        movieGrid.innerHTML = "<p>Failed to load movies. Please try again later.</p>";
      }
    });
}
                                                         /*TV SHOWS API */
// Function to fetch TV shows (new API)
function fetchTVShows() {
  fetch(TV_SHOWS_URL, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
      "accept": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched TV Shows:", data);
      const tvShowGrid = document.getElementById("tvShowGrid");
      if (tvShowGrid) {
        tvShowGrid.innerHTML = ""; // Clear previous TV shows

        if (!data.results || data.results.length === 0) {
          tvShowGrid.innerHTML = "<p>No TV shows found.</p>";
          return;
        }

        data.results.forEach((tvShow) => {
          const tvShowItem = document.createElement("div");
          tvShowItem.classList.add("tv-show-item");
          tvShowItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}" alt="${tvShow.name}" />
            <div class="overlay">
              <a href="https://www.imdb.com/title/${tvShow.id}" target="_blank">
                <span>${tvShow.name}</span>
              </a>
            </div>
          `;
          tvShowGrid.appendChild(tvShowItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching TV shows:", error);
      const tvShowGrid = document.getElementById("tvShowGrid");
      if (tvShowGrid) {
        tvShowGrid.innerHTML = "<p>Failed to load TV shows. Please try again later.</p>";
      }
    });
}

// Load genres and TV shows when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchGenres();
  fetchTVShows(); // Fetch TV shows in addition to genres and movies
});

// Sample data (replace with actual API response)
const genres = ["Action", "Comedy", "Drama", "Thriller", "Romance"];

// Get the genre container
const genreList = document.getElementById("genreList");

// Dynamically create genre boxes
if (genreList) {
  genres.forEach((genre) => {
    const genreBox = document.createElement("a");
    genreBox.href = "#"; // Link to specific genre page or API filter
    genreBox.classList.add("genre-box");
    genreBox.textContent = genre;

    // Append each genre box to the genre container
    genreList.appendChild(genreBox);
  });
}
