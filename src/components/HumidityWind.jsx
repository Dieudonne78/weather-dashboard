import React from "react";

function HumidityWind({ data }) {
  // Function to convert wind speed from meters per second to kilometers per hour
  function convertWindSpeedToKmph(speedInMps) {
    return speedInMps * 3.6; // Conversion factor
  }

  // Check if data is defined and if there's an error
  if (data) {
    if (data?.cod === 404) {
      return <div><h3 className="text-red-700">{data?.message}</h3></div>; // Error message styling
    }
  }

  const humidity=data?.currentData?.main?.humidity;
  const speedOfWind= convertWindSpeedToKmph(data?.currentData?.wind?.speed ?? 0).toFixed(0);
  return (
    <div className="flex space-x-4 mt-2 text-black-600 justify-center"> 
      <div className="flex flex-col items-center"> 
        <p className="text-xl">{humidity !== undefined ? `Humidity:${humidity}%` :''}</p>
      </div>
      <div className="flex flex-col items-center"> 
        <p className="text-xl">{speedOfWind !== '0' ? `Wind speed:${speedOfWind}Km/h` :''}</p>
      </div>
    </div>
  );
}

export default HumidityWind;
