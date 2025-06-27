import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react';
import { mockContent, mockComments } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Content type configuration
const contentTypeConfig = {
  Article: { icon: '📖', label: '文章', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200', variant: 'secondary' as const },
  Podcast: { icon: '🎙️', label: '播客', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200', variant: 'outline' as const },
  Video: { icon: '🎬', label: '视频', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', variant: 'destructive' as const }
};

// Difficulty level configuration
const difficultyConfig = {
  '初级': { color: 'bg-green-100 text-green-800', variant: 'outline' as const },
  '进阶': { color: 'bg-blue-100 text-blue-800', variant: 'secondary' as const },
  '高级': { color: 'bg-red-100 text-red-800', variant: 'destructive' as const }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContentDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Find the content item by ID
  const contentItem = mockContent.find(item => item.id === id);
  
  if (!contentItem) {
    notFound();
  }

  const config = contentTypeConfig[contentItem.contentType];
  const difficultyStyle = difficultyConfig[contentItem.difficultyLevel];
  const comments = mockComments[id as keyof typeof mockComments] || [];
  
  const formattedDate = new Date(contentItem.submittedAt).toLocaleDateString('zh-CN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回目录
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content header */}
        <Card className="mb-8">
          <CardHeader>
            {/* Content type badge and date */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${config.bgColor} ${config.borderColor} border-2 rounded-lg flex items-center justify-center text-lg`}>
                  {config.icon}
                </div>
                <div>
                  <div className="flex gap-2 mb-1">
                    <Badge variant={config.variant}>
                      {config.label}
                    </Badge>
                    <Badge variant={difficultyStyle.variant}>
                      {contentItem.difficultyLevel}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{formattedDate}</div>
                </div>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-3xl leading-tight mb-4">
              {contentItem.title}
            </CardTitle>

            {/* Submitter */}
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {contentItem.submitter.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardDescription className="text-lg">
                作者 <span className="font-medium text-foreground">{contentItem.submitter}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">内容摘要</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed text-lg">
                {contentItem.summary}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">相关标签</h3>
              <div className="flex flex-wrap gap-2">
                {contentItem.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-secondary cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Button asChild className="inline-flex items-center gap-2">
              <a
                href={contentItem.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>查看原始内容</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Comments section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                讨论区
              </CardTitle>
              <Badge variant="outline">
                {comments.length} 条{comments.length === 1 ? '评论' : '评论'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment, index) => {
                  const commentDate = new Date(comment.timestamp).toLocaleDateString('zh-CN', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  });

                  return (
                    <div key={comment.id}>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {comment.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{comment.author}</h3>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground text-sm">{commentDate}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                      {index !== comments.length - 1 && <Separator className="mt-6" />}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="mb-2">开始讨论</CardTitle>
                <CardDescription>成为第一个分享对此内容看法的人。</CardDescription>
              </div>
            )}

            {/* Comment form placeholder */}
            <div className="border-t pt-8 mt-8">
              <Card className="bg-muted/50">
                <CardContent className="text-center p-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="font-semibold">演示功能</span>
                  </div>
                  <CardDescription>
                    在完整应用中，经过身份验证的用户将能够在此参与讨论。
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 