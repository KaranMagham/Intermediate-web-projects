import clientPromise from "@/app/lib/mongodb";

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("yummify");
    const collection = db.collection("recipes");

    await collection.deleteOne({ id: id });
    return new Response(JSON.stringify({ message: "Recipe deleted!" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
