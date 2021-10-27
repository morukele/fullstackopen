import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [direction, setDirection] = useState(0);
  const [icon, setIcon] = useState("10d");

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((res) => setWeatherData(res.data));
  }, [capital]);

  if (weatherData !== null) {
    const { main, wind, weather } = weatherData;

    setTemp(main.temp);
    setIcon(weather.icon);
    setWindSpeed(wind.speed);
    setDirection(wind.direction);

    return (
      <div>
        <h2>{`Weather in ${capital}`}</h2>
        <div>
          <p>
            <strong>Temperature: </strong>
            {temp} Celcius
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt={"Weather Icon"}
          />
          <p>
            <strong>Wind: </strong>
            {windSpeed} Km/h about {direction} degrees
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>{`Weather in ${capital}`}</h2>
      <p>An error occured...</p>
      <p>Please try again later</p>
    </div>
  );
};

export default Weather;
