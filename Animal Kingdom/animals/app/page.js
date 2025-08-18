"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { uniqueAnimals, regularAnimals } from "./data/animals"; 


export default function Home() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Search API handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setResults([]);
    }
    setLoading(false);
  };

  // Filter both arrays by search query
  const filteredUnique = uniqueAnimals.filter(animal =>
    animal.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredRegular = regularAnimals.filter(animal =>
    animal.name.toLowerCase().includes(query.toLowerCase())
  );

  // Show unique animals first, then regular animals if "View More" is clicked
  const visibleAnimals = showAll
    ? [...filteredUnique, ...filteredRegular]
    : filteredUnique;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] px-8 py-8 text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Search Animals
      </h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Type animal name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full p-3 rounded bg-[#222] text-white border border-red-500 focus:outline-none focus:border-red-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-all duration-300"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full text-center text-red-400 text-lg">
            Loading...
          </div>
        )}
        {results.length > 0 ? (
          results.map((animal, idx) => (
            <Link
              key={animal.name || idx}
              href={`/detail?name=${encodeURIComponent(animal.name)}`}
              className="w-full"
            >
              <div
                className="bg-[#232323] rounded-lg shadow-lg p-4 flex flex-col items-center border-2 border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-xl font-bold text-red-400 mb-2">
                  {animal.name}
                </h2>
                <p className="text-sm text-gray-300 text-center">
                  {animal.characteristics?.diet ||
                    animal.characteristics?.prey ||
                    animal.characteristics?.top_speed ||
                    animal.characteristics?.lifespan ||
                    "No details available."}
                </p>
              </div>
            </Link>
          ))
        ) : (
          visibleAnimals.length > 0 ? (
            visibleAnimals.map(animal => (
              <div
                key={animal.name}
                className="bg-[#232323] rounded-lg shadow-lg p-4 flex flex-col items-center border-2 border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <Image
                  src={animal.image}
                  alt={animal.name}
                  width={200}
                  height={150}
                  className="rounded mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-red-400 mb-2">
                  {animal.name}
                </h2>
                <p className="text-sm text-gray-300 text-center">
                  {animal.description}
                </p>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center text-red-400 text-lg">
                No animals found.
              </div>
            )
          )
        )}
      </div>

      {/* View More / View Less Button */}
      {results.length === 0 && (filteredRegular.length > 0 || filteredUnique.length > 12) && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-all duration-300"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
