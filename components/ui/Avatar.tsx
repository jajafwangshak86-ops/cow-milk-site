export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-7 h-7 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" }[size];
  return (
    <div className={`${s} rounded-full bg-green-600 flex items-center justify-center text-white font-bold shrink-0`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
