"use client";
import { useState, useCallback } from "react";
import type { Batch } from "@/types/batch";

export function useBatch() {
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBatch = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    setBatch(null);
    try {
      const res = await fetch(`/api/chain?id=${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBatch(data as Batch);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch batch");
    } finally {
      setLoading(false);
    }
  }, []);

  return { batch, loading, error, fetchBatch };
}
