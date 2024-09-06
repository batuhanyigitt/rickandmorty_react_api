import React from "react";

const GenderFilter = ({ setGender }) => {
  return (
    <select onChange={(e) => setGender(e.target.value)}>
      <option value="">All</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Genderless">Genderless</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

export default GenderFilter;
