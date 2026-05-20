export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-gray-100 my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 border-t border-gray-100" />
      <span className="text-xs text-gray-400">{label}</span>
      <div className="flex-1 border-t border-gray-100" />
    </div>
  );
}
