const JIKAN_API_URL = "https://api.jikan.moe/v4";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 });
  }

  // Use ?q= instead of ?name=
  const res = await fetch(`${JIKAN_API_URL}/anime?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch from Jikan API" }, { status: 500 });
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

  const res = await fetch(`${JIKAN_API_URL}/anime?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch from Jikan API" }, { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}

