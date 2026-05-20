import { Skeleton } from "@/components/ui/Skeleton";

export function BatchCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex gap-2 my-4">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="w-8 h-8 rounded-full flex-1" />)}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
      </div>
      <div className="space-y-2 mt-4">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 rounded" />)}
      </div>
    </div>
  );
}
