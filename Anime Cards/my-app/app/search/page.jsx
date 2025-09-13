"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { uniqueAnime, regularAnime } from '@/app/data/anime';
import { useSearchParams } from 'next/navigation';

const page = () => {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // Combine all anime characters
  const allAnime = [...uniqueAnime, ...regularAnime];

  // Filter anime based on search query
  const filteredAnime = allAnime.filter(anime =>
    anime.name.toLowerCase().includes(query.toLowerCase()) ||
    anime.description.toLowerCase().includes(query.toLowerCase())
  );

  // Show limited or all anime based on showAll state
  const visibleAnime = showAll ? filteredAnime : filteredAnime.slice(0, 12);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate search delay
    setTimeout(() => {
      const searchResults = allAnime.filter(anime =>
        anime.name.toLowerCase().includes(query.toLowerCase()) ||
        anime.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] px-8 py-8 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Search Anime Characters
      </h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Type anime character name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full p-3 rounded bg-[#222] text-white border border-blue-500 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-all duration-300"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full text-center text-blue-400 text-lg">
            Loading...
          </div>
        )}
        {results.length > 0 ? (
          results.map((anime, idx) => (
            <Link
              key={anime.name || idx}
              href={`/detail?name=${encodeURIComponent(anime.name)}`}
              className="w-full"
            >
              <div
                className="bg-[#232323] rounded-lg shadow-lg p-4 flex flex-col items-center border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={anime.image}
                  alt={anime.name}
                  width={200}
                  height={150}
                  className="rounded mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-blue-400 mb-2">
                  {anime.name}
                </h2>
                <p className="text-sm text-gray-300 text-center">
                  {anime.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          visibleAnime.length > 0 ? (
            visibleAnime.map(anime => (
              <Link
                key={anime.name}
                href={`/detail?name=${encodeURIComponent(anime.name)}`}
                className="w-full"
              >
                <div
                  className="bg-[#232323] rounded-lg shadow-lg p-4 flex flex-col items-center border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={anime.image}
                    alt={anime.name}
                    width={200}
                    height={150}
                    className="rounded mb-4 object-cover"
                  />
                  <h2 className="text-xl font-bold text-blue-400 mb-2">
                    {anime.name}
                  </h2>
                  <p className="text-sm text-gray-300 text-center">
                    {anime.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center text-blue-400 text-lg">
                No anime characters found.
              </div>
            )
          )
        )}
      </div>

      {/* View More / View Less Button */}
      {results.length === 0 && filteredAnime.length > 12 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-all duration-300"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default page
