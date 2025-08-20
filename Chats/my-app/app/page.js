"use client";
import React, { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [detailedAnswer, setDetailedAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (type) => {
    if (!prompt) return alert("Please enter a message");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });

      const data = await res.json();

      if (type === "short") {
        setShortAnswer(data.reply);
      } else {
        setDetailedAnswer(data.reply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl underline text-gray-500 m-5 hover:text-gray-400 font-bold mb-4">
        Welcome to Chat Bro.
      </h1>

      <div className="flex flex-col justify-center items-center m-10 gap-4">
        <label htmlFor="mess" className="text-xl">
          Drop your question down here:-
        </label>
        <textarea
          rows={5}
          cols={50}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border-2 rounded-lg border-gray-600 text-blue-200 p-2"
        />

        <div className="flex btn gap-5">
          <button
            onClick={() => sendMessage("short")}
            className="border-2 p-2 bg-gray-800 font-bold rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Short Answer
          </button>
          <button
            onClick={() => sendMessage("detailed")}
            className="border-2 p-2 bg-gray-800 font-bold rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Detailed Answer
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        {/* Short Answer Section */}
        {shortAnswer && (
          <div className="border p-3 mt-4 w-[600px] rounded bg-gray-900 text-white">
            <h2 className="font-bold mb-2">Short Answer:</h2>
            <p>{shortAnswer}</p>
            <button
              onClick={() => handleCopy(shortAnswer)}
              className="px-3 py-1 mt-2 bg-blue-500 text-white rounded"
            >
              Copy
            </button>
          </div>
        )}

        {/* Detailed Answer Section */}
        {detailedAnswer && (
          <div className="border p-3 mt-4 w-[600px] rounded bg-gray-900 text-white">
            <h2 className="font-bold mb-2">Detailed Answer:</h2>
            <p>{detailedAnswer}</p>
            <button
              onClick={() => handleCopy(detailedAnswer)}
              className="px-3 py-1 mt-2 bg-blue-500 text-white rounded"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
