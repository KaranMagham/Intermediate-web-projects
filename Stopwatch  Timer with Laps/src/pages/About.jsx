import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] text-red-500 px-4 py-6 overflow-y-auto'>

      {/* Heading */}
      <div className="sticky top-0 bg-black z-10 ">
        <Link to="/about" className='text-red-500 text-3xl px-3 font-bold cursor-pointer hover:text-red-400 transition-all duration-300'>
          About Zaptime.
        </Link>
        <div className='w-full h-0.5 bg-red-500 mt-3'></div>
      </div>

      {/* Section: Overview */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>⚡ Overview</h2>
        <p className='text-base leading-relaxed'>
          <span className="font-semibold text-[#f1e5e5]">Zaptime</span> is a modern stopwatch and time-tracking app with a stylish dark-themed UI and dynamic lap tracking. Designed for athletes, students, and productivity lovers — it helps you time tasks, monitor laps, and stay organized with precision and flair.
        </p>
      </section>

      {/* Section: Why Use Zaptime? */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🚀 Why Use Zaptime?</h2>
        <p className='text-base leading-relaxed'>
          Whether you're timing workouts, coding sessions, or everyday tasks, Zaptime keeps your moments on track. With lap logs, real-time updates, and a blazing-fast interface — you get control, speed, and style in one place.
        </p>
      </section>

      {/* Section: Tech Stack */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🧰 Tech Stack</h2>
        <p className='text-base leading-relaxed'>
          Built using the <span className="font-semibold text-white">MERN Stack</span> — MongoDB, Express.js, React, and Node.js. Styled with Tailwind CSS.
          <br />• <span className="text-green-500">Local Version</span>: Uses Browser Local Storage
          <br />• <span className="text-blue-500">Cloud Version</span>: Stores data using MongoDB
        </p>
      </section>

      {/* Section: App Features */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🧩 Key Features</h2>
        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>📍 Minimalist & responsive UI with red-dark theme</li>
          <li>⏱️ Stopwatch with start, pause, reset controls</li>
          <li>🏁 Lap timer with lap list and total duration tracking</li>
          <li>🕒 Time page with dynamic clock display</li>
          <li>📇 About & Contact pages for clean navigation</li>
        </ul>
      </section>

      {/* Section: Goal */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🎯 Our Goal</h2>
        <p className='text-base leading-relaxed'>
          Zaptime is built for productivity, speed, and simplicity. We aim to create tools that are visually appealing, lightweight, and functional for daily use — whether you're managing your workouts, timing projects, or tracking your routines.
        </p>
      </section>

    </div>
  );
};

export default About;
