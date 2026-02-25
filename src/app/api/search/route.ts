export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'netease';

  if (!query) return Response.json([]);

  // 最稳定免费接口 (2026年2月有效)
  const type = source.includes('qq') ? 'qq' : source.includes('kugou') ? 'kugou' : 'netease';
  const url = `https://api.injahow.cn/music/search?text=${encodeURIComponent(query)}&type=${type}&page=1&limit=30`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();

    const songs = (data.data || []).map((item: any) => ({
      title: item.name || item.title,
      artist: item.artist || item.singer,
      url: item.url || item.play_url,           // 试听
      downloadUrl: item.url || item.play_url    // 下载
    }));

    return Response.json(songs);
  } catch (e) {
    return Response.json([]);
  }
}
