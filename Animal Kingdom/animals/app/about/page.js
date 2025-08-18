import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] text-red-500 px-4 py-6 overflow-y-auto'>

      {/* Heading */}
      <div className="sticky top-0 bg-black z-10 ">
        <Link href="/about" className='text-red-500 text-3xl px-3 font-bold cursor-pointer hover:text-red-400 transition-all duration-300'>
          About PawPedia.
        </Link>
        <div className='w-full h-0.5 bg-red-500 mt-5 '></div>
      </div>

      {/* Section: Overview */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🌍 Overview</h2>
        <p className='text-base leading-relaxed'>
          <span className="font-semibold text-[#f1e5e5]">PawPedia</span> is a modern web app designed to help you explore, search, and learn about a wide variety of animals. Whether you’re a student, animal lover, or just curious, PawPedia provides detailed information, images, and fun facts about creatures from all around the world.
        </p>
      </section>

      {/* Section: Why Use PawPedia? */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🦁 Why Use PawPedia?</h2>
        <p className='text-base leading-relaxed'>
          Discover fascinating details about mammals, birds, reptiles, and more. Search for your favorite animal, view detailed profiles, and expand your knowledge with an easy-to-use, visually appealing interface.
        </p>
      </section>

      {/* Section: Tech Stack */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🧰 Tech Stack</h2>
        <p className='text-base leading-relaxed'>
          Built using <span className="font-semibold text-white">Next.js</span> and <span className="font-semibold text-white">React</span>. Styled with Tailwind CSS for a clean and responsive design.
          <br />• <span className="text-green-500">Frontend</span>: Next.js, React, Tailwind CSS
          <br />• <span className="text-blue-500">Backend/API</span>: (Optional) Node.js, Express, MongoDB
        </p>
      </section>

      {/* Section: App Features */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🧩 Key Features</h2>
        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>🌐 Browse and search animals by name or category</li>
          <li>📸 View images and fun facts for each animal</li>
          <li>🔍 Detailed animal profiles with scientific info</li>
          <li>📇 About & Contact pages for easy navigation</li>
          <li>🎨 Responsive, dark-themed UI for comfortable browsing</li>
        </ul>
      </section>

      {/* Section: Goal */}
      <section className='mt-6'>
        <h2 className='text-2xl font-bold mb-2'>🎯 Our Goal</h2>
        <p className='text-base leading-relaxed'>
          PawPedia aims to make learning about animals fun, easy, and accessible for everyone. We strive to provide accurate information, beautiful visuals, and a smooth user experience for all ages.
        </p>
      </section>

    </div>
  );
};

export default About;
