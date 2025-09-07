import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { FaStar, FaFilm, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';
import '../style/MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/movie/${id}`, {
                    params: { append_to_response: 'credits' },
                });
                setMovie(response.data);
            } catch (err) {
                setError('Não foi possível carregar os detalhes do filme.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!movie) return null;

    const director = movie.credits.crew.find(person => person.job === 'Director');

    return (
        <div className="movie-details-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
            <div className="movie-details-content">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="info">
                    <h1>{movie.title}</h1>
                    <p className="tagline">{movie.tagline}</p>
                    <div className="meta-info">
                        <span><FaStar /> {movie.vote_average.toFixed(1)}</span>
                        <span><FaCalendarAlt /> {movie.release_date.split('-')[0]}</span>
                        <span><FaClock /> {movie.runtime} min</span>
                    </div>
                    <div className="genres">
                        {movie.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
                    </div>
                    <h3>Sinopse</h3>
                    <p>{movie.overview}</p>
                    {director && <p><strong>Diretor:</strong> {director.name}</p>}
                    <button
                        onClick={() => isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)}
                        className="btn-favorite-details"
                    >
                        {isFavorite(movie.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;