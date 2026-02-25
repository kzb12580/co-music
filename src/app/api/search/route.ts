export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'netease';

  if (!query) return Response.json([]);

  // 使用目前最稳定免费的音乐搜索接口（支持网易、QQ、酷狗）
  const typeMap: Record<string, string> = {
    'jianbing-wangyi': 'netease',
    'qq': 'qq',
    'jianbing-kugou': 'kugou',
    'liyin': 'netease'
  };

  const type = typeMap[source] || 'netease';
  const url = `https://metingapi.131213.xyz/api?server=${type}&type=search&name=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();

    const songs = data.map((item: any) => ({
      title: item.name,
      artist: item.artist,
      url: item.url,           // 试听链接
      downloadUrl: item.url    // 下载链接
    }));

    return Response.json(songs);
  } catch (e) {
    return Response.json([]);
  }
}
