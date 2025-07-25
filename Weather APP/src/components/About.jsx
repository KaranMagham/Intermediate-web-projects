import React from 'react'

const About = () => {
    return (
        <div className="text-center my-10 p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">About Cloudy.</h2>
            <p className="text-gray-700 text-xl leading-relaxed">
                Cloudy. is a simple and beautiful weather app built with the MERN stack.
                You can easily search for any city's current weather, temperature, humidity, and wind speed. 
                This app uses free public APIs to fetch real-time weather data for your selected location.
                Perfect for daily use or just to stay updated on the weather!
            </p>
        </div>
    )
}

export default About
