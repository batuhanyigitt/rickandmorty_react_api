import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteCharacters")) || [];
    setFavoriteCharacters(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Your Favorite Characters</h1>
      {favoriteCharacters.length === 0 ? (
        <p>You have no favorite characters yet!</p>
      ) : (
        <div className="character-grid">
          {favoriteCharacters.map((characterId) => (
            <Link key={characterId} to={`/character/${characterId}`}>
              <div className="character-card">
                <img
                  src={`https://rickandmortyapi.com/api/character/avatar/${characterId}.jpeg`}
                  alt="Favorite Character"
                />
                <h3>Character {characterId}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
