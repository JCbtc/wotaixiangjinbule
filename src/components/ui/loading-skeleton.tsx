import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ContentCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex-shrink-0 ml-4">
                <Skeleton className="h-6 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-3" />
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function ContentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-10 w-40" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div>
                <Skeleton className="h-6 w-20 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            
            <Skeleton className="h-10 w-3/4 mb-4" />
            
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-8">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-px w-full mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-5/6 mb-2" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            <div className="mb-8">
              <Skeleton className="h-6 w-20 mb-3" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Skeleton className="h-10 w-48" />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 