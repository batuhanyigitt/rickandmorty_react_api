import React from "react";

const StatusFilter = ({ setStatus }) => {
  return (
    <select
      onChange={(e) => setStatus(e.target.value)}
      className="filter-select"
    >
      <option value="">All Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

export default StatusFilter;
