// pages/api/urls-list.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");
    const urls = await db.collection("urls").find({}).toArray();

    res.status(200).json({ success: true, urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
