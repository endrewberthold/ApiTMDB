import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import '../style/MovieCard.css';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    return (
        <div className="movie-card">
            <img src={movie.poster_path ? imageUrl : "/placeholder.png"} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="rating">
                    <FaStar /> {movie.vote_average.toFixed(1)}
                </p>
                <div className="card-actions">
                    <Link to={`/movie/${movie.id}`} className="btn-details">Ver Detalhes</Link>
                    <button onClick={() => onToggleFavorite(movie)} className="btn-favorite">
                        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;