export const runtime = 'edge';

import { NextRequest } from 'next/server';

const PROVIDERS: Record<string, string> = {
  'jianbing-wangyi': 'https://api.jianbing.com/search?type=netease&q=',
  'qq': 'https://api.jianbing.com/search?type=qq&q=',
  'jianbing-kugou': 'https://api.jianbing.com/search?type=kugou&q=',
  'liyin': 'https://api.jianbing.com/search?type=liyin&q=',
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query') || '';
  const source = request.nextUrl.searchParams.get('source') || 'jianbing-wangyi';

  if (!query) return Response.json([]);

  try {
    const res = await fetch(PROVIDERS[source] + encodeURIComponent(query), {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();
    return Response.json(data.slice(0, 30));
  } catch {
    return Response.json([]);
  }
}
