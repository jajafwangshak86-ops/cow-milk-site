"use client";
import { ReactNode, useState } from "react";

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
          {text}
        </span>
      )}
    </span>
  );
}
