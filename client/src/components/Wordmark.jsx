export default function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-serif text-2xl tracking-tight">Jagni</span>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em]">Homes</span>
    </span>
  );
}   