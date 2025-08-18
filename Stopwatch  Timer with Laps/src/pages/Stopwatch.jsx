import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [lapz, setlapz] = useState([]);
  const [runner, setrunner] = useState(false);
  const [savetime, setsavetime] = useState(0);

  const intervalRef = useRef(null)

  const handleStart = () => {
    if (!runner) {
      setrunner(true);
      intervalRef.current = setInterval(() => {
        setsavetime(prev => prev + 10);
      }, 10);
    }
  }
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setrunner(false);
  }

  const handleLap = () => {
      setlapz(prev => [...prev, savetime])
  }

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setrunner(false);
    setsavetime(0);
    setlapz([]);
  };


  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);


  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-zinc-800 px-4 py-6 text-white'>

      {/* Top Navbar */}
      <div className="sticky top-0 z-10 bg-black py-2 mb-6 shadow-lg">
        <Link to="/stopwatch" className='text-3xl font-bold text-red-500 px-3 hover:text-red-400 transition-all duration-300'>
          Stopwatch.
        </Link>
        <div className='w-full h-0.5 bg-red-500 mt-2'></div>
      </div>

      {/* STOPWATCH */}
      <div className='flex justify-center items-center'>
        <div className='text-[#f1faee] text-5xl sm:text-6xl md:text-7xl w-80 font-bold border-4 border-red-600 rounded-2xl px-3 py-4 shadow-lg bg-gradient-to-br from-[#171717] to-[#3e3e3e] animate-fadeIn'>
          {formatTime(savetime)}
        </div>
      </div>

      {/* Button */}
      <div className='flex gap-10 items-center justify-center'>
        <button type="submit" onClick={handleStart} className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded text-white mt-2">
          Start
        </button>
        <button type="submit" onClick={handleStop} className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded text-white mt-2">
          Stop
        </button>
        <button type="submit" onClick={handleLap} className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded text-white mt-2">
          Lap
        </button>
      </div>
      {/* Laps */}
      <div className='mt-6 max-w-md mx-auto bg-[#1a1a1a] rounded-xl p-4 shadow-md'>
        <h2 className='text-xl font-semibold text-center mb-3'>Laps</h2>
        <button type="submit" onClick={handleReset} className="bg-red-500 hover:bg-red-600 transition mb-3 px-4 py-2 rounded text-white mt-2">
          Reset
        </button>
        <ul className='space-y-2 max-h-60 overflow-y-auto'>
          {lapz.map((lap, index) => (
            <li key={index} className='bg-zinc-800 px-4 py-2 rounded-md flex justify-between items-center'>
              <span className='text-sm text-gray-300'>Lap {index + 1}</span>
              <span className='font-mono text-white'>{formatTime(lap)}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Stopwatch;
