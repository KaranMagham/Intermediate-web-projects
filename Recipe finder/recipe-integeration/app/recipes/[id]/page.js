import React from "react";
import { Bookmark, Clock, User } from "lucide-react";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// 👇 helper to fetch from Spoonacular (or another API)
async function fetchFromAPI(id) {
    const apiKey = process.env.SPOONACULAR_KEY; // keep your key in .env
    const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
        { next: { revalidate: 60 } } // cache for 1 min
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
        id: data.id,
        title: data.title,
        ingredients: data.extendedIngredients?.map((i) => i.original) || [],
        instructions: data.instructions || "",
        readyInMinutes: data.readyInMinutes,
        author: data.sourceName || "Unknown",
        image: data.image,
        tags: data.dishTypes || [],
    };
}

const RecipeDetailPage = async ({ params }) => {
    const { id } = params;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("yummify");
    const collection = db.collection("recipes");

    // 1. Try DB first
    let query;
    if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
    } else {
        query = { id: Number(id) };
    }

    let recipe = await collection.findOne(query, {
        projection: {
            title: 1,
            ingredients: 1,
            instructions: 1,
            tags: 1,
            readyInMinutes: 1,
            author: 1,
            image: 1,
            id: 1,
        },
    });

    // 2. If not in DB → fetch from external API
    if (!recipe) {
        recipe = await fetchFromAPI(id);

        if (!recipe) notFound();

        // 3. (Optional) Save it into Mongo for next time
        await collection.insertOne(recipe);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Recipe Image */}
            {recipe.image && (
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full rounded-lg mb-6"
                />
            )}

            {/* Header */}
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">{recipe.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                        <User size={16} />
                        {recipe.author || "Unknown"}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {recipe.readyInMinutes
                            ? `${recipe.readyInMinutes} mins`
                            : "N/A"}
                    </div>
                </div>
            </div>

            {/* Ingredients */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                {recipe.ingredients?.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No ingredients available.</p>
                )}
            </div>

            {/* Instructions */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
                {recipe.instructions ? (
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                    />
                ) : (
                    <p className="text-gray-500">No instructions available.</p>
                )}
            </div>

            {/* Tags */}
            {recipe.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeDetailPage;
