'use client';

import { useState } from 'react';
import { Search, Play, Download, Music } from 'lucide-react';

const sources = [
  { id: 'jianbing-wangyi', name: '煎饼-网易' },
  { id: 'qq', name: 'QQ音乐' },
  { id: 'jianbing-kugou', name: '煎饼-酷狗' },
  { id: 'liyin', name: '力音' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('jianbing-wangyi');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&source=${source}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      alert('搜索失败，请稍后再试');
    }
    setLoading(false);
  };

  const play = (url: string, title: string) => {
    const audio = new Audio(url);
    audio.play();
    alert(`正在播放: ${title}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music className="w-12 h-12 text-blue-600" />
          <h1 className="text-5xl font-bold">COCO 音乐下载站</h1>
        </div>
        <p className="text-zinc-500">免费 · 无广告 · 高音质</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {sources.map(s => (
          <button
            key={s.id}
            onClick={() => setSource(s.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              source === s.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder="搜索歌曲、歌手..."
          className="flex-1 px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-blue-500 text-lg"
        />
        <button
          onClick={search}
          disabled={loading}
          className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white rounded-2xl flex items-center gap-3 font-medium"
        >
          <Search className="w-5 h-5" />
          {loading ? '搜索中...' : '搜索'}
        </button>
      </div>

      <div className="space-y-3">
        {results.map((song: any, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl flex items-center justify-between border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all group">
            <div>
              <div className="font-medium text-lg">{song.title}</div>
              <div className="text-sm text-zinc-500">{song.artist}</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => play(song.previewUrl || song.url, song.title)}
                className="p-3 hover:bg-blue-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <Play className="w-5 h-5" />
              </button>
              <a
                href={song.downloadUrl || song.url}
                download
                className="p-3 hover:bg-green-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
