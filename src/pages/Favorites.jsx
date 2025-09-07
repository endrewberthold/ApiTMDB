import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import '../style/Home.css';

const Favorites = () => {
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleToggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <div className="container">
            <h2>Meus Favoritos</h2>
            {favorites.length === 0 ? (
                <p>Você ainda não adicionou nenhum filme aos favoritos.</p>
            ) : (
                <div className="movies-container">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;