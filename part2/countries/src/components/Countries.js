import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ capital, apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setWeatherData(response.data))
      .catch((e) => {
        setWeatherData(null);
        console.log(e);
      });
  }, [url]);

  if (weatherData) {
    const { main, wind, weather } = weatherData;
    return (
      <div>
        <h2>{`Weather in ${capital}`}</h2>
        <p>
          <strong>Temperature: {main.temp} degrees celcius</strong>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={"Weather icon"}
        />
        <p>
          <strong>
            Wind: {wind.speed} km/h in {wind.deg} degrees
          </strong>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>{`Weather in ${capital}`}</h2>
      <p>Cannot reach weather service at the moment...</p>
    </div>
  );
};

const Country = ({ country, apiKey }) => {
  const { name, capital, population, languages, flags } = country;

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>

      <h2>languages</h2>
      {languages.map((l) => (
        <li key={l.name}>{l.name}</li>
      ))}

      <div>
        <img src={flags.png} alt={`flag of ${name}`} width={200} />
      </div>

      <Weather capital={capital} apiKey={apiKey} />
    </div>
  );
};

const Countries = ({ filteredCountries, handleShowClick, selectedCountry }) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (selectedCountry !== null) {
    return <Country country={selectedCountry} apiKey={apiKey} />;
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} apiKey={apiKey} />;
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
