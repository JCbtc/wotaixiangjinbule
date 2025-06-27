'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Headphones, Play, ChevronDown, ChevronRight } from 'lucide-react';
import { mockContent, ContentItem } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Content type icons and styling
const contentTypeConfig = {
  Article: { icon: <BookOpen className="h-4 w-4" />, label: 'Articles', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  Podcast: { icon: <Headphones className="h-4 w-4" />, label: 'Podcasts', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  Video: { icon: <Play className="h-4 w-4" />, label: 'Videos', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' }
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
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 ml-4">
                <Badge className={`text-xs px-2 py-1 ${item.contentType === 'Video' ? 'bg-red-100 text-red-800' : item.contentType === 'Podcast' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
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
    { key: 'All' as const, label: 'All Content', icon: '📚' },
    { key: 'Article' as const, label: 'Articles', icon: '📖' },
    { key: 'Podcast' as const, label: 'Podcasts', icon: '🎙️' },
    { key: 'Video' as const, label: 'Videos', icon: '🎬' }
  ];

  const difficultyLevels = [
    { key: '初级' as const, label: 'Beginner', icon: '🌱' },
    { key: '进阶' as const, label: 'Intermediate', icon: '🚀' },
    { key: '高级' as const, label: 'Advanced', icon: '🎓' }
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
        <h3 className="text-lg font-semibold mb-4">Browse Content</h3>
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

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState<FilterState>({
    contentType: 'All',
    difficulty: 'All'
  });
  const [content] = useState<ContentItem[]>(mockContent);
  const [searchQuery, setSearchQuery] = useState('');

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
    if (searchQuery) return 'Search Results';
    
    let typeText = activeFilter.contentType === 'All' ? 'All Content' : contentTypeConfig[activeFilter.contentType].label;
    let difficultyText = activeFilter.difficulty === 'All' ? '' : ` · ${activeFilter.difficulty === '初级' ? 'Beginner' : activeFilter.difficulty === '进阶' ? 'Intermediate' : 'Advanced'}`;
    
    return typeText + difficultyText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ReadWorthy AI</h1>
                  <p className="text-xs text-gray-500">Curated AI Knowledge Library</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/">
                  <Button variant="ghost" size="sm">Home</Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-blue-600 bg-blue-50">Browse</Button>
              </nav>
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
                    placeholder="Search content, tags, or authors..."
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
                    Clear
                  </Button>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {getFilterDisplayText()}
                </h2>
                <p className="text-gray-500 text-sm">
                  {filteredContent.length} items found
                  {searchQuery && ` for "${searchQuery}"`}
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
                    {searchQuery ? 'No results found' : 'No content available'}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {searchQuery 
                      ? `No content found for "${searchQuery}". Try different keywords or clear the search.`
                      : 'Try selecting a different content type or difficulty level.'
                    }
                  </CardDescription>
                  <div className="flex gap-2 justify-center">
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Clear Search
                      </Button>
                    )}
                    <Link href="/">
                      <Button>Back to Home</Button>
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