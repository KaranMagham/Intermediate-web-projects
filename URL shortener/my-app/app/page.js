"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [url, seturl] = useState("");
  const [shortUrl, setshortUrl] = useState("")
  const [generated, setgenerated] = useState("");
  const [urls, setUrls] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUrls = async () => {
    const res = await fetch("/api/generate");
    if (!res.ok) {
      console.log("Failed to fetch URLs");
      return;
    }
    const data = await res.json();
    setUrls(data.urls);
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  // Generate function
  const generate = async () => {
    if (!url || !shortUrl) return alert("Please enter both URL and short URL");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortUrl })
      });
      if (!res.ok) throw new Error("Failed to generate URL");
      const result = await res.json();
      setgenerated(`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`);
      setshortUrl("");
      seturl("");
      setEditId(null); // reset edit mode if any
      alert("URL generated successfully!");
      fetchUrls(); // refresh the list
    } catch (error) {
      console.error(error);
      alert("Failed to generate URL");
    }
  };


  const editURL = async (id) => {
    if (!url || !shortUrl) return alert("Please enter both URL and short URL");

    try {
      const res = await fetch(`/api/generate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortUrl })
      });

      if (!res.ok) throw new Error("Failed to update URL");

      const result = await res.json();
      setgenerated(`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`);
      setshortUrl("");
      seturl("");
      alert("URL edited successfully!");

      // Refresh the list after editing
      fetchUrls();

    } catch (error) {
      console.error("Error updating URL:", error);
      alert("Failed to update URL");
    }
  };

  const deleteURL = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;

    try {
      const res = await fetch(`/api/generate/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete URL");

      alert("URL deleted successfully!");
      // Refresh the list after editing
      fetchUrls();

    } catch (error) {
      console.error("Error deleting URL:", error);
      alert("Failed to delete URL");
    }
  };

  const handleEditClick = (u) => {
    seturl(u.url);
    setshortUrl(u.shortUrl);
    setEditId(u._id);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-5">
        {/* Form */}
        <div className="flex flex-col items-center justify-center w-full max-w-md border-2 border-green-500 rounded-lg p-5">
          <h1 className="text-4xl text-center font-bold text-green-400 mb-5">URL Shortener</h1>
          <input type="text" value={url} onChange={e => seturl(e.target.value)} className="m-2 border-2 border-green-500 p-3 py-1 rounded-lg text-green-600" placeholder="Enter your URL" />
          <input type="text" value={shortUrl} onChange={e => setshortUrl(e.target.value)} className="m-2 border-2 border-green-500 p-3 py-1 rounded-lg text-green-600" placeholder="Enter your preferred short URL" />
          <button
            onClick={() => editId ? editURL(editId) : generate()}
            className="border-2 cursor-pointer text-green-400 hover:text-green-300 hover:underline hover:bg-gray-700 rounded-lg border-green-600 p-3 py-1"
          >
            {editId ? "Update URL" : "Generate"}
          </button>
        </div>

        {/* Generated URL */}
        {generated && (
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-green-400">Generated URL:</h2>
            <Link target="_blank" href={generated} className="text-blue-500 hover:underline">
              <p className="text-lg text-green-600 hover:text-blue-500">{generated}</p>
            </Link>
          </div>
        )}

        {/* URL List */}
        <div className="mt-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-400 mb-4">All URLs:</h2>
          {urls.length === 0 && <p className="text-gray-500">No URLs yet.</p>}
          {urls.map(u => (
            <div key={u._id} className="flex justify-between items-center p-3 mb-2 border-2 border-green-500 rounded-lg">
              <div>
                <p className="text-green-600 font-semibold">{u.shortUrl}</p>
                <p className="text-gray-700 text-sm">{u.url}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(u)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
                <button onClick={() => deleteURL(u._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}