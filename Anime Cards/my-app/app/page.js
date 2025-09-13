"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch default anime on load (popular list)
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=12");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setResults(data.data || []);
      } catch (err) {
        setError("Failed to fetch anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      setError('Failed to fetch anime. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-[#1f1f1f] to-[#383838] px-8 py-8 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Search Anime
      </h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Type anime name..."
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
        {error && (
          <div className="col-span-full text-center text-red-400 text-lg">
            {error}
          </div>
        )}
        {results.length > 0 ? (
          results.map((anime) => (
            <Link
              key={anime.mal_id}
              href={`/detail?name=${encodeURIComponent(anime.title)}`}
              className="w-full"
            >
              <div
                className="bg-[#232323] rounded-lg shadow-lg p-4 flex flex-col items-center border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={anime.images?.jpg?.image_url || '/no-image.png'}
                  alt={anime.title}
                  width={200}
                  height={150}
                  className="rounded mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-blue-400 mb-2">
                  {anime.title}
                </h2>
                <p className="text-sm text-gray-300 text-center line-clamp-3">
                  {anime.synopsis || 'No description.'}
                </p>
              </div>
            </Link>
          ))
        ) : (
          !loading && !error && (
            <div className="col-span-full text-center text-blue-400 text-lg">
              No anime found. Try searching for something else.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
