import clientPromise from "@/app/lib/mongodb";
import axios from "axios";

// GET → fetch all saved recipes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("yummify");
    const collection = db.collection("recipes");
    const recipes = await collection.find({}).toArray();

    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST → search recipes (Spoonacular) OR save a recipe
export async function POST(request) {
  try {
    const body = await request.json();
    const apikey = process.env.SPOONACULAR_KEY;

    if (!apikey) {
      return new Response(JSON.stringify({ error: "API key not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Search request (do NOT save to DB here)
    if (body.query) {
      const searchQuery = body.query;
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: { query: searchQuery, apiKey: apikey, number: 5 },
        }
      );

      const detailedRecipes = await Promise.all(
        response.data.results.map(async (recipe) => {
          const recipeDetails = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information`,
            { params: { apiKey: apikey } }
          );
          return recipeDetails.data;
        })
      );

      const recipes = detailedRecipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        summary: recipe.summary,
        ingredients: recipe.extendedIngredients.map((ing) => ing.original),
        instructions: recipe.instructions?.replace(/<\/?[^>]+(>|$)/g, "") || "",
      }));

      // DO NOT SAVE TO DB HERE

      return new Response(JSON.stringify({ results: recipes }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Save single recipe (when user clicks Save)
    if (body.id) {
      const client = await clientPromise;
      const db = client.db("yummify");
      const collection = db.collection("recipes");

      await collection.updateOne({ id: body.id }, { $set: body }, { upsert: true });

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/recipe:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE → remove recipe by id
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db("yummify");
    const collection = db.collection("recipes");

    // FIX: Use id as-is (don't convert to Number)
    await collection.deleteOne({ id });

    return new Response(
      JSON.stringify({ message: "Recipe deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
