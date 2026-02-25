export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'netease';

  if (!query) return Response.json([]);

  // 使用目前最稳定的公开音乐搜索接口（支持网易云、QQ、酷狗等）
  const platform = source.includes('qq') ? 'qq' : source.includes('kugou') ? 'kugou' : 'netease';
  const url = `https://api.injahow.cn/music/search?text=${encodeURIComponent(query)}&type=${platform}&page=1&limit=30`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();

    const songs = (data.data || []).map((item: any) => ({
      title: item.name || item.title,
      artist: item.artist,
      url: item.url,           // 试听链接
      downloadUrl: item.url    // 下载链接
    }));

    return Response.json(songs);
  } catch (e) {
    console.error(e);
    return Response.json([]);
  }
}
