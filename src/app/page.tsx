'use client';
import { useState } from 'react';
import { Search, Play, Download } from 'lucide-react';

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
    if (!query) return;
    setLoading(true);
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&source=${source}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-3">COCO 音乐下载站</h1>
        <p className="text-zinc-400">免费 · 高音质 · 无广告</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {sources.map(s => (
          <button
            key={s.id}
            onClick={() => setSource(s.id)}
            className={`px-6 py-3 rounded-full text-sm ${source === s.id ? 'bg-blue-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-12">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="搜索歌曲或歌手..."
          className="flex-1 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-blue-500 text-lg"
        />
        <button onClick={search} disabled={loading} className="px-10 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center gap-2">
          <Search className="w-5 h-5" /> 搜索
        </button>
      </div>

      <div className="space-y-4">
        {results.map((song, i) => (
          <div key={i} className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center border border-zinc-800 hover:border-blue-500">
            <div>
              <div className="font-medium text-xl">{song.title}</div>
              <div className="text-zinc-400">{song.artist}</div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => new Audio(song.url).play()} className="p-3 hover:bg-zinc-800 rounded-xl">
                <Play className="w-6 h-6" />
              </button>
              <a href={song.url} download className="p-3 hover:bg-zinc-800 rounded-xl">
                <Download className="w-6 h-6" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
