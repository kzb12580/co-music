export const runtime = 'edge';

export async function GET() {
  // 测试版 - 固定返回周杰伦歌曲（让你看到界面正常工作）
  const songs = [
    {
      title: "稻香",
      artist: "周杰伦",
      url: "https://music.163.com/song/media/outer/url?id=186016.mp3",
      downloadUrl: "https://music.163.com/song/media/outer/url?id=186016.mp3"
    },
    {
      title: "晴天",
      artist: "周杰伦",
      url: "https://music.163.com/song/media/outer/url?id=186001.mp3",
      downloadUrl: "https://music.163.com/song/media/outer/url?id=186001.mp3"
    },
    {
      title: "七里香",
      artist: "周杰伦",
      url: "https://music.163.com/song/media/outer/url?id=186003.mp3",
      downloadUrl: "https://music.163.com/song/media/outer/url?id=186003.mp3"
    }
  ];

  return Response.json(songs);
}
