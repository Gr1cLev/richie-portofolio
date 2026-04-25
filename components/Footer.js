export default function Footer() {
  return (
    <footer className="relative py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="glass rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-sm">
            &copy; 2025 Richie Giansanto
          </p>
          <p className="text-white/20 text-xs">
            Built with Next.js · Liquid Glass UI
          </p>
        </div>
      </div>
    </footer>
  );
}
