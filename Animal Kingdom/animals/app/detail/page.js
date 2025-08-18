"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetch(`/api/search?query=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        setAnimal(Array.isArray(data) && data.length > 0 ? data[0] : null);
        setLoading(false);
      })
      .catch(() => {
        setAnimal(null);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="text-center text-red-400 text-lg py-10">
        Loading...
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="text-center text-red-400 text-lg py-10">
        Animal not found.
      </div>
    );
  }

  // Organize characteristics into sections
  const { characteristics = {} } = animal;
  const mainInfo = [
    "type", "diet", "habitat", "lifespan", "location", "prey", "top_speed", "group_behavior"
  ];
  const extraInfo = Object.keys(characteristics).filter(
    key => !mainInfo.includes(key)
  );

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-red-500 mb-6">{animal.name}</h1>
      <div className="mb-6">
        <span className="text-white font-semibold">Type:</span> {animal.type || characteristics.type || "Unknown"}
      </div>
      <div className="bg-[#232323] rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-red-400 mb-4">Main Info</h2>
        {mainInfo.map(key =>
          characteristics[key] ? (
            <div key={key} className="mb-2">
              <span className="font-semibold text-white capitalize">{key.replace("_", " ")}:</span>{" "}
              <span className="text-gray-300">{characteristics[key]}</span>
            </div>
          ) : null
        )}
      </div>
      {extraInfo.length > 0 && (
        <div className="bg-[#232323] rounded-lg p-6 w-full max-w-xl">
          <h2 className="text-xl font-bold text-red-400 mb-4">Other Details</h2>
          {extraInfo.map(key => (
            <div key={key} className="mb-2">
              <span className="font-semibold text-white capitalize">{key.replace("_", " ")}:</span>{" "}
              <span className="text-gray-300">{characteristics[key]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}