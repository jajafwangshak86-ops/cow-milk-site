"use client";
import { useState, useCallback } from "react";

export interface Batch {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;
  farmer: string;
  processor: string;
  distributor: string;
  retailer: string;
  buyer: string;
  stage: string;
  createdAt: number;
  updatedAt: number;
}

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
      setBatch(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch batch");
    } finally {
      setLoading(false);
    }
  }, []);

  return { batch, loading, error, fetchBatch };
}
