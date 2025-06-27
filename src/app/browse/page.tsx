'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, Headphones, Play, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { mockContent, ContentItem } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TypingEffect } from '@/components/ui/typing-effect';

// Content type icons and styling
const contentTypeConfig = {
  Article: { icon: <BookOpen className="h-4 w-4" />, label: '文章', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  Podcast: { icon: <Headphones className="h-4 w-4" />, label: '播客', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200' },
  Video: { icon: <Play className="h-4 w-4" />, label: '视频', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' }
};

// Difficulty level configuration
const difficultyConfig = {
  '初级': { color: 'bg-green-100 text-green-800', icon: '🌱' },
  '进阶': { color: 'bg-blue-100 text-blue-800', icon: '🚀' },
  '高级': { color: 'bg-red-100 text-red-800', icon: '🎓' }
};

// Filter state type
type FilterState = {
  contentType: 'All' | 'Article' | 'Podcast' | 'Video';
  difficulty: 'All' | '初级' | '进阶' | '高级';
};

// Content card component matching the image style
function ContentCard({ item }: { item: ContentItem }) {
  const config = contentTypeConfig[item.contentType];
  const formattedDate = new Date(item.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/content/${item.id}`} className="block">
      <Card className="p-6 hover:shadow-md transition-all duration-200 border border-gray-200 rounded-lg">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 ${config.bgColor} ${config.borderColor} border-2 rounded-lg flex items-center justify-center`}>
            {config.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-purple-700 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 ml-4">
                <Badge className={`text-xs px-2 py-1 ${item.contentType === 'Video' ? 'bg-indigo-100 text-indigo-800' : item.contentType === 'Podcast' ? 'bg-violet-100 text-violet-800' : 'bg-purple-100 text-purple-800'}`}>
                  {config.label.slice(0, -1)}
                </Badge>
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {item.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-gray-100">
                    {item.submitter.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-500">by {item.submitter}</span>
              </div>
              
              <div className="flex gap-1">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Sidebar component matching the image structure
function Sidebar({ activeFilter, onFilterChange, content }: {
  activeFilter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  content: ContentItem[];
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Calculate counts for each category and difficulty
  const getCategoryStats = () => {
    const stats: {
      All: { total: number };
      Article: { total: number; difficulties: Record<string, number> };
      Podcast: { total: number; difficulties: Record<string, number> };
      Video: { total: number; difficulties: Record<string, number> };
    } = {
      All: { total: content.length },
      Article: { total: 0, difficulties: {} },
      Podcast: { total: 0, difficulties: {} },
      Video: { total: 0, difficulties: {} }
    };

    // Calculate per-category counts and difficulties
    (['Article', 'Podcast', 'Video'] as const).forEach(type => {
      const categoryItems = content.filter(item => item.contentType === type);
      stats[type].total = categoryItems.length;
      
      categoryItems.forEach(item => {
        stats[type].difficulties[item.difficultyLevel] = (stats[type].difficulties[item.difficultyLevel] || 0) + 1;
      });
    });

    return stats;
  };

  const stats = getCategoryStats();

  const categories = [
    { key: 'All' as const, label: '全部内容', icon: '📚' },
    { key: 'Article' as const, label: '文章', icon: '📖' },
    { key: 'Podcast' as const, label: '播客', icon: '🎙️' },
    { key: 'Video' as const, label: '视频', icon: '🎬' }
  ];

  const difficultyLevels = [
    { key: '初级' as const, label: '初级', icon: '🌱' },
    { key: '进阶' as const, label: '进阶', icon: '🚀' },
    { key: '高级' as const, label: '高级', icon: '🎓' }
  ];

  const handleCategoryClick = (categoryKey: string) => {
    if (categoryKey === 'All') {
      onFilterChange({ contentType: 'All', difficulty: 'All' });
      setExpandedCategory(null);
    } else {
      if (expandedCategory === categoryKey) {
        setExpandedCategory(null);
        onFilterChange({ 
          contentType: categoryKey as 'Article' | 'Podcast' | 'Video', 
          difficulty: 'All' 
        });
      } else {
        setExpandedCategory(categoryKey);
        onFilterChange({ 
          contentType: categoryKey as 'Article' | 'Podcast' | 'Video', 
          difficulty: 'All' 
        });
      }
    }
  };

  const handleDifficultyClick = (categoryKey: string, difficultyKey: string) => {
    onFilterChange({ 
      contentType: categoryKey as 'Article' | 'Podcast' | 'Video', 
      difficulty: difficultyKey as '初级' | '进阶' | '高级'
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">浏览内容</h3>
        <Separator className="mb-4" />
        
        <nav className="space-y-1">
          {categories.map((category) => {
            const isActive = activeFilter.contentType === category.key;
            const isExpanded = expandedCategory === category.key;
            const categoryStats = stats[category.key];
            
            return (
              <div key={category.key}>
                {/* Main Category Button */}
                <Button
                  onClick={() => handleCategoryClick(category.key)}
                  variant={isActive && activeFilter.difficulty === 'All' ? "default" : "ghost"}
                  className={`w-full justify-between transition-all duration-200 ${
                    isActive && activeFilter.difficulty === 'All' 
                      ? "bg-gray-900 text-white hover:bg-gray-800" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {category.key !== 'All' && (
                      isExpanded ? 
                        <ChevronDown className="h-3 w-3" /> : 
                        <ChevronRight className="h-3 w-3" />
                    )}
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {categoryStats.total}
                  </span>
                </Button>

                {/* Difficulty Sub-levels */}
                {isExpanded && category.key !== 'All' && (
                  <div className="ml-6 mt-1 space-y-1">
                    {difficultyLevels.map((difficulty) => {
                      const count = ('difficulties' in categoryStats) ? (categoryStats.difficulties[difficulty.key] || 0) : 0;
                      const isDifficultyActive = isActive && activeFilter.difficulty === difficulty.key;
                      
                      return (
                        <Button
                          key={difficulty.key}
                          onClick={() => handleDifficultyClick(category.key, difficulty.key)}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-between text-sm ${
                            isDifficultyActive 
                              ? "bg-gray-900 text-white hover:bg-gray-800" 
                              : "hover:bg-gray-100"
                          }`}
                          disabled={count === 0}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{difficulty.icon}</span>
                            <span>{difficulty.label}</span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {count}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function BrowsePageContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterState>({
    contentType: 'All',
    difficulty: 'All'
  });
  const [content] = useState<ContentItem[]>(mockContent);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize filter from URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    
    if (category && ['Article', 'Podcast', 'Video'].includes(category)) {
      setActiveFilter({
        contentType: category as 'Article' | 'Podcast' | 'Video',
        difficulty: difficulty && ['初级', '进阶', '高级'].includes(difficulty) ? difficulty as '初级' | '进阶' | '高级' : 'All'
      });
    }
  }, [searchParams]);

  // Filter content based on active filter and search query
  const filteredContent = useMemo(() => {
    let filtered = activeFilter.contentType === 'All' 
      ? content 
      : content.filter(item => item.contentType === activeFilter.contentType);

    if (activeFilter.difficulty !== 'All') {
      filtered = filtered.filter(item => item.difficultyLevel === activeFilter.difficulty);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.submitter.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [content, activeFilter, searchQuery]);

  // Get filter display text
  const getFilterDisplayText = () => {
    if (searchQuery) return '搜索结果';
    
    let typeText = activeFilter.contentType === 'All' ? '全部内容' : contentTypeConfig[activeFilter.contentType].label;
    let difficultyText = activeFilter.difficulty === 'All' ? '' : ` · ${activeFilter.difficulty}`;
    
    return typeText + difficultyText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-4">
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
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/">
                  <Button variant="ghost" size="sm">精选</Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-purple-600 bg-purple-50">分类</Button>
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
              
              <Button className="font-medium bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                提交内容
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          content={content}
        />

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-5xl">
            {/* Search and Results header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="搜索内容、标签或作者..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                  >
                    清除
                  </Button>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {getFilterDisplayText()}
                </h2>
                <p className="text-gray-500 text-sm">
                  找到 {filteredContent.length} 项内容
                  {searchQuery && ` 关于 "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Content list */}
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>

            {/* Empty state */}
            {filteredContent.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-gray-400 text-6xl mb-4">
                    {searchQuery ? '🔍' : '📚'}
                  </div>
                  <CardTitle className="mb-2">
                    {searchQuery ? '未找到结果' : '无可用内容'}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {searchQuery 
                      ? `未找到关于 "${searchQuery}" 的内容。请尝试不同的关键词或清除搜索。`
                      : '请尝试选择不同的内容类型或难度级别。'
                    }
                  </CardDescription>
                  <div className="flex gap-2 justify-center">
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        清除搜索
                      </Button>
                    )}
                    <Link href="/">
                      <Button>返回首页</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowsePageContent />
    </Suspense>
  );
} 