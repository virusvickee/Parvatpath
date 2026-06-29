export function SkeletonCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="bg-bg-hover h-52 w-full" />
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-bg-hover rounded w-1/3" />
        <div className="h-6 bg-bg-hover rounded w-3/4" />
        <div className="h-4 bg-bg-hover rounded w-1/2" />
        <div className="h-4 bg-bg-hover rounded w-5/6" />
        <div className="pt-4 border-t border-border flex justify-between items-center">
          <div className="h-6 bg-bg-hover rounded w-1/4" />
          <div className="h-8 bg-bg-hover rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
