"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Detail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) return;
    setLoading(true);

    fetch(`/api/search?query=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setAnime(data.data && data.data.length > 0 ? data.data[0] : null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setAnime(null);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 italic text-lg py-10">
        Loading...
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="text-center text-gray-400 italic text-lg py-10">
        Anime not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        {anime?.title || "N/A"}
      </h1>

      <Image
        src={anime?.images?.jpg?.image_url || "/no-image.png"}
        alt={anime?.title || "Anime"}
        width={400}
        height={600}
        className="rounded-lg shadow-lg mb-6 max-w-sm"
      />

      <div className="bg-[#232323] rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-blue-300 mb-4">Details</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300">
          <dt className="font-semibold text-white">Japanese Title:</dt>
          <dd>{anime?.title_japanese || "N/A"}</dd>
          <dt className="font-semibold text-white">Type:</dt>
          <dd>{anime?.type || "N/A"}</dd>
          <dt className="font-semibold text-white">Episodes:</dt>
          <dd>{anime?.episodes || "Unknown"}</dd>
          <dt className="font-semibold text-white">Status:</dt>
          <dd>{anime?.status || "N/A"}</dd>
          <dt className="font-semibold text-white">Score:</dt>
          <dd>{anime?.score || "N/A"}</dd>
          <dt className="font-semibold text-white">Year:</dt>
          <dd>{anime?.year || "Unknown"}</dd>
        </dl>
      </div>

      <div className="bg-[#232323] rounded-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-blue-300 mb-4">Synopsis</h2>
        <p className="text-gray-300">
          {anime?.synopsis || "No synopsis available."}
        </p>
      </div>
    </div>
  );
}
