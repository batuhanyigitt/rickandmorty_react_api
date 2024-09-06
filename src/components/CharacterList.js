import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import GenderFilter from "./GenderFilter";
import StatusFilter from "./StatusFilter";
import SpeciesFilter from "./SpeciesFilter";
import { toast } from "react-toastify";
import "./CharacterList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const cache = {};
  const CACHE_TIMEOUT = 5 * 60 * 1000;

  const localStorageKey = "rickAndMortyCharacterCache";
  const savedCache = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  let page = parseInt(searchParams.get("page")) || 1;
  let searchTerm = searchParams.get("name") || "";
  let gender = searchParams.get("gender") || "";
  let status = searchParams.get("status") || "";
  let species = searchParams.get("species") || "";

  if (isNaN(page) || page < 1) {
    page = 1;
    setSearchParams({ page: 1 });
  }

  const validGenders = ["male", "female", "genderless", "unknown"];
  const validStatus = ["alive", "dead", "unknown"];
  const validSpecies = ["human", "alien", "robot", "mythological", "unknown"];

  if (gender && !validGenders.includes(gender.toLowerCase())) {
    gender = "";
    setSearchParams({ page });
  }

  if (status && !validStatus.includes(status.toLowerCase())) {
    status = "";
    setSearchParams({ page });
  }

  if (species && !validSpecies.includes(species.toLowerCase())) {
    species = "";
    setSearchParams({ page });
  }

  const fetchData = async () => {
    setLoading(true);

    const cacheKey = `${page}-${searchTerm}-${gender}-${status}-${species}`;
    const now = Date.now();

    if (
      savedCache[cacheKey] &&
      now - savedCache[cacheKey].timestamp < CACHE_TIMEOUT
    ) {
      setCharacters(savedCache[cacheKey].data.results);
      setTotalPages(savedCache[cacheKey].data.info.pages);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character`,
        {
          params: { page, name: searchTerm, gender, status, species },
        }
      );

      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);

      const newCache = {
        ...savedCache,
        [cacheKey]: {
          data: response.data,
          timestamp: now,
        },
      };
      localStorage.setItem(localStorageKey, JSON.stringify(newCache));

      setError(null);
    } catch (err) {
      setError("An error occurred while fetching character data.");
      toast.error("Error fetching character data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm, gender, status, species]);

  const updateSearchParams = (newPage, newFilters = {}) => {
    const params = {
      page: newPage,
      name: newFilters.name || searchTerm,
      gender: newFilters.gender || gender,
      status: newFilters.status || status,
      species: newFilters.species || species,
    };

    for (let key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({ page: 1 });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${page === i ? "active" : ""}`}
          onClick={() => updateSearchParams(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="character-list-container">
      <div className="filter-bar">
        <SearchBar
          setSearchTerm={(value) => updateSearchParams(1, { name: value })}
        />
        <GenderFilter
          setGender={(value) => updateSearchParams(1, { gender: value })}
        />
        <StatusFilter
          setStatus={(value) => updateSearchParams(1, { status: value })}
        />
        <SpeciesFilter
          setSpecies={(value) => updateSearchParams(1, { species: value })}
        />
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {loading && <div className="spinner"></div>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && (
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
        <button
          onClick={() => updateSearchParams(1)}
          disabled={page === 1}
        >
          First
        </button>
        <button
          onClick={() => updateSearchParams(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="pagination-numbers">{renderPageNumbers()}</div>
        <button
          onClick={() => updateSearchParams(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => updateSearchParams(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
