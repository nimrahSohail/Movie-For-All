import "./App.css";
import SearchIcon from "./search.svg";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=3b77aa19";

const movie1 = {
  Title: "Italian Spiderman",
  Type: "movie",
  Year: "2007",
  imdbID: "tt2705436",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
};

function App() {
  const [movies, setmovies] = useState([]);
  const [searchItem, setsearchItem] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
  };

  //useeffect use for fetching data
  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>Movie For All</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchItem)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
