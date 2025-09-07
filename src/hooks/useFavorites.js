import { useState, useEffect, useCallback } from "react";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites)
    }, []);

    const addFavorite = useCallback((movie) => {
        const newFav = [...favorites, movie];
        setFavorites(newFav)
        localStorage.setItem('favorites', JSON.stringify(newFav));
    }, [favorites])

    const removeFavorite = useCallback((movieId) => {
        const newFav = favorites.filter((fav) => fav.id !== movieId);
        setFavorites(newFav)
        localStorage.setItem('favorites', JSON.stringify(newFav));
    }, [favorites])

    const isFavorite = useCallback((movieId) => {
        return favorites.some((fav) => fav.id === movieId);
    }, [favorites])

    return { favorites, addFavorite, removeFavorite, isFavorite }
}