import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      {/* First Section with BG Image */}
      <section
        className="flex flex-col items-center justify-center min-h-[70vh] bg-cover bg-center bg-black/50 bg-blend-overlay"
        style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/03/46/14/30/360_F_346143059_HJSSw7TxF0C7SnZcrXYN2vR7DHHOCOxJ.jpg')" }} >
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md border-2 border-black rounded-lg bg-gradient-to-b from-gray-100 to-gray-400">
          <h1 className="text-3xl font-bold text-center mt-10">
            Welcome to <span className="text-amber-300">YummiFy!</span>
          </h1>
          <p className="text-center mt-4 text-gray-600 leading-relaxed">
            Your go-to app for discovering and enjoying delicious recipes.
          </p>
          <p className="text-center text-gray-600 leading-relaxed">
            Explore a wide range of recipes, from quick snacks to gourmet meals, all at your fingertips.
          </p>
          <p className="text-center text-gray-600 leading-relaxed">
            Whether you're a beginner or a seasoned chef, YummiFy has something for everyone.
          </p>
          <p className="text-center text-gray-600 leading-relaxed">
            Start your culinary journey today!
          </p>
          <Link href="/search" className="w-full">
          <button className="mt-6 mx-auto flex border-2 border-gray-700 font-semibold text-base transition hover:scale-105 duration-300 ease-in-out cursor-pointer bg-amber-300 rounded-lg px-3 py-1 hover:bg-amber-200 justify-center">
            Start now!
          </button>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full bg-gray-800 h-1"></div>
      {/* Second Section without BG */}
      <div className="text-gray-300 bg-[#171621fe] flex flex-col items-center justify-start min-h-[40vh] text-center py-6">
        <h2 className="text-2xl font-bold mb-4">Learn More</h2>

        <div className="flex flex-wrap justify-center gap-12">
          {/* Github */}
          <div className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300">
            <a href="https://github.com/KaranMagham" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3291/3291695.png"
                alt="Github"
                width={70}
                height={70}
                className="bg-gray-800 hover:scale-105 rounded-full p-2 shadow-lg"
              />
            </a>
            <p className="mt-3 font-semibold">Github</p>
            <p className="mt-1 max-w-[200px] text-sm opacity-80">
              Visit my Github profile to learn more about me.
            </p>
          </div>

          {/* Linkedin */}
          <div className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300">
            <a href="https://www.linkedin.com/in/karanmaghamb099/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                alt="LinkedIn"
                width={70}
                height={70}
                className="bg-gray-800 hover:scale-105 rounded-full p-2 shadow-lg"
              />
            </a>
            <p className="mt-3 font-semibold">Linkedin</p>
            <p className="mt-1 max-w-[200px] text-sm opacity-80">
              Visit my Linkedin profile to learn more about me.
            </p>
          </div>

        </div>
      </div>

    </>
  );
}
