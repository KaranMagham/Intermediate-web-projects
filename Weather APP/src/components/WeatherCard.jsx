import React from 'react'

const WeatherCard = ({weatherData}) => {
  const { city, temp, condition, humidity, wind } = weatherData || {};
  
  return (
    <div className="bg-white rounded-xl w-80 mx-auto shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{city}</h2>
      <h1 className="text-5xl font-extrabold text-gray-800 mb-2">{temp}°C</h1>
      <p className="text-lg italic text-gray-500 mb-4">{condition}</p>

      <div className="flex justify-between text-gray-600 text-sm mt-4">
        <p>Humidity: <span className="font-semibold">{humidity}%</span></p>
        <p>Wind: <span className="font-semibold">{wind} km/h</span></p>
      </div>
    </div>
  )
}

export default WeatherCard
