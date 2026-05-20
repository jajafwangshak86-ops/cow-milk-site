"use client";
import { useLocalStorage } from "./useLocalStorage";

const MAX = 10;

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<number[]>("cowcare:search-history", []);

  const add = (id: number) => {
    setHistory([id, ...history.filter((h) => h !== id)].slice(0, MAX));
  };

  const clear = () => setHistory([]);

  return { history, add, clear };
}
