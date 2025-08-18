import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request ,{ params }) {
  try {
    // Step 1: Request body parse karo
    const { id } = params;
    const body = await request.json();
    const { url, shortUrl } = body;

    if (!id || !shortUrl) {
      return Response.json({ success: false, error: true, message: "ID and Short URL are required" }, { status: 400 });
    };

    // Step 2: MongoDB connect karo
    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("urls");

    // Step 3: Update Document
    const result = await collection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: { url, shortUrl } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ success: false, error: true, message: "No document found with the provided ID" }, { status: 404 });
    }

    // Step 4: Success response bhejo
    return Response.json({
      success: true,
      error: false,
      message: "Updation Done Successfully"
    });

  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      error: true,
      message: "Something went wrong"
    }, { status: 500 });
  };
}

export async function DELETE(request , { params }) {
  try {
    // Step 1: Request body parse karo
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return Response.json({ success: false, error: true, message: "ID is required" }, { status: 400 });
    };

    // Step 2: MongoDB connect karo
    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("urls");

    // Step 3: Delete Document
    const result = await collection.deleteOne({
      _id: new ObjectId(String(id))
    });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, error: true, message: "No document found with the provided ID" }, { status: 404 });
    }

    // Step 5: Success response bhejo
    return Response.json({
      success: true,
      error: false,
      message: "Deletion Done Successfully"
    });

  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      error: true,
      message: "Something went wrong"
    }, { status: 500 });
  };
}
