function EmptyState({
  emoji = "🎬",
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-900 p-12">
      <div className="text-7xl">
        {emoji}
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-center text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;