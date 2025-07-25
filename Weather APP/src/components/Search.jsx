import React, { useState } from 'react'
import WeatherCard from './Weathercard'

const Search = (props) => {
    const [city, setcity] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch(city);
    }

    return (
        <form className='flex justify-center mb-8' onSubmit={handleSubmit}>
            <input type="text" value={city} onChange={(e) => setcity(e.target.value)}  placeholder='Enter City name...' className='p-2 w-72 rounded-l-lg border border-gray-400 focus:outline-none' />
            <button type="submit" className='bg-blue-700 text-white px-4 py-2 rounded-r-lg hover:bg-pink-500'>
                Search
            </button>
        </form>
    )
}

export default Search
