import React, { useState } from 'react'
import Headings from './components/Headings'
import Search from './components/Search'
import About from './components/About'
import Contact from './components/Contact'
import WeatherCard from './components/Weathercard'
import Navbar from './components/Navbar'


const App = () => {
  const [error, setError] = useState('');

  const [weatherData, setweatherData] = useState({
    city: "",
    temp: "",
    condition: "",
    humidity: "",
    wind: "",
  })

  const fetchAPI = async (cityName) => {
    try {
      const api = await fetch("http://localhost:5000/api/weather",{
        method:"Post",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({city:cityName})
        });
      const res = await api.json();
    console.log("📦 Received from backend:", res);

      if (!res.error) {
        setweatherData(res);
        setError('');
      } else {
        setError("City not found");
      }
      console.log(res)
    } catch (error) {
      console.log("Error occurred: " + error);
      setError("Something went wrong")
    }
  };



  const handleSearch = (cityName) => {
    fetchAPI(cityName)
    console.log(cityName)

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-pink-300 to-purple-200 flex flex-col">
      <Navbar />
      <Headings />

      <div className='flex justify-center items-center flex-grow m-30'>
        <div className='bg-white w-fit h-fit items-center text-center rounded-xl shadow-lg p-8'>
          <Search onSearch={handleSearch} />
          <WeatherCard weatherData={weatherData} />
          {error && <p className='text-red-600 font-semibold'>{error}</p>}

        </div>
      </div>

      <About />
      <Contact />
    </div>
  )
}

export default App
