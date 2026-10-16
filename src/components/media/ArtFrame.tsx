import Link from "next/link";
import { ModuleArt, getArtMeta } from "./module-art";

function plate(n: number): string {
  return `Pl. ${String(n).padStart(2, "0")}`;
}

interface ArtFrameProps {
  moduleId: number;
  /** Ordinal affiché dans le bandeau de la planche (1-based). */
  plateNumber?: number;
  caption?: string;
  href?: string;
  className?: string;
  /** Masque le bandeau supérieur et la légende. */
  bare?: boolean;
  /** Classes d'aspect-ratio du cadre (Tailwind). */
  aspect?: string;
}

/**
 * Cadre éditorial « planche d’atlas » autour d’une illustration de module :
 * bandeau, légende et repères, dans le langage des tokens Atlas.
 */
export function ArtFrame({
  moduleId,
  plateNumber,
  caption,
  href,
  className,
  bare = false,
  aspect = "aspect-[8/5]",
}: ArtFrameProps) {
  const meta = getArtMeta(moduleId);
  const number = plateNumber ?? moduleId + 1;

  const inner = (
    <>
      {!bare && (
        <div className="flex items-center justify-between gap-2 border-b border-hair bg-paper2/60 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink2">
          <span>{plate(number)}</span>
          <span className="truncate">{meta.tag}</span>
        </div>
      )}
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <ModuleArt moduleId={moduleId} className="block h-full w-full" />
      </div>
      {!bare && (
        <div className="flex items-center gap-2 border-t border-hair px-3 py-2 text-xs text-ink2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-route" aria-hidden="true" />
          <span className="truncate">{caption ?? meta.caption}</span>
        </div>
      )}
    </>
  );

  const classes = `group/art block overflow-hidden rounded-2xl border border-hair bg-card transition-colors ${
    href ? "hover:border-route" : ""
  } ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={`${meta.label} — ${meta.caption}`}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
