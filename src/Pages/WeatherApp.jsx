import React, { useState, useEffect } from "react";
import { IoSearch, IoInformationCircle } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Error } from "@/components";

function WeatherApp() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Jaipur");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showJson, setShowJson] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          setError("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError("");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [city]);

  const handleSearch = () => {
    setCity(search);
  };

  const handleToggleJson = () => {
    setShowJson(!showJson);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md rounded-lg shadow-lg bg-gray-900">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-2xl font-bold mb-4">
            Weather in {city}
          </CardTitle>
          <div className="flex w-full mb-4 relative">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="ghost"
              onClick={handleSearch}
              className="ml-2 absolute right-0"
            >
              <IoSearch />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <Error message={error} />
          ) : (
            <div>
              <h1 className="temp text-5xl font-bold mb-4 text-center">
                {weather.main?.temp}°C
              </h1>
              <div className="flex items-center justify-center mb-4">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`}
                  alt=""
                  className="icon transition-transform duration-1000 transform rotate-360"
                />
                <div className="description text-xl ml-2">
                  {weather.weather?.[0].description}
                </div>
              </div>
              <div className="humidity text-lg text-center">
                Humidity: {weather.main?.humidity}%
              </div>
              <div className="wind text-lg text-center">
                Wind speed: {weather.wind?.speed} km/h
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center mt-4 flex justify-between">
          <h4 className="text-xs mt-2">5 min weather App</h4>
          <Button
            variant="secondary"
            onClick={handleToggleJson}
            className="hidden sm:flex"
          >
            <IoInformationCircle className="mr-2" />
            {showJson ? "Hide JSON" : "Show JSON"}
          </Button>
        </CardFooter>
      </Card>
      {showJson && (
        <div className="h-5/6 fixed right-0 p-4 bg-gray-800 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800">
          <pre className="text-sm">{JSON.stringify(weather, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
