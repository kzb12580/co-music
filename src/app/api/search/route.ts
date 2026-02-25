export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'netease';

  if (!query) return Response.json([]);

  // 使用 injahow.cn 稳定公开接口
  const platform = source === 'qq' ? 'qq' : source === 'kugou' ? 'kugou' : 'netease';
  const url = `https://api.injahow.cn/music/search?text=${encodeURIComponent(query)}&type=${platform}&page=1&limit=30`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const data = await res.json();

    const songs = data.data?.map((item: any) => ({
      title: item.name,
      artist: item.artist,
      url: item.url,           // 试听链接
      downloadUrl: item.url,   // 下载链接（直接使用播放链接即可下载）
    })) || [];

    return Response.json(songs);
  } catch (e) {
    console.error(e);
    return Response.json([]);
  }
}
