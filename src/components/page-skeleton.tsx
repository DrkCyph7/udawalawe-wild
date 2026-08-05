import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl flex flex-col gap-16 px-4 py-20 sm:px-8">
      {/* Hero Skeleton */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-6">
          <Skeleton className="h-16 w-3/4 sm:h-24 lg:w-4/5" />
          <Skeleton className="h-6 w-full max-w-lg" />
          <Skeleton className="h-6 w-5/6 max-w-lg" />
          <div className="mt-8 flex gap-4">
            <Skeleton className="h-11 w-32 rounded-lg" />
            <Skeleton className="h-11 w-40 rounded-lg" />
          </div>
        </div>
        <div className="hidden lg:block">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="mt-4">
        <Skeleton className="mb-8 h-10 w-64" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-xl border border-border bg-card p-5">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
