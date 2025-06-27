'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Search, Plus, Star, TrendingUp, Clock, BookOpen, Headphones, Play, Filter, ChevronRight } from 'lucide-react';
import { mockContent, ContentItem } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TypingEffect } from '@/components/ui/typing-effect';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Content type icons and styling - Updated with purple-focused design
const contentTypeConfig = {
  Article: { icon: <BookOpen className="h-4 w-4" />, label: '文章', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200', variant: 'secondary' as const },
  Podcast: { icon: <Headphones className="h-4 w-4" />, label: '播客', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200', variant: 'outline' as const },
  Video: { icon: <Play className="h-4 w-4" />, label: '视频', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', variant: 'destructive' as const }
};

// Difficulty level configuration
const difficultyConfig = {
  '初级': { color: 'bg-green-100 text-green-800', variant: 'outline' as const, icon: '🌱' },
  '进阶': { color: 'bg-blue-100 text-blue-800', variant: 'secondary' as const, icon: '🚀' },
  '高级': { color: 'bg-red-100 text-red-800', variant: 'destructive' as const, icon: '🎓' }
};

// Filter state type
type FilterState = {
  contentType: 'All' | 'Article' | 'Podcast' | 'Video';
  difficulty: 'All' | '初级' | '进阶' | '高级';
};

// Modal component for adding content
function AddContentModal({ onSubmit }: {
  onSubmit: (url: string) => void;
}) {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
      setIsOpen(false);
      toast.success('Content submitted successfully!', {
        description: 'Your content will be processed and added to the library.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
                      <Button className="font-medium bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                提交内容
              </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新内容</DialogTitle>
          <DialogDescription>
            提交URL以向我们的AI知识库添加新内容。我们将自动生成摘要并进行分类。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">内容URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              取消
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">提交内容</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Featured content card for hero section
function FeaturedCard({ item }: { item: ContentItem }) {
  const config = contentTypeConfig[item.contentType];
  const formattedDate = new Date(item.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/content/${item.id}`} className="block group h-full">
      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
        
        <CardHeader className="pb-3 pr-20 flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 ${config.bgColor} ${config.borderColor} border-2 rounded-xl flex items-center justify-center`}>
              {config.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl leading-tight line-clamp-1 group-hover:text-purple-700 transition-colors mb-2">
                {item.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>by {item.submitter}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {item.difficultyLevel}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1">
          <CardDescription className="text-sm leading-relaxed line-clamp-3">
            {item.summary}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex-shrink-0">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

// Compact content card for sections
function CompactCard({ item }: { item: ContentItem }) {
  const config = contentTypeConfig[item.contentType];
  const formattedDate = new Date(item.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/content/${item.id}`} className="block group h-full">
      <Card className="hover:shadow-lg transition-all duration-300 group-hover:border-purple-200 h-full flex flex-col border border-gray-200">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Header with icon and title section */}
          <div className="flex gap-4 mb-4">
            <div className={`flex-shrink-0 w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center shadow-sm`}>
              {config.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Title - exactly one line */}
              <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-purple-700 transition-colors mb-2">
                {item.title}
              </h3>
              
              {/* Author info - positioned consistently */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">{item.submitter}</span>
                <span className="text-gray-300">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {/* Summary content - grows to fill available space */}
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
              {item.summary}
            </p>
            
            {/* Content type badge - anchored at bottom */}
            <div className="flex items-center justify-between">
              <Badge 
                variant="secondary" 
                className={`${config.textColor} ${config.bgColor} border-0 font-medium`}
              >
                {config.label}
              </Badge>
              <div className="text-xs text-gray-400">
                {item.difficultyLevel}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Section header component
function SectionHeader({ title, subtitle, icon, showViewAll = false }: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  showViewAll?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {showViewAll && (
        <Link href="/browse">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            查看全部
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [content] = useState<ContentItem[]>(mockContent);

  // Get featured content (most recent)
  const featuredContent = useMemo(() => {
    return [...content]
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 2);
  }, [content]);

  // Get recent content
  const recentContent = useMemo(() => {
    return [...content]
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 6);
  }, [content]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return content.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.submitter.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [content, searchQuery]);

  // Handle content submission
  const handleContentSubmit = (url: string) => {
    toast.success('Content submitted successfully!', {
      description: 'Your content will be processed and added to the library.',
    });
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image 
                    src="/Icon.svg" 
                    alt="Logo" 
                    width={48} 
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                    <TypingEffect 
                      words={["老师", "哥哥", "姐姐"]} 
                      className="text-purple-700"
                      typingSpeed={200}
                      deletingSpeed={150}
                      pauseDuration={2500}
                    />
                    <span>，我太想进步了</span>
                  </h1>
                  <p className="text-sm text-gray-500">为AI专业人士精选的知识库</p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm" className="text-purple-600 bg-purple-50">精选</Button>
                <Link href="/browse">
                  <Button variant="ghost" size="sm">分类</Button>
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                    placeholder="搜索内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
              </div>
              
              <AddContentModal onSubmit={handleContentSubmit} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          // Search Results
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">搜索结果</h2>
              <p className="text-muted-foreground">
                找到 {searchResults.length} 条关于 "{searchQuery}" 的结果
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((item) => (
                  <CompactCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <CardTitle className="mb-2">未找到结果</CardTitle>
                  <CardDescription>
                    请尝试不同的关键词或浏览下方的精选内容。
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Main Content Layout
          <div className="space-y-12">
            {/* Hero - Featured Content */}
            <section>
              <SectionHeader 
                title="本周精选" 
                subtitle="编辑团队精心挑选的优质内容"
                icon={<Star className="h-4 w-4 text-purple-600" />}
              />
              <div className="grid gap-6 md:grid-cols-2 md:grid-rows-1">
                {featuredContent.map((item) => (
                  <FeaturedCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Browse by Category */}
            <section>
              <SectionHeader 
                title="按分类浏览" 
                subtitle="按内容类型探索"
                icon={<Filter className="h-4 w-4 text-purple-600" />}
                showViewAll
              />
              <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(contentTypeConfig).map(([type, config]) => {
                  const typeContent = content.filter(item => item.contentType === type as keyof typeof contentTypeConfig);
                  return (
                    <Link key={type} href={`/browse?category=${type}`} className="block group h-full">
                      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col border border-gray-200 group-hover:border-purple-200">
                        <CardContent className="p-6 flex-1 flex flex-col">
                          {/* Header section */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 ${config.bgColor} rounded-xl flex items-center justify-center shadow-sm`}>
                              {config.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg group-hover:text-purple-700 transition-colors mb-1">
                                {config.label}
                              </h3>
                              <p className="text-sm text-gray-500 font-medium">
                                {typeContent.length} 项内容
                              </p>
                            </div>
                          </div>
                          
                          {/* Description section - grows to fill space */}
                          <div className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                              {type === 'Article' && '深度文章和书面内容'}
                              {type === 'Podcast' && '音频内容和访谈'}
                              {type === 'Video' && '视频教程和演示'}
                            </p>
                            
                            {/* Arrow indicator */}
                            <div className="flex justify-end mt-4">
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Recent Additions */}
            <section>
              <SectionHeader 
                title="最新添加" 
                subtitle="知识库的最新内容"
                icon={<Clock className="h-4 w-4 text-purple-600" />}
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentContent.map((item) => (
                  <CompactCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 ReadWorthy AI. 为AI专业人士精选的知识库。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
