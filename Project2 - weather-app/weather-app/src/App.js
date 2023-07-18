import React, { useEffect, useState } from "react";

import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";

function App() {
  const [query, setQuery] = useState({ q: "mumbai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          console.log(data);
          setWeather(data);
        });
      } catch (error) {
        console.log("Error fetching weather data: ", error);
      }
    };
    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />

      {weather && (
        <div>
          <TimeAndLocation />
          <TemperatureAndDetails />

          <Forecast title="hourly forecast" />
          <Forecast title="daily forecast" />
        </div>
      )}
    </div>
  );
}

export default App;
