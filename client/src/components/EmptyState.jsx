function EmptyState({
  emoji = "Cinema",
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/80 p-10 shadow-xl shadow-black/30 sm:p-12">
      <div className="rounded-full border border-red-500/30 bg-red-950/40 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-red-300">
        {emoji}
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-center leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;
