function WeatherInfo({ data }) {
  // Function to convert temperature from Kelvin to Celsius
  function kelvinToCelsius(number) {
    return number ? (number - 273.15).toFixed(2) : '0';
  }

  // Handle the case where city is not found (Error 404)
  if (data?.cod === 404) {
    return (
      <div>
        <h3 className="text-red-500 text-center">Error: {data?.message}</h3>
      </div>
    );
  }

  // extracting weather data or show default values
  const weatherDescription = data?.currentData?.weather?.[0]?.description;
  const weatherIcon = data?.currentData?.weather?.[0]?.icon || null;
  const weatherIconUrl = weatherIcon ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` : '';
  
  // getting the temperature
  const temperature = kelvinToCelsius(data?.currentData?.main?.temp);

  return (
    <div className="flex flex-col items-end">
    
      {temperature !== '0' && (
        <>
          <h2 className="text-4xl font-bold">Current weather data</h2>
          <h3 className="text-4xl font-bold">Temperature: {temperature}°C</h3>
        </>
      )}
  
      <p className="text-yellow-300">{weatherDescription}</p>
      
      {weatherIcon && (
        <img
          src={weatherIconUrl}
          alt="Weather icon"
          className="w-12 h-12"
        />
      )}
    </div>
  );
  
}

export default WeatherInfo;
