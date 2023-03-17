import { useState, useEffect } from "react";

import SearchIcon from './search.svg';
import './App.css';

import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    const searchMovies = async (title, pageNumber = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}&s=${title}&page=${pageNumber}`);
            const data = await response.json();

            if (data.Response === 'True') {
                if (pageNumber > 1) {
                    setMovies(prevMovies => [...prevMovies, ...data.Search]);
                } else {
                    setMovies(data.Search);
                }
            } else {
                setError(data.Error);
            }
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
        }
        setIsLoading(false);
    };

    const loadMoreMovies = () => {
        setPage(prevPage => prevPage + 1);
        searchMovies(searchTerm, page + 1);
    };

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => {
                        setPage(1);
                        searchMovies(searchTerm);
                    }}
                />
            </div>

            {isLoading ? (
                <div className='empty'>
                    <h2>Loading movies...</h2>
                </div>
            ) : error ? (
                <div className='empty'>
                    <h2>{error}</h2>
                </div>
            ) : movies.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                    <button className='load-more' onClick={loadMoreMovies}>Load more</button>
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
};

export default App;




{/*  
import  { useState, useEffect } from "react";

import SearchIcon from './search.svg';
import './App.css'; 
import MovieCard from './MovieCard';


// f612a945
const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a'

const App =() => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect( () => {
        searchMovies('Batman');
    }, []);
    

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);

    };

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                placeholder = 'Search for movies'
                value = {searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                />
             <img
                src={SearchIcon}
                alt = 'search'
                onClick={() => searchMovies(searchTerm)}
            />  
            </div> 

        {
            movies?.length > 0
                ? (
                    <div className = 'container'>
                         {movies.map((movie)=>(
                            <MovieCard movie = {movie} />
                         ))}
                     </div>
                ) : (
                    <div className = 'empty'>
                        <h2>No movies found</h2>
                    </div>
                )         
        }
        </div>
    );
};


export default App; 



*/}