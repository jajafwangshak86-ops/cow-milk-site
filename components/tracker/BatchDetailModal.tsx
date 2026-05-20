"use client";
import { Modal } from "@/components/ui/Modal";
import { BatchCard } from "./BatchCard";
import { Batch } from "@/types/batch";

interface Props { batch: Batch | null; onClose: () => void; }

export function BatchDetailModal({ batch, onClose }: Props) {
  return (
    <Modal open={!!batch} onClose={onClose} title={batch ? `Batch #${batch.id}` : undefined}>
      {batch && <BatchCard batch={batch} />}
    </Modal>
  );
}
