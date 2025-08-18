import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
  try {
    // Step 1: Request body parse karo
    const body = await request.json();

    // Step 2: MongoDB connect karo
    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("urls");

    // Step 3: Check if URL already exists
    const existingUrl = await collection.findOne({ shortUrl: body.shortUrl });
    if (existingUrl) {
      return Response.json({
        success: false,
        error: true,
        message: "Short URL already exists"
      }, { status: 400 });
    }

    // Step 4: Data insert karo
    await collection.insertOne({
      url: body.url,
      shortUrl: body.shortUrl
    });

    // Step 5: Success response bhejo
    return Response.json({
      success: true,
      error: false,
      message: "Done Successfully"
    });

  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      error: true,
      message: "Something went wrong"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("urls");
    const urls = await collection.find({}).toArray();

    return Response.json({ urls });
  } catch (err) {
    console.error(err);
    return Response.json({ urls: [], error: true, message: "Something went wrong" }, { status: 500 });
  }
}