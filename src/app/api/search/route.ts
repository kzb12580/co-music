export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const source = searchParams.get('source') || 'jianbing-wangyi';

  if (!query) return Response.json([]);

  // 使用目前最稳定、可直接试听下载的接口
  const typeMap: Record<string, string> = {
    'jianbing-wangyi': 'netease',
    'qq': 'qq',
    'jianbing-kugou': 'kugou',
    'liyin': 'netease'
  };

  const type = typeMap[source] || 'netease';

  const url = `https://api.metingapi.131213.xyz/api?server=${type}&type=search&name=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const songs = data.map((item: any) => ({
      title: item.name,
      artist: item.artist,
      url: item.url,           // 直接可试听的mp3链接
      downloadUrl: item.url    // 直接可下载的mp3链接
    }));

    return Response.json(songs);
  } catch (e) {
    return Response.json([]);
  }
}
