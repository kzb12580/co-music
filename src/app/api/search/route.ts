export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'netease';

  if (!query) return Response.json([]);

  const typeMap: Record<string, string> = {
    'jianbing-wangyi': 'netease',
    'qq': 'qq',
    'jianbing-kugou': 'kugou',
    'liyin': 'netease'
  };

  const type = typeMap[source] || 'netease';

  // 使用目前最稳定、可直接播放下载的接口
  const url = `https://api.metingapi.131213.xyz/api?server=${type}&type=search&name=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const songs = data.map((item: any) => ({
      title: item.name,
      artist: item.artist,
      url: item.url,           // 直接mp3链接，可试听
      downloadUrl: item.url    // 直接下载
    }));

    return Response.json(songs);
  } catch (e) {
    return Response.json([]);
  }
}
