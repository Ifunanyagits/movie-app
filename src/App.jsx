import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css'
import SearchIcon from './search.svg';

// Static variable
const API_URL = 'http://www.omdbapi.com?apikey=84d6cf0';

const movie1 = {
        "Title": "Titanic",
        "Year": "1997",
        "imdbID": "tt0120338",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)

    }

    useEffect(() => {
        searchMovies('Titanic')
    }, []);

    return (
        <div className='app'>
            <h1>Emlo</h1>

            <div className='search'>
                <input 
                    placeholder='Search movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) =>(
                            <MovieCard movie={movie} />
                        ))}
                    </div>  
                ) :
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App