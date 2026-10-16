import type { ReactNode } from "react";

/**
 * Planches illustrées « Atlas » — une par étape du parcours.
 * SVG inline (aucune requête réseau) et piloté par les tokens CSS Atlas,
 * donc automatiquement cohérent en mode clair et sombre.
 */

const C = {
  ink: "var(--color-ink)",
  ink2: "var(--color-ink2)",
  hair: "var(--color-hair)",
  route: "var(--color-route)",
  routeDeep: "var(--color-route-deep)",
  routeLight: "var(--color-route-light)",
  moss: "var(--color-moss)",
  card: "var(--color-card)",
  paper2: "var(--color-paper2)",
} as const;

const MONO = "var(--font-plex-mono), monospace";

export interface ArtMeta {
  label: string;
  caption: string;
  tag: string;
}

export const MODULE_ART: Record<number, ArtMeta> = {
  0: { label: "Fondamentaux", caption: "Boussole — s’orienter dans l’IA", tag: "Boussole" },
  1: { label: "Python & outils", caption: "Terminal, paquets et versions", tag: "Outillage" },
  2: { label: "Mathématiques", caption: "Coordonnées, matrices, probabilités", tag: "Algèbre" },
  3: { label: "Machine Learning", caption: "Frontière de décision et arbres", tag: "Modèles" },
  4: { label: "Deep Learning", caption: "Réseaux de neurones en couches", tag: "Tensor" },
  5: { label: "NLP & LLM", caption: "Jetons, attention, plongements", tag: "Langage" },
  6: { label: "IA générative", caption: "Du bruit à l’image cohérente", tag: "Diffusion" },
  7: { label: "Computer Vision", caption: "Détection et segmentation", tag: "Vision" },
  8: { label: "Agents & RAG", caption: "Mémoire augmentée et autonomie", tag: "RAG" },
  9: { label: "MLOps", caption: "Entraîner, livrer, surveiller", tag: "Pipeline" },
  10: { label: "Ingénieur IA", caption: "Compétences et métiers", tag: "Carrière" },
  11: { label: "Produit IA", caption: "Du prototype au SaaS", tag: "Produit" },
  12: { label: "Emploi & portfolio", caption: "Vitrine et trajectoire", tag: "Marché" },
  13: { label: "Méthode", caption: "Apprendre, construire, transmettre", tag: "Rigueur" },
};

export const ART_FALLBACK: ArtMeta = {
  label: "Parcours IA",
  caption: "Carte du parcours, de zéro à ingénieur",
  tag: "Atlas",
};

export function getArtMeta(moduleId: number): ArtMeta {
  return MODULE_ART[moduleId] ?? ART_FALLBACK;
}

/** Champ de points partagé par toutes les planches (trame cartographique). */
const DOTS: ReadonlyArray<readonly [number, number]> = (() => {
  const out: Array<readonly [number, number]> = [];
  for (let x = 22; x <= 300; x += 26) {
    for (let y = 20; y <= 184; y += 26) out.push([x, y]);
  }
  return out;
})();

function Backdrop() {
  return (
    <>
      <rect x="0" y="0" width="320" height="200" fill={C.card} />
      <g fill={C.hair} opacity="0.55">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1" />
        ))}
      </g>
    </>
  );
}

function Registration() {
  return (
    <g stroke={C.hair} strokeWidth="1.2" fill="none">
      <path d="M9 9h11M9 9v11" />
      <path d="M311 9h-11M311 9v11" />
      <path d="M9 191h11M9 191v-11" />
      <path d="M311 191h-11M311 191v-11" />
    </g>
  );
}

function Network() {
  const layers: Array<{ x: number; ys: number[] }> = [
    { x: 48, ys: [60, 92, 124] },
    { x: 120, ys: [44, 74, 106, 136] },
    { x: 192, ys: [58, 92, 126] },
    { x: 258, ys: [76, 104] },
  ];
  const edges: ReactNode[] = [];
  for (let l = 0; l < layers.length - 1; l += 1) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        edges.push(
          <line
            key={`${l}-${y1}-${y2}`}
            x1={layers[l].x}
            y1={y1}
            x2={layers[l + 1].x}
            y2={y2}
            stroke={C.ink2}
            strokeWidth="0.7"
            opacity="0.3"
          />,
        );
      }
    }
  }
  return (
    <>
      {edges}
      {layers.map((layer, l) => (
        <g key={l}>
          {layer.ys.map((y) => (
            <circle
              key={y}
              cx={layer.x}
              cy={y}
              r="7"
              fill={C.card}
              stroke={l === 0 || l === layers.length - 1 ? C.route : C.moss}
              strokeWidth="1.6"
            />
          ))}
        </g>
      ))}
    </>
  );
}

const NOISE: number[][] = [
  [0.9, 0.3, 0.7, 0.2, 0.8],
  [0.4, 0.85, 0.25, 0.75, 0.35],
  [0.7, 0.2, 0.9, 0.45, 0.6],
  [0.25, 0.8, 0.35, 0.9, 0.3],
  [0.85, 0.4, 0.65, 0.2, 0.75],
];

const RADAR_ANGLES = [-90, -18, 54, 126, 198];
const RADAR_RADII = [58, 42, 52, 34, 46];

function polar(cx: number, cy: number, deg: number, r: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r];
}

const MLOPS_STAGES = [
  { x: 24, label: "Train" },
  { x: 92, label: "Package" },
  { x: 160, label: "Deploy" },
  { x: 228, label: "Monitor" },
];

function Stages() {
  return (
    <>
      {MLOPS_STAGES.map((stage, i) => {
        const cx = stage.x + 29;
        const cy = 81;
        const accent = i === 2;
        const stroke = accent ? C.route : C.ink2;
        return (
          <g key={stage.label}>
            <rect
              x={stage.x}
              y="58"
              width="58"
              height="46"
              rx="8"
              fill={accent ? C.routeLight : C.paper2}
              opacity={accent ? 0.45 : 1}
              stroke={C.hair}
            />
            {i === 0 && (
              <>
                <circle cx={cx - 10} cy={cy - 7} r="3.5" fill="none" stroke={stroke} strokeWidth="1.3" />
                <circle cx={cx - 10} cy={cy + 7} r="3.5" fill="none" stroke={stroke} strokeWidth="1.3" />
                <circle cx={cx + 10} cy={cy} r="4" fill={stroke} />
                <path
                  d={`M${cx - 6.5} ${cy - 6} L${cx + 6.5} ${cy - 1.5} M${cx - 6.5} ${cy + 6} L${cx + 6.5} ${cy + 1.5}`}
                  stroke={stroke}
                  strokeWidth="1"
                />
              </>
            )}
            {i === 1 && (
              <>
                <rect x={cx - 11} y={cy - 9} width="22" height="18" rx="3" fill="none" stroke={stroke} strokeWidth="1.3" />
                <path d={`M${cx - 11} ${cy - 3} h22`} stroke={stroke} strokeWidth="1.1" />
                <path d={`M${cx - 3} ${cy - 9} v6 M${cx + 4} ${cy - 9} v6`} stroke={stroke} strokeWidth="1.1" />
              </>
            )}
            {i === 2 && (
              <>
                <path d={`M${cx} ${cy + 9} V${cy - 8}`} stroke={stroke} strokeWidth="1.7" />
                <path d={`M${cx - 7} ${cy - 1} L${cx} ${cy - 8} L${cx + 7} ${cy - 1}`} fill="none" stroke={stroke} strokeWidth="1.7" />
              </>
            )}
            {i === 3 && (
              <>
                <rect x={cx - 10} y={cy + 3} width="5" height="6" fill={stroke} />
                <rect x={cx - 2.5} y={cy - 3} width="5" height="12" fill={stroke} />
                <rect x={cx + 5} y={cy - 9} width="5" height="18" fill={stroke} />
              </>
            )}
            <text x={cx} y="122" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={C.ink2}>
              {stage.label}
            </text>
          </g>
        );
      })}
      {[82, 150, 218].map((x) => (
        <path
          key={x}
          d={`M${x} 76 l5 5 l-5 5`}
          fill="none"
          stroke={C.ink2}
          strokeWidth="1.3"
        />
      ))}
      <path d="M24 150 h264" stroke={C.hair} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 150 h176" stroke={C.route} strokeWidth="3" strokeLinecap="round" />
      {[24, 82, 150, 218, 288].map((x) => (
        <circle key={x} cx={x} cy="150" r="4" fill={C.card} stroke={C.route} strokeWidth="1.6" />
      ))}
      <circle cx="200" cy="150" r="6" fill={C.route} />
    </>
  );
}

const SCENES: Record<number, ReactNode> = {
  0: (
    <>
      <circle cx="160" cy="98" r="66" fill="none" stroke={C.hair} strokeDasharray="3 6" />
      <circle cx="160" cy="98" r="44" fill="none" stroke={C.ink2} opacity="0.5" />
      <line x1="160" y1="20" x2="160" y2="176" stroke={C.hair} />
      <line x1="82" y1="98" x2="238" y2="98" stroke={C.hair} />
      <path d="M160 98 L200 58 L176 98 Z" fill={C.route} />
      <path d="M160 98 L120 138 L144 98 Z" fill={C.moss} />
      <circle cx="160" cy="98" r="5" fill={C.card} stroke={C.ink} strokeWidth="1.4" />
      <circle cx="160" cy="32" r="3.5" fill={C.route} />
      <circle cx="226" cy="98" r="3" fill={C.ink} />
      <circle cx="94" cy="98" r="3" fill={C.ink} />
      <circle cx="160" cy="164" r="3" fill={C.ink} />
      <path d="M246 150 L258 138 L246 126 L234 138 Z" fill="none" stroke={C.moss} strokeWidth="1.2" />
      <text x="52" y="46" fontFamily={MONO} fontSize="9" fill={C.ink2}>
        N
      </text>
    </>
  ),
  1: (
    <>
      <rect x="30" y="46" width="176" height="112" rx="8" fill={C.paper2} stroke={C.hair} />
      <path d="M30 66 h176" stroke={C.hair} />
      <circle cx="44" cy="56" r="3" fill={C.route} />
      <circle cx="56" cy="56" r="3" fill={C.routeLight} />
      <circle cx="68" cy="56" r="3" fill={C.moss} />
      <text x="44" y="96" fontFamily={MONO} fontSize="13" fill={C.moss}>
        &gt;&gt;&gt;
      </text>
      <rect x="72" y="86" width="70" height="7" rx="3.5" fill={C.route} opacity="0.75" />
      <rect x="44" y="108" width="112" height="7" rx="3.5" fill={C.ink2} opacity="0.5" />
      <rect x="44" y="124" width="84" height="7" rx="3.5" fill={C.ink2} opacity="0.32" />
      <rect x="44" y="140" width="130" height="7" rx="3.5" fill={C.routeLight} opacity="0.7" />
      <g transform="translate(228,50)">
        <rect x="0" y="0" width="62" height="46" rx="8" fill={C.routeLight} opacity="0.3" stroke={C.route} />
        <path d="M0 15 h62" stroke={C.route} opacity="0.55" />
        <path d="M21 0 v15 M41 0 v15" stroke={C.route} opacity="0.55" />
        <rect x="9" y="26" width="18" height="6" rx="3" fill={C.route} />
        <rect x="9" y="36" width="34" height="5" rx="2.5" fill={C.ink2} opacity="0.5" />
      </g>
      <g transform="translate(246,116)">
        <rect x="0" y="0" width="44" height="42" rx="8" fill={C.card} stroke={C.hair} />
        <path d="M0 14 h44" stroke={C.hair} />
        <rect x="8" y="24" width="28" height="5" rx="2.5" fill={C.moss} opacity="0.8" />
        <rect x="8" y="33" width="18" height="5" rx="2.5" fill={C.ink2} opacity="0.45" />
      </g>
    </>
  ),
  2: (
    <>
      <line x1="34" y1="150" x2="204" y2="150" stroke={C.ink2} strokeWidth="1.2" />
      <line x1="54" y1="34" x2="54" y2="168" stroke={C.ink2} strokeWidth="1.2" />
      <path
        d="M54 124 C 82 66, 110 66, 138 124 S 194 182, 222 124"
        fill="none"
        stroke={C.route}
        strokeWidth="2"
      />
      <path d="M54 58 L92 42" stroke={C.moss} strokeWidth="2" />
      <circle cx="92" cy="42" r="3.5" fill={C.moss} />
      <g transform="translate(226,48)">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}${c}`}
              x={c * 22}
              y={r * 22}
              width="18"
              height="18"
              rx="3"
              fill={(r + c) % 2 === 0 ? C.routeLight : C.paper2}
              opacity="0.75"
              stroke={C.hair}
            />
          )),
        )}
      </g>
      <text x="226" y="148" fontFamily={MONO} fontSize="9.5" fill={C.ink2}>
        A · x = b
      </text>
    </>
  ),
  3: (
    <>
      <rect x="26" y="42" width="178" height="126" rx="6" fill={C.card} stroke={C.hair} />
      <path
        d="M26 138 C 76 128, 114 74, 204 58"
        fill="none"
        stroke={C.ink}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="58" cy="86" r="5" fill={C.route} />
      <circle cx="90" cy="72" r="5" fill={C.route} />
      <circle cx="122" cy="80" r="5" fill={C.route} />
      <circle cx="154" cy="66" r="5" fill={C.route} />
      <circle cx="182" cy="82" r="5" fill={C.route} />
      <circle cx="56" cy="140" r="5" fill={C.moss} />
      <circle cx="94" cy="150" r="5" fill={C.moss} />
      <circle cx="128" cy="138" r="5" fill={C.moss} />
      <circle cx="162" cy="146" r="5" fill={C.moss} />
      <g transform="translate(226,58)">
        <rect x="16" y="0" width="34" height="18" rx="4" fill={C.paper2} stroke={C.hair} />
        <path d="M33 18 v14 M18 32 h30" stroke={C.ink2} fill="none" />
        <path d="M18 32 v12 M48 32 v12" stroke={C.ink2} fill="none" />
        <rect x="0" y="44" width="30" height="16" rx="4" fill={C.card} stroke={C.hair} />
        <rect x="38" y="44" width="30" height="16" rx="4" fill={C.card} stroke={C.hair} />
        <circle cx="15" cy="52" r="3" fill={C.moss} />
        <circle cx="53" cy="52" r="3" fill={C.route} />
      </g>
    </>
  ),
  4: <Network />,
  5: (
    <>
      {["Le", "chat", "dort", "sur", "le"].map((t, i) => (
        <g key={t + i}>
          <rect x="22" y={44 + i * 24} width="60" height="18" rx="9" fill={C.paper2} stroke={C.hair} />
          <text
            x="52"
            y={56 + i * 24}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="9"
            fill={C.ink}
          >
            {t}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M82 ${53 + i * 24} C 106 ${53 + i * 24}, 112 100, 126 100`}
          fill="none"
          stroke={C.routeLight}
          opacity="0.7"
        />
      ))}
      <rect x="126" y="58" width="66" height="84" rx="10" fill={C.card} stroke={C.route} strokeWidth="1.5" />
      <text x="159" y="104" textAnchor="middle" fontFamily={MONO} fontSize="12" fill={C.route}>
        LLM
      </text>
      {[46, 34, 26, 50, 20].map((w, i) => (
        <rect
          key={i}
          x="214"
          y={52 + i * 22}
          width={w}
          height="12"
          rx="6"
          fill={i === 3 ? C.route : C.moss}
          opacity={i === 3 ? 0.95 : 0.55}
        />
      ))}
      <path d="M192 100 h16" stroke={C.ink2} strokeWidth="1.2" />
      <path d="M208 100 l-6 -4 v8 Z" fill={C.ink2} />
    </>
  ),
  6: (
    <>
      <g transform="translate(34,52)">
        {NOISE.map((row, r) =>
          row.map((o, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 16}
              y={r * 16}
              width="13"
              height="13"
              rx="2"
              fill={C.ink2}
              opacity={o * 0.55}
            />
          )),
        )}
      </g>
      <path
        d="M126 100 h34"
        stroke={C.route}
        strokeWidth="1.6"
        strokeDasharray="5 4"
      />
      <path d="M160 100 l-7 -5 v10 Z" fill={C.route} />
      <rect x="176" y="48" width="90" height="90" rx="8" fill={C.paper2} stroke={C.hair} />
      <circle cx="216" cy="78" r="12" fill={C.routeLight} />
      <path d="M176 118 L206 90 L228 112 L248 96 L266 118 Z" fill={C.moss} opacity="0.85" />
      <path d="M176 122 L266 122 L266 134 a4 4 0 0 1 -4 4 H180 a4 4 0 0 1 -4 -4 Z" fill={C.ink} opacity="0.18" />
      <path d="M278 44 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill={C.route} />
      <path d="M42 40 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill={C.moss} opacity="0.8" />
    </>
  ),
  7: (
    <>
      <rect x="28" y="34" width="264" height="132" rx="8" fill={C.card} stroke={C.hair} />
      <circle cx="160" cy="100" r="42" fill="none" stroke={C.ink} strokeWidth="1.6" />
      <circle cx="160" cy="100" r="16" fill={C.ink} />
      <circle cx="150" cy="91" r="4.5" fill={C.routeLight} />
      <rect x="58" y="56" width="70" height="62" rx="4" fill="none" stroke={C.route} strokeWidth="1.6" />
      <rect x="196" y="82" width="64" height="54" rx="4" fill="none" stroke={C.moss} strokeWidth="1.6" />
      <text x="58" y="50" fontFamily={MONO} fontSize="9.5" fill={C.route}>
        visage 0.98
      </text>
      <text x="196" y="76" fontFamily={MONO} fontSize="9.5" fill={C.moss}>
        objet 0.91
      </text>
      <path d="M28 146 h264" stroke={C.route} strokeDasharray="6 6" opacity="0.8" />
    </>
  ),
  8: (
    <>
      <circle cx="46" cy="100" r="17" fill={C.card} stroke={C.route} strokeWidth="1.6" />
      <text x="46" y="104" textAnchor="middle" fontFamily={MONO} fontSize="13" fill={C.route}>
        ?
      </text>
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(96,${58 + i * 26})`}>
            <rect x="0" y="0" width="70" height="20" rx="5" fill={C.paper2} stroke={C.hair} />
            <circle cx="9" cy="10" r="2.5" fill={C.moss} />
            <rect x="18" y="7" width="42" height="6" rx="3" fill={C.ink2} opacity="0.45" />
          </g>
        ))}
      </g>
      <text x="96" y="152" fontFamily={MONO} fontSize="8.5" fill={C.ink2}>
        base de connaissances
      </text>
      <rect x="200" y="66" width="92" height="68" rx="10" fill={C.card} stroke={C.route} strokeWidth="1.5" />
      <text x="246" y="104" textAnchor="middle" fontFamily={MONO} fontSize="12" fill={C.route}>
        LLM
      </text>
      <path d="M64 100 h30" stroke={C.ink2} strokeWidth="1.2" />
      <path d="M94 100 l-6 -4 v8 Z" fill={C.ink2} />
      <path d="M166 100 h32" stroke={C.ink2} strokeWidth="1.2" />
      <path d="M198 100 l-6 -4 v8 Z" fill={C.ink2} />
      <path
        d="M246 134 C 246 176, 46 176, 46 118"
        fill="none"
        stroke={C.moss}
        strokeWidth="1.4"
        strokeDasharray="5 5"
      />
      <path d="M46 118 l-4 9 h8 Z" fill={C.moss} />
    </>
  ),
  9: <Stages />,
  10: (
    <>
      <g transform="translate(104,104)">
        {[62, 46, 30].map((r, i) => {
          const pts = RADAR_ANGLES.map((a) => polar(0, 0, a, r).join(",")).join(" ");
          return <polygon key={i} points={pts} fill="none" stroke={C.hair} />;
        })}
        {RADAR_ANGLES.map((a) => {
          const [x, y] = polar(0, 0, a, 62);
          return <line key={a} x1="0" y1="0" x2={x} y2={y} stroke={C.hair} />;
        })}
        <polygon
          points={RADAR_ANGLES.map((a, i) => polar(0, 0, a, RADAR_RADII[i]).join(",")).join(" ")}
          fill={C.route}
          opacity="0.25"
          stroke={C.route}
          strokeWidth="1.8"
        />
        <circle cx="0" cy="0" r="3" fill={C.ink} />
      </g>
      <g transform="translate(230,100)">
        <circle cx="0" cy="0" r="30" fill={C.paper2} stroke={C.route} strokeWidth="1.6" />
        <path d="M0 -18 L6 -6 L18 -4 L9 4 L12 16 L0 9 L-12 16 L-9 4 L-18 -4 L-6 -6 Z" fill={C.route} />
        <path d="M-14 26 l-8 18 l10 -6 l6 10 l6 -22 Z" fill={C.moss} opacity="0.8" />
        <path d="M14 26 l8 18 l-10 -6 l-6 10 l-6 -22 Z" fill={C.moss} opacity="0.8" />
      </g>
    </>
  ),
  11: (
    <>
      <g transform="translate(26,44)">
        <path d="M0 8 a8 8 0 0 1 8 -8 h74 a8 8 0 0 1 8 8 v30 a8 8 0 0 1 -8 8 H22 l-12 12 v-12 a8 8 0 0 1 -8 -8 Z" fill={C.paper2} stroke={C.hair} />
        <rect x="14" y="12" width="52" height="6" rx="3" fill={C.ink2} opacity="0.5" />
        <rect x="14" y="26" width="34" height="6" rx="3" fill={C.ink2} opacity="0.32" />
      </g>
      <g transform="translate(60,106)">
        <path d="M0 8 a8 8 0 0 1 8 -8 h74 a8 8 0 0 1 8 8 v30 a8 8 0 0 1 -8 8 H34 l-12 12 v-12 a8 8 0 0 1 -8 -8 Z" fill={C.routeLight} opacity="0.4" stroke={C.route} />
        <rect x="14" y="12" width="58" height="6" rx="3" fill={C.route} opacity="0.8" />
        <rect x="14" y="26" width="40" height="6" rx="3" fill={C.ink2} opacity="0.4" />
      </g>
      <g transform="translate(178,48)">
        <rect x="0" y="0" width="118" height="118" rx="10" fill={C.card} stroke={C.hair} />
        <path d="M0 22 h118" stroke={C.hair} />
        <circle cx="14" cy="11" r="3" fill={C.route} />
        <circle cx="26" cy="11" r="3" fill={C.routeLight} />
        <rect x="10" y="34" width="30" height="74" rx="6" fill={C.paper2} stroke={C.hair} />
        <rect x="48" y="34" width="60" height="30" rx="6" fill={C.routeLight} opacity="0.45" />
        <rect x="48" y="72" width="28" height="36" rx="6" fill={C.paper2} stroke={C.hair} />
        <rect x="80" y="72" width="28" height="36" rx="6" fill={C.paper2} stroke={C.hair} />
        <rect x="16" y="44" width="18" height="5" rx="2.5" fill={C.moss} />
        <rect x="16" y="56" width="14" height="5" rx="2.5" fill={C.ink2} opacity="0.45" />
      </g>
    </>
  ),
  12: (
    <>
      <g transform="translate(26,44)">
        <rect x="0" y="0" width="104" height="112" rx="10" fill={C.card} stroke={C.hair} />
        <circle cx="26" cy="30" r="16" fill={C.routeLight} opacity="0.6" stroke={C.route} />
        <rect x="52" y="20" width="40" height="7" rx="3.5" fill={C.ink} opacity="0.8" />
        <rect x="52" y="34" width="28" height="6" rx="3" fill={C.ink2} opacity="0.45" />
        <rect x="14" y="58" width="76" height="5" rx="2.5" fill={C.ink2} opacity="0.35" />
        <rect x="14" y="70" width="60" height="5" rx="2.5" fill={C.ink2} opacity="0.3" />
        <rect x="14" y="86" width="30" height="14" rx="7" fill={C.moss} opacity="0.85" />
        <rect x="50" y="86" width="30" height="14" rx="7" fill="none" stroke={C.hair} />
      </g>
      <g transform="translate(150,60)">
        <line x1="0" y1="96" x2="146" y2="96" stroke={C.hair} />
        {[26, 42, 58, 74, 92].map((h, i) => (
          <rect
            key={i}
            x={i * 30}
            y={96 - h}
            width="18"
            height={h}
            rx="3"
            fill={i === 4 ? C.route : C.routeLight}
            opacity={i === 4 ? 1 : 0.55}
          />
        ))}
        <path d="M9 70 L39 54 L69 38 L99 22 L129 6" fill="none" stroke={C.moss} strokeWidth="1.8" />
        <path d="M129 6 l-9 -1 l4 8 Z" fill={C.moss} />
      </g>
    </>
  ),
  13: (
    <>
      {[
        { x: 160, y: 46, label: "Apprendre" },
        { x: 88, y: 146, label: "Construire" },
        { x: 232, y: 146, label: "Transmettre" },
      ].map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="20" fill={i === 0 ? C.routeLight : C.paper2} opacity={i === 0 ? 0.5 : 1} stroke={i === 0 ? C.route : C.hair} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily={MONO} fontSize="11" fill={i === 0 ? C.route : C.ink2}>
            {i + 1}
          </text>
        </g>
      ))}
      <path
        d="M173 62 C 220 88, 216 122, 200 134"
        fill="none"
        stroke={C.moss}
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <path d="M200 134 l-10 -2 l5 -9 Z" fill={C.moss} />
      <path
        d="M206 150 C 160 176, 120 172, 104 158"
        fill="none"
        stroke={C.ink2}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.7"
      />
      <path d="M104 158 l10 -1 l-5 -9 Z" fill={C.ink2} opacity="0.7" />
      <path
        d="M112 132 C 112 92, 132 70, 146 62"
        fill="none"
        stroke={C.ink2}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.7"
      />
      <path d="M146 62 l-10 1 l5 9 Z" fill={C.ink2} opacity="0.7" />
      <text x="160" y="104" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={C.ink2}>
        boucle
      </text>
      <path d="M256 46 l5 10 h-10 Z" fill={C.route} stroke={C.route} />
      <rect x="255" y="58" width="2" height="8" fill={C.route} />
    </>
  ),
};

interface ModuleArtProps {
  moduleId: number;
  className?: string;
}

/** Planche complète (ratio 8:5) — fond, trame, repères et motif du module. */
export function ModuleArt({ moduleId, className }: ModuleArtProps) {
  const meta = getArtMeta(moduleId);
  const scene = SCENES[moduleId] ?? SCENES[0];
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="img"
      aria-label={`Illustration — ${meta.label} : ${meta.caption}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Backdrop />
      {scene}
      <Registration />
    </svg>
  );
}

const COMPACT: Record<number, ReactNode> = {
  0: (
    <>
      <path d="M32 14 L40 32 L32 50 L24 32 Z" fill={C.route} />
      <path d="M32 32 L24 32 L32 50 Z" fill={C.moss} opacity="0.6" />
    </>
  ),
  1: (
    <>
      <path d="M22 24 l8 8 l-8 8" fill="none" stroke={C.route} strokeWidth="2.4" />
      <line x1="34" y1="40" x2="44" y2="40" stroke={C.ink} strokeWidth="2.4" />
    </>
  ),
  2: (
    <>
      <line x1="18" y1="44" x2="46" y2="44" stroke={C.ink2} strokeWidth="1.6" />
      <line x1="24" y1="18" x2="24" y2="48" stroke={C.ink2} strokeWidth="1.6" />
      <path d="M24 38 C 32 18, 40 18, 46 38" fill="none" stroke={C.route} strokeWidth="2.4" />
    </>
  ),
  3: (
    <>
      <path d="M16 44 L48 20" stroke={C.ink2} strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx="22" cy="24" r="4" fill={C.route} />
      <circle cx="40" cy="22" r="4" fill={C.route} />
      <circle cx="26" cy="42" r="4" fill={C.moss} />
      <circle cx="44" cy="40" r="4" fill={C.moss} />
    </>
  ),
  4: (
    <>
      <line x1="22" y1="20" x2="32" y2="32" stroke={C.ink2} strokeWidth="1" />
      <line x1="22" y1="44" x2="32" y2="32" stroke={C.ink2} strokeWidth="1" />
      <line x1="32" y1="32" x2="42" y2="20" stroke={C.ink2} strokeWidth="1" />
      <line x1="32" y1="32" x2="42" y2="44" stroke={C.ink2} strokeWidth="1" />
      <circle cx="22" cy="20" r="4" fill={C.route} />
      <circle cx="22" cy="44" r="4" fill={C.route} />
      <circle cx="32" cy="32" r="4.5" fill={C.moss} />
      <circle cx="42" cy="20" r="4" fill={C.route} />
      <circle cx="42" cy="44" r="4" fill={C.route} />
    </>
  ),
  5: (
    <>
      <rect x="14" y="24" width="24" height="16" rx="8" fill={C.paper2} stroke={C.hair} />
      <path d="M40 32 h8" stroke={C.ink2} strokeWidth="1.6" />
      <rect x="42" y="18" width="14" height="8" rx="4" fill={C.route} />
      <rect x="42" y="30" width="10" height="8" rx="4" fill={C.moss} />
      <rect x="42" y="42" width="14" height="8" rx="4" fill={C.routeLight} />
    </>
  ),
  6: (
    <>
      <path d="M26 14 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 Z" fill={C.route} />
      <path d="M45 34 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill={C.moss} opacity="0.85" />
    </>
  ),
  7: (
    <>
      <path d="M12 32 C 22 18, 42 18, 52 32 C 42 46, 22 46, 12 32 Z" fill="none" stroke={C.ink} strokeWidth="2" />
      <circle cx="32" cy="32" r="6" fill={C.route} />
    </>
  ),
  8: (
    <>
      <circle cx="18" cy="32" r="5" fill={C.route} />
      <circle cx="46" cy="20" r="5" fill={C.moss} />
      <circle cx="46" cy="44" r="5" fill={C.moss} />
      <line x1="23" y1="30" x2="41" y2="21" stroke={C.ink2} strokeWidth="1.4" />
      <line x1="23" y1="34" x2="41" y2="43" stroke={C.ink2} strokeWidth="1.4" />
      <line x1="46" y1="25" x2="46" y2="39" stroke={C.ink2} strokeWidth="1.2" strokeDasharray="3 3" />
    </>
  ),
  9: (
    <>
      <path d="M14 22 l8 10 -8 10" fill="none" stroke={C.route} strokeWidth="2.4" />
      <path d="M26 22 l8 10 -8 10" fill="none" stroke={C.moss} strokeWidth="2.4" />
      <path d="M38 22 l8 10 -8 10" fill="none" stroke={C.ink2} strokeWidth="2.4" />
    </>
  ),
  10: (
    <>
      <circle cx="32" cy="30" r="14" fill={C.paper2} stroke={C.route} strokeWidth="1.8" />
      <path d="M32 20 L35 27 L42 28 L37 33 L38 40 L32 36 L26 40 L27 33 L22 28 L29 27 Z" fill={C.route} />
      <path d="M24 42 l-5 10 l7 -4 l3 6 l3 -12 Z" fill={C.moss} />
      <path d="M40 42 l5 10 l-7 -4 l-3 6 l-3 -12 Z" fill={C.moss} />
    </>
  ),
  11: (
    <>
      <rect x="16" y="18" width="14" height="12" rx="3" fill={C.routeLight} stroke={C.route} />
      <rect x="34" y="18" width="14" height="12" rx="3" fill={C.paper2} stroke={C.hair} />
      <rect x="16" y="34" width="14" height="12" rx="3" fill={C.paper2} stroke={C.hair} />
      <rect x="34" y="34" width="14" height="12" rx="3" fill={C.moss} opacity="0.7" />
    </>
  ),
  12: (
    <>
      <line x1="14" y1="46" x2="50" y2="46" stroke={C.hair} />
      <rect x="17" y="32" width="8" height="14" rx="2" fill={C.routeLight} />
      <rect x="28" y="24" width="8" height="22" rx="2" fill={C.moss} />
      <rect x="39" y="16" width="8" height="30" rx="2" fill={C.route} />
    </>
  ),
  13: (
    <>
      <path d="M18 40 A 15 15 0 1 1 46 40" fill="none" stroke={C.route} strokeWidth="2.4" />
      <path d="M46 40 l-8 -2 l2 -8 Z" fill={C.route} />
      <circle cx="32" cy="32" r="4" fill={C.moss} />
    </>
  ),
};

/** Sceau compact (ratio 1:1) — utilisé dans les listes et badges. */
export function ModuleSeal({ moduleId, className }: ModuleArtProps) {
  const meta = getArtMeta(moduleId);
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={meta.label}
    >
      <rect x="0" y="0" width="64" height="64" rx="14" fill={C.paper2} />
      <circle cx="32" cy="32" r="22" fill="none" stroke={C.hair} strokeDasharray="2 4" />
      <g transform="translate(0,1)">{COMPACT[moduleId] ?? COMPACT[0]}</g>
    </svg>
  );
}
