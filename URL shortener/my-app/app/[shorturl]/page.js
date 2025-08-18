import { redirect } from "next/navigation"
import clientPromise from "@/app/lib/mongodb"

export default async function Page({ params }) {
    
    console.log("params:", params)
    const shorturl = params.shorturl

    // Step 1: MongoDB se connect karo
    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("urls");

    // Step 2: Short URL se URL ko dhoondo
    const existingUrl = await collection.findOne({shortUrl: shorturl});
    console.log("existingUrl: ",existingUrl);
    if (existingUrl && existingUrl.url) {
        redirect(existingUrl.url);
    }else {
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "/"}`);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Redirecting...</h1>
        </div>
    );
}