import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'COCO 音乐下载站',
  description: '免费音乐搜索下载',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
