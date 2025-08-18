
const NINJAS_API_URL = "https://api.api-ninjas.com/v1/animals";
const NINJAS_API_KEY = process.env.NINJAS_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 });
  }

  const res = await fetch(`${NINJAS_API_URL}?name=${encodeURIComponent(query)}`, {
    headers: { "X-Api-Key": NINJAS_API_KEY },
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch from Ninjas API" }, { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const query = body.query;

  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 });
  }

  const res = await fetch(`${NINJAS_API_URL}?name=${encodeURIComponent(query)}`, {
    headers: { "X-Api-Key": NINJAS_API_KEY },
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch from Ninjas API" }, { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}