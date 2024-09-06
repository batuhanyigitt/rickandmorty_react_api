import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CharacterDetail.css"; 

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);
        setError(null); 
      } catch (err) {
        setError("An error occurred while fetching character details.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>; 
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; 
  }

  if (!character) {
    return <p>Loading...</p>;
  }

  return (
    <div className="character-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <div className="character-info">
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <div className="character-details">
          <h2>{character.name}</h2>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
