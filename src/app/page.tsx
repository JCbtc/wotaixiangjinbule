'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Content type icons and styling - Updated with more book-focused design
const contentTypeConfig = {
  Article: { icon: <BookOpen className="h-4 w-4" />, label: 'Articles', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200', variant: 'secondary' as const },
  Podcast: { icon: <Headphones className="h-4 w-4" />, label: 'Podcasts', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200', variant: 'outline' as const },
  Video: { icon: <Play className="h-4 w-4" />, label: 'Videos', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200', variant: 'destructive' as const }
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
        <Button className="font-medium bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Submit Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
          <DialogDescription>
            Submit a URL to add new content to our AI knowledge library. We'll automatically generate a summary and categorize it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Content URL</Label>
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
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit Content</Button>
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
    <Link href={`/content/${item.id}`} className="block group">
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 ${config.bgColor} ${config.borderColor} border-2 rounded-xl flex items-center justify-center`}>
              {config.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-700 transition-colors mb-2">
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

        <CardContent>
          <CardDescription className="text-sm leading-relaxed line-clamp-3">
            {item.summary}
          </CardDescription>
        </CardContent>

        <CardFooter>
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
    <Link href={`/content/${item.id}`} className="block group">
      <Card className="hover:shadow-md transition-all duration-200 group-hover:border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className={`flex-shrink-0 w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
              {config.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2 group-hover:text-blue-700 transition-colors mb-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span>{item.submitter}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.summary}
              </p>
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
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ReadWorthy AI</h1>
                  <p className="text-xs text-gray-500">Curated AI Knowledge Library</p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm" className="text-blue-600 bg-blue-50">Featured</Button>
                <Link href="/browse">
                  <Button variant="ghost" size="sm">Categories</Button>
                </Link>
                <Button variant="ghost" size="sm">Recent</Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search content..."
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
              <h2 className="text-2xl font-bold mb-2">Search Results</h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} results for "{searchQuery}"
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((item) => (
                  <CompactCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <CardTitle className="mb-2">No results found</CardTitle>
                  <CardDescription>
                    Try different keywords or browse our featured content below.
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
                title="Featured This Week" 
                subtitle="Hand-picked content from our editorial team"
                icon={<Star className="h-4 w-4 text-blue-600" />}
              />
              <div className="grid gap-6 md:grid-cols-2">
                {featuredContent.map((item) => (
                  <FeaturedCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Browse by Category */}
            <section>
              <SectionHeader 
                title="Browse by Category" 
                subtitle="Explore content by type"
                icon={<Filter className="h-4 w-4 text-blue-600" />}
              />
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(contentTypeConfig).map(([type, config]) => {
                  const typeContent = content.filter(item => item.contentType === type as keyof typeof contentTypeConfig);
                  return (
                    <Link key={type} href="/browse">
                      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center`}>
                            {config.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-blue-700 transition-colors">{config.label}</h3>
                            <p className="text-sm text-muted-foreground">{typeContent.length} items</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {type === 'Article' && 'In-depth articles and written content'}
                          {type === 'Podcast' && 'Audio content and interviews'}
                          {type === 'Video' && 'Video tutorials and presentations'}
                        </p>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Recent Additions */}
            <section>
              <SectionHeader 
                title="Recently Added" 
                subtitle="Latest additions to our knowledge base"
                icon={<Clock className="h-4 w-4 text-blue-600" />}
                showViewAll
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <p>© 2024 ReadWorthy AI. Curated knowledge for AI professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
