import React from 'react';

function Forecast({ forecastData }) {
  // Accessing the forecast data, result into an empty array if undefined
  const DataFore = forecastData?.forecastedData || [];

  return (
    <div>
      {/* Conditionally render the heading and forecast items only if data exists */}
      {DataFore.length > 0 && (
        <>
  
          <h2 className="mb-4 text-center text-2xl font-bold">5-Day Forecast</h2>

          <div className="flex flex-wrap justify-center space-x-4 space-y-4">
            {
              DataFore.map((data, index) => (
                <div
                  key={index}  // Each forecast item needs a unique key
                  className="p-4 bg-gray-100 rounded-lg shadow-md w-full sm:w-48" 
                >
                  {/* Display each day's data */}
                  <p className="font-bold text-lg">{data.day}</p>
                  <p className="text-md">Temperature: {Math.round(data.temp - 273.15)}°C</p>  {/* Convert Kelvin to Celsius */}
                  <p className="text-md">Weather: {data.weather}</p>
                  <p className="text-md">Wind speed: {(data.windSpeed * 3.6).toFixed(1)} Km/h</p>  {/* Convert wind speed from m/s to Km/h */}
                </div>
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Forecast;


