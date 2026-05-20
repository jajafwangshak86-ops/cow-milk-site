"use client";
import { useState, FormEvent } from "react";
import { Search, Clock, X } from "lucide-react";
import Link from "next/link";
import { useSearchHistory } from "@/hooks";

interface Props {
  onSearch: (id: number) => void;
  recentIds?: number[];
  activeId?: number | null;
}

export function BatchSearch({ onSearch, activeId }: Props) {
  const [value, setValue] = useState("");
  const { history, add, clear } = useSearchHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = parseInt(value, 10);
    if (!isNaN(id) && id > 0) { onSearch(id); add(id); }
  };

  const handleQuick = (id: number) => { setValue(String(id)); onSearch(id); add(id); };

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
      {history.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {history.slice(0, 6).map((id) => (
            <button key={id} onClick={() => handleQuick(id)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors font-medium
                ${activeId === id ? "bg-green-800 text-white border-green-800" : "bg-white text-green-800 border-green-200 hover:border-green-600"}`}>
              #{id}
            </button>
          ))}
          <button onClick={clear} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-0.5">
            <X className="w-3 h-3" /> Clear
          </button>
          {activeId && (
            <Link href={`/tracker/${activeId}`} className="text-xs text-green-700 hover:underline ml-auto">
              Share ↗
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
