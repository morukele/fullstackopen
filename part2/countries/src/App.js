import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry("");
  };

  const handleShowClick = (e) => {
    setSelectedCountry(e.target.value);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries
        filteredCountries={filteredCountries}
        handleShowClick={handleShowClick}
        selectedCountry={selectedCountry}
      />
    </div>
  );
}

export default App;
