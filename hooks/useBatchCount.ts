"use client";
import { useState, useEffect } from "react";

export function useBatchCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/chain")
      .then((r) => r.json())
      .then((d) => { if (typeof d.count === "number") setCount(d.count); })
      .catch(() => {});
  }, []);

  return count;
}
