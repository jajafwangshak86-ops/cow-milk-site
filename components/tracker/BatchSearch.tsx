"use client";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

interface Props {
  onSearch: (id: number) => void;
  recentIds?: number[];
  activeId?: number | null;
}

export function BatchSearch({ onSearch, recentIds = [], activeId }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = parseInt(value, 10);
    if (!isNaN(id) && id > 0) onSearch(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          type="number" min={1} value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter batch ID (e.g. 19)"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
        />
        <button type="submit"
          className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
          <Search className="w-4 h-4" /> Track
        </button>
      </form>
      {recentIds.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-400">Recent:</span>
          {recentIds.map((id) => (
            <button key={id} onClick={() => { setValue(String(id)); onSearch(id); }}
              className={`text-xs px-3 py-1 rounded-full border transition-colors font-medium
                ${activeId === id ? "bg-green-800 text-white border-green-800" : "bg-white text-green-800 border-green-200 hover:border-green-600"}`}>
              #{id}
            </button>
          ))}
          {activeId && (
            <Link href={`/tracker/${activeId}`} className="text-xs text-green-700 hover:underline ml-1">
              Share link ↗
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
