"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch saved recipes on mount
    useEffect(() => {
        let isMounted = true;
        const fetchSaved = async () => {
            try {
                setError("");
                const res = await fetch("/api/recipe");
                if (!res.ok) throw new Error("Failed to fetch saved recipes");
                const data = await res.json();
                if (isMounted) setSavedRecipes(data);
            } catch (err) {
                setError("Error fetching saved recipes.");
                console.error(err);
            }
        };
        fetchSaved();
        return () => {
            isMounted = false;
        };
    }, []);
        
    // Inside SearchPage.js
    useEffect(() => {
        // Load saved state
        const savedQuery = localStorage.getItem("searchQuery");
        const savedResults = localStorage.getItem("searchResults");
        if (savedQuery) setQuery(savedQuery);
        if (savedResults) setResults(JSON.parse(savedResults));
    }, []);

    useEffect(() => {
        // Save state whenever it changes
        localStorage.setItem("searchQuery", query);
        localStorage.setItem("searchResults", JSON.stringify(results));
    }, [query, results]);


    // Search recipes from API
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        setResults([]);
        try {
            const res = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            setResults(data.results || []);
            if (!data.results || data.results.length === 0) {
                setError("No recipes found for your search.");
            }
        } catch (err) {
            setError("Error searching recipes.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Save recipe
    const saveRecipe = async (recipe) => {
        if (savedRecipes.find((r) => r.id === recipe.id)) return;
        setError("");
        try {
            const res = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipe),
            });
            if (!res.ok) throw new Error("Failed to save recipe");
            // After saving, refetch saved recipes to update state
            const savedRes = await fetch("/api/recipe");
            if (!savedRes.ok) throw new Error("Failed to fetch saved recipes");
            const savedList = await savedRes.json();
            setSavedRecipes(savedList);
        } catch (err) {
            setError("Error saving recipe.");
            console.error(err);
        }
    };

    // Delete recipe
    const handleDelete = async (id) => {
        setError("");
        try {
            await fetch("/api/recipe", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
        } catch (err) {
            setError("Error deleting recipe.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-300 p-6">
            <h1 className="text-3xl font-bold text-amber-400 mb-6 mt-12">
                🔍 Find Your Perfect Recipe
            </h1>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 max-w-2xl w-full text-center">
                    {error}
                </div>
            )}

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex max-w-full min-w-[35vw] m-2 bg-gray-100 p-4 rounded shadow-lg gap-2"
            >
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a recipe..."
                    className="flex-grow border border-gray-500 rounded px-3 py-2"
                    aria-label="Search for a recipe"
                />
                <button
                    type="submit"
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 flex items-center gap-2"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Search Results */}
            <div className="mt-8 p-4 bg-white rounded shadow-lg w-full max-w-2xl">
                <h2 className="text-yellow-600 font-bold text-lg mb-3">
                    Search Results
                </h2>
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                )}
                {!loading && results.length === 0 && !error && (
                    <p className="text-gray-500 text-center">No results yet. Try searching!</p>
                )}
                {results.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="flex justify-between items-center p-2 border-b border-gray-200"
                    >
                        <Link href={`/recipes/${recipe.id}`}>
                            <p className="cursor-pointer hover:underline">{recipe.title}</p>
                        </Link>
                        <button
                            onClick={() => saveRecipe(recipe)}
                            disabled={savedRecipes.some((r) => r.id === recipe.id)}
                            className={`px-3 py-1 rounded text-white ${savedRecipes.some((r) => r.id === recipe.id)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            {savedRecipes.some((r) => r.id === recipe.id)
                                ? "Saved"
                                : "Save"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Saved Recipes */}
            <div className="mt-8 p-4 bg-white rounded shadow-lg w-full max-w-2xl">
                <h2 className="text-center text-yellow-400 text-xl font-bold">
                    Saved Recipes ({savedRecipes.length})
                </h2>
                {savedRecipes.length === 0 ? (
                    <p className="text-gray-500 text-center mt-4">
                        No recipes saved yet.
                    </p>
                ) : (
                    savedRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="flex justify-between items-center p-2 border-b border-gray-200"
                        >
                            <Link href={`/recipes/${recipe.id}`}>
                                <p className="cursor-pointer hover:underline">{recipe.title}</p>
                            </Link>
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                aria-label={`Delete ${recipe.title}`}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
