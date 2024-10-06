import React from 'react'; 
import WeatherInfo from './WeatherInfo';
import HumidityWind from './HumidityWind';
import Forecast from './Forecast';

function WeatherCard({ dataToDisplay }) {
  // Assuming forecast data is in the 'daily' property of the response
  const forecastData = dataToDisplay?.daily || []; // Extract forecast data safely


  return (
    <div className="flex flex-col items-end">

      {dataToDisplay ? (
        <>
          <WeatherInfo data={dataToDisplay} />
          <HumidityWind data={dataToDisplay} />
          <Forecast forecastData={dataToDisplay} /> 
        </>

      ) : (
        ''
      )}
    </div>
  );
}

export default WeatherCard;