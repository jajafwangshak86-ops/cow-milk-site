import { Star } from "lucide-react";

export function TrustBanner() {
  return (
    <div className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-9 h-9 bg-green-600 border-2 border-white rounded-full" />)}
          </div>
          <div>
            <div className="font-semibold text-sm">10,000+ Reviews</div>
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400" />)}
              <span className="text-green-300 ml-1">4.9 / 5</span>
            </div>
          </div>
        </div>
        <div className="font-bold text-lg">Healthy Life With Fresh Products</div>
        <div className="text-green-200 text-sm">Trusted by thousands of farmers across the country</div>
      </div>
    </div>
  );
}
