const WeatherContainer = ({ weatherData }) => {
  return (
    <div>
      <p>
        Today it will be {weatherData.conditions} in {weatherData.location} with a temperature of {weatherData.temp}°C
      </p>
    </div>
  );
};

export default WeatherContainer;
