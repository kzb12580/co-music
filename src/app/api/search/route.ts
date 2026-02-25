export const runtime = 'edge';

const API_BASE = 'https://api.jianbing.com/search';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'jianbing-wangyi';

  if (!query) return Response.json([]);

  const url = `${API_BASE}?type=${source.replace('jianbing-', '')}&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    return Response.json(data.slice(0, 30));
  } catch {
    return Response.json([]);
  }
}
