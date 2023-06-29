import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import searchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=62650ba0";

const movie = {
  Title: "Rogue One: A Star Wars Story",
  Year: "2016",
  imdbID: "tt3748528",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searcMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // return data;
    setMovies(data.Search);
  };

  useEffect(() => {
    searcMovies("Star Wars");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searcMovies(searchTerm)}
        />
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
};

export default App;
