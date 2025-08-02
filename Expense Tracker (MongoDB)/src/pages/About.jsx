import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='w-full h-full bg-black overflow-y-auto text-[#FFD700] px-4 py-6'>
      {/* Heading */}
      <div className="sticky top-0 bg-black underline z-10 py-2">
        <Link to="/about" className='text-[#FFD700] text-4xl px-3 font-bold cursor-pointer hover:text-white transition-all duration-300'>
          About.
        </Link>
        <div className='w-full h-0.5 bg-amber-400 mt-2'></div>
      </div>

      {/* Section: Overview */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>📌 Overview</h2>
        <p className='text-base leading-relaxed'>
          Welcome to <span className="font-semibold text-white">Money Tracker</span> – your personal finance assistant designed to simplify the way you manage your money. This app helps you stay in control with clear visuals, transaction summaries, and a simple, fast interface.
        </p>
      </section>

      {/* Section: Why Use This App */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>💡 Why Use This App?</h2>
        <p className='text-base leading-relaxed'>
          Whether you're tracking daily expenses or planning a monthly budget, Money Tracker lets you easily record, edit, and analyze your financial activity. It's perfect for students, professionals, or anyone building better money habits.
        </p>
      </section>

      {/* Section: Tech Stack */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🛠️ Tech Stack</h2>
        <p className='text-base leading-relaxed'>
          This project is built with the <span className="font-semibold text-white">MERN Stack</span> — MongoDB, Express.js, React, and Node.js. There are two versions:
          <br />• <span className="text-green-400">Offline Version</span> using Local Storage
          <br />• <span className="text-blue-400">Online Version</span> using MongoDB for permanent data storage
        </p>
      </section>

      {/* Section: Our Goal */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🎯 Our Goal</h2>
        <p className='text-base leading-relaxed'>
          Our mission is to help you spend smarter, save consistently, and build a healthier financial future. This app is free, easy to use, and created with passion for productivity.
        </p>
      </section>

      {/* Section: How It Works */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>⚙️ How It Works</h2>
        <p className='text-base leading-relaxed'>
          It's super simple! Just go to the <span className="font-semibold text-white">Manage Transactions</span> page and:
        </p>
        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>Add a transaction by entering the amount, description, date, category, and type (income/expense).</li>
          <li>Your data is instantly saved either in <span className="text-green-400 font-semibold">Local Storage</span> or <span className="text-blue-400 font-semibold">MongoDB</span>.</li>
          <li>You can easily <span className="text-yellow-300 font-semibold">edit</span> or <span className="text-yellow-300 font-semibold">delete</span> any transaction anytime.</li>
          <li>On the homepage, you can view the <span className="font-semibold text-white">latest transactions</span>, check your <span className="font-semibold text-white">total balance</span>, and see a summary of <span className="text-green-400">income</span> vs <span className="text-red-400">expenses</span>.</li>
        </ul>
        <p className='mt-2'>
          Everything is fast, responsive, and fully dynamic — no reloads needed. Start tracking now!
        </p>
      </section>

    </div>
  );
};

export default About;
