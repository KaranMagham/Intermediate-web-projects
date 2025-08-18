import React from 'react'
import AlarmClock from '../components/AlarmClock';
import { Link } from 'react-router-dom';

const Alarm = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] text-red-500 px-4 py-6 overflow-y-auto'>

      {/* Heading */}
      <div className="sticky top-0 bg-black z-10 ">
        <Link to="/about" className='text-red-500 text-3xl px-3 font-bold cursor-pointer hover:text-red-400 transition-all duration-300'>
          Alarm.
        </Link>
        <div className='w-full h-0.5 bg-red-500 mt-5'></div>
      </div>

      {/* Alarm Clock */}
      <div>
        <AlarmClock/>
        </div>
    </div>
  )
}

export default Alarm