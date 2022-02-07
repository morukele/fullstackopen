import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with:
      <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
