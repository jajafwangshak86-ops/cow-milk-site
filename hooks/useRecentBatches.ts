"use client";
import { useState, useEffect } from "react";

interface RecentBatch {
  id: number;
  productName: string;
  quantity: number;
  stage: string;
  farmer: string;
  updatedAt: number;
}

export function useRecentBatches(limit = 5) {
  const [batches, setBatches] = useState<RecentBatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/chain/recent?limit=${limit}`)
      .then((r) => r.json())
      .then((d) => { if (d.batches) setBatches(d.batches); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [limit]);

  return { batches, loading };
}
