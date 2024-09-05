import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import GenderFilter from "./GenderFilter";
import "./CharacterList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useEffect(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character`,
          {
            params: { page, name: searchTerm, gender },
          }
        );
        setCharacters(response.data.results);
        setError(null);
      } catch (err) {
        setError("An error occured while fetching character data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm, gender]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <GenderFilter setGender={setGender} />

      {Loading && <div className="spinner"></div>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!Loading && (
        <div className="character-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <Link to={`/character/${character.id}`}>
                <img src={character.image} alt={character.name} />
                <h3>{character.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default CharacterList;
