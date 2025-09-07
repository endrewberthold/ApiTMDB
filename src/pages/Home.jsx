import { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';
import '../style/Home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

console.log('Chave da API lida pelo Vite:', import.meta.env.API_KEY);

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    const searchMovies = async (searchQuery, pageNum) => {
        if (!searchQuery) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/search/movie', {
                params: { query: searchQuery, page: pageNum },
            });
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            setError('Erro ao buscar filmes. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/movie/popular');
            setMovies(response.data.results);
            setTotalPages(1); // Simplificando para a home
        } catch (err) {
            setError('Não foi possível carregar os filmes populares.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        searchMovies(query, 1);
    };

    const handleToggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        searchMovies(query, newPage);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busque por um filme..."
                />
                <button type="submit">Buscar</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="movies-container">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isFavorite={isFavorite(movie.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {page > 1 && <button onClick={() => handlePageChange(page - 1)}>Anterior</button>}
                    <span>Página {page} de {totalPages}</span>
                    {page < totalPages && <button onClick={() => handlePageChange(page + 1)}>Próxima</button>}
                </div>
            )}
        </div>
    );
};

export default Home;