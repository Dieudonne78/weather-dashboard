import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchField({ sendDataToparent }) {
  // OpenWeatherMap API key
  const aPIKey = 'a38831bf059a4c865e45affffb39d22e';

  // State variables for managing input, search state, and error handling
  const [city, setCity] = useState('');
  const [hasSearched, setHasSearched] = useState(false);  // Tracks whether a search has been made
  const [lastUpdated, setLastUpdated] = useState('');  // Stores the last update time
  const [error, setError] = useState(null);  // Error message in case of invalid city name

  // Days of the week array for displaying the forecast
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Object to store current and forecasted weather data
  const dataToSend = { currentData: '', forecastedData: '' };

  // Function to fetch weather data from the API
  const searchFunction = async (cityToSearch) => {
    if (!cityToSearch) {
      setError('Please enter a city name');
      return;
    }

    try {
      setError(null);  // Clear any previous error
      // Fetch current weather data
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${aPIKey}`
      );
      dataToSend.currentData = response.data;

      // Extract latitude and longitude from the response
      const { lat, lon } = response.data.coord;

      // Fetch forecast data based on latitude and longitude
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aPIKey}`
      );

      // Process the forecast data to extract daily weather information
      const dailyData = processForecastData(forecastResponse.data.list);
      dataToSend.forecastedData = dailyData;

      // Send the fetched data to the parent component
      sendDataToparent(dataToSend);

      // Update the last updated time
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      // If there is an error (e.g., invalid city), handle it and send error data to parent
      sendDataToparent(error.response?.data || {});
      setError('Invalid city name');
    }
  };

  // Function to process forecast data and extract information for each day
  const processForecastData = (list) => {
    const dailyForecasts = [];
    list.forEach((item) => {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12) {  // Take weather data at noon for each day
        const dayName = daysOfWeek[date.getDay()];  // Get the day of the week
        dailyForecasts.push({
          day: dayName,  // Day of the week
          date: date.toDateString(),  // Full date
          temp: item.main.temp,  // Temperature
          weather: item.weather[0].description,  // Weather description
          windSpeed: item.wind.speed,  // Wind speed
        });
      }
    });
    return dailyForecasts;
  };

  // Effect to automatically refresh weather data every 10 minutes (600,000 ms)
  useEffect(() => {
    if (hasSearched) {
      const intervalId = setInterval(() => {
        searchFunction(city);
      }, 600000);  // 10-minute interval

      return () => clearInterval(intervalId);  // Cleanup the interval on component unmount
    }
  }, [hasSearched, city]);  // Dependencies: hasSearched and city

  // Handle user input and update city state
  const userInput = (event) => {
    setCity(event.target.value);
  };

  // Trigger search when the user clicks the search button
  const handleSearch = () => {
    searchFunction(city);
    setHasSearched(true);  // Mark that the user has searched
  };

  return (
    <div className="relative p-4 max-w-lg mx-auto">
     
      <h2 className="text-2xl font-bold mb-4 text-center">Weather Dashboard</h2>
      
      <p className="text-lg text-center md:text-left ml-0 md:ml-3">Enter a city name</p>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Kigali or any city name"
          onChange={userInput}
          value={city}
        />
        <button
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 w-24"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {/* Show the last update time if available */}
      {lastUpdated && (
        <p className="text-white-500 mt-4 text-center">
          Last updated at: {lastUpdated}
        </p>
      )}
    </div>
  );
}

export default SearchField;
