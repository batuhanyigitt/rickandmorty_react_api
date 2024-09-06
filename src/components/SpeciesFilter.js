import React from "react";

const SpeciesFilter = ({ setSpecies }) => {
  return (
    <select
      onChange={(e) => setSpecies(e.target.value)}
      className="filter-select"
    >
      <option value="">All Species</option>
      <option value="human">Human</option>
      <option value="alien">Alien</option>
      <option value="robot">Robot</option>
      <option value="mythological">Mythological</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

export default SpeciesFilter;
