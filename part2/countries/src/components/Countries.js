import React from "react";
import Weather from "./Weather";

const Countries = ({ filteredCountries, handleShowClick, selectedCountry }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length === 1 || selectedCountry !== "") {
    const { name, capital, population, languages, flags } =
      filteredCountries[0];

    return (
      <div>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>

        <h2>Languages</h2>
        {languages.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}

        <img src={flags.png} alt={`flag of ${name}`} width={200} />
        <Weather capital={capital} />
      </div>
    );
  }

  return (
    <div>
      {filteredCountries.map((c) => {
        const { name, numericCode } = c;

        return (
          <div key={numericCode}>
            <p>
              {name}{" "}
              <button onClick={handleShowClick} value={name}>
                show
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
