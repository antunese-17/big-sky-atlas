import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="font-condensed text-overline uppercase text-granito">
        Error · 404
      </p>
      <h1 className="font-display text-display-l">Off the map.</h1>
      <p className="max-w-md text-body-lg text-carvao/80">
        This trail hasn&apos;t been plotted. Head back to base camp.
      </p>
      <Link
        href="/"
        className="rounded-pill border border-carvao px-6 py-3 text-sm uppercase tracking-[0.22em] transition-colors duration-fast ease-natural hover:bg-carvao hover:text-papel"
      >
        Return home
      </Link>
    </main>
  );
}
