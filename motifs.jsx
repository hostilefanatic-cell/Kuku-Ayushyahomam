/* SVG component library — original abstract motifs for the invite */

const Gopuram = ({ tier = 4, fill = "#A03B2A", stroke = "#7A1F1A", style }) => {
  // Stylized stepped gopuram silhouette — geometric tiers, no fine carvings
  // Each tier is a trapezoid with a small dome/finial
  const tiers = Array.from({ length: tier }, (_, i) => i);
  const baseW = 760;
  const baseH = 580;
  return (
    <svg viewBox={`0 0 ${baseW} ${baseH}`} style={style} preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`gop-grad-${fill.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={fill} />
          <stop offset="1" stopColor={stroke} />
        </linearGradient>
      </defs>
      {/* Base platform */}
      <rect x="40" y={baseH - 60} width={baseW - 80} height="60" fill={`url(#gop-grad-${fill.replace('#','')})`} />
      {/* Pillars at base */}
      <rect x="80" y={baseH - 160} width="36" height="100" fill={fill} />
      <rect x={baseW - 116} y={baseH - 160} width="36" height="100" fill={fill} />
      <rect x="60" y={baseH - 60} width="76" height="14" fill={stroke} />
      <rect x={baseW - 136} y={baseH - 60} width="76" height="14" fill={stroke} />
      {/* Central doorway */}
      <path d={`M ${baseW/2 - 42} ${baseH - 60} L ${baseW/2 - 42} ${baseH - 160} Q ${baseW/2} ${baseH - 200} ${baseW/2 + 42} ${baseH - 160} L ${baseW/2 + 42} ${baseH - 60} Z`} fill={stroke} />
      <path d={`M ${baseW/2 - 36} ${baseH - 60} L ${baseW/2 - 36} ${baseH - 158} Q ${baseW/2} ${baseH - 192} ${baseW/2 + 36} ${baseH - 158} L ${baseW/2 + 36} ${baseH - 60} Z`} fill="#2A1810" opacity="0.6" />

      {/* Stepped tiers */}
      {tiers.map((i) => {
        const tierH = 56 - i * 4;
        const inset = 60 + i * 70;
        const y = baseH - 160 - i * tierH - i * 14 - tierH;
        const w = baseW - inset * 2;
        return (
          <g key={i}>
            {/* trapezoid tier */}
            <path d={`M ${inset + 14} ${y + tierH} L ${inset} ${y + tierH + 14} L ${inset + w} ${y + tierH + 14} L ${inset + w - 14} ${y + tierH} Z`} fill={stroke} />
            <path d={`M ${inset + 14} ${y} L ${inset + w - 14} ${y} L ${inset + w} ${y + tierH} L ${inset} ${y + tierH} Z`} fill={`url(#gop-grad-${fill.replace('#','')})`} />
            {/* mini niches as evenly-spaced rectangles */}
            {Array.from({ length: 5 - i }).map((_, j) => {
              const niches = 5 - i;
              const slot = (w - 40) / niches;
              const nx = inset + 20 + slot * j + slot / 2 - 6;
              return <rect key={j} x={nx} y={y + 8} width="12" height={tierH - 16} fill={stroke} opacity="0.7" />;
            })}
            {/* tier divider */}
            <rect x={inset - 2} y={y + tierH - 4} width={w + 4} height="4" fill="#2A1810" opacity="0.3" />
          </g>
        );
      })}

      {/* Top finial — kalasha + spire */}
      {(() => {
        const topY = baseH - 160 - tier * 52 - tier * 14 - 60;
        const cx = baseW / 2;
        return (
          <g>
            {/* dome */}
            <path d={`M ${cx - 42} ${topY + 60} Q ${cx - 42} ${topY + 10} ${cx} ${topY + 10} Q ${cx + 42} ${topY + 10} ${cx + 42} ${topY + 60} Z`} fill={`url(#gop-grad-${fill.replace('#','')})`} />
            {/* spire */}
            <rect x={cx - 5} y={topY - 30} width="10" height="40" fill={stroke} />
            {/* kalasha bulb */}
            <circle cx={cx} cy={topY - 36} r="10" fill={stroke} />
            {/* finial spike */}
            <path d={`M ${cx - 4} ${topY - 46} L ${cx} ${topY - 70} L ${cx + 4} ${topY - 46} Z`} fill={stroke} />
          </g>
        );
      })()}
    </svg>
  );
};

const Ganesha = ({ size = 90, color = "#A8842B", accent = "#7A1F1A" }) => {
  // Clean, dignified abstract glyph — no face. A brass medallion with
  // the Om (ॐ) symbol set in a lotus halo. Original mark.
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <defs>
        <radialGradient id="gan-glow-v2">
          <stop offset="0" stopColor="#FFEFC2" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#FFE7A0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFE7A0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gan-medal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8C66A" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Soft outer halo */}
      <circle cx="60" cy="60" r="58" fill="url(#gan-glow-v2)" />

      {/* Outer lotus petals — 12, evenly spaced */}
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i}
          d="M 60 18 Q 56 30 60 42 Q 64 30 60 18 Z"
          fill={color}
          opacity="0.85"
          transform={`rotate(${i * 30} 60 60)`} />
      ))}

      {/* Inner medallion ring */}
      <circle cx="60" cy="60" r="36" fill="url(#gan-medal)" stroke={accent} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="32" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
      {/* Decorative beaded ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15) * Math.PI / 180;
        return <circle key={i} cx={60 + Math.cos(a) * 34} cy={60 + Math.sin(a) * 34} r="0.9" fill={accent} opacity="0.7" />;
      })}

      {/* ॐ symbol (Devanagari Om) — set in clean serif via SVG text */}
      <text x="60" y="76"
        textAnchor="middle"
        fontFamily="'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif"
        fontSize="42"
        fill={accent}
        style={{ fontWeight: 500 }}>
        ॐ
      </text>

      {/* Tilak dot above */}
      <circle cx="60" cy="34" r="2" fill={accent} />
    </svg>
  );
};

const Bird = ({ size = 32, color = "#7A1F1A" }) => {
  // Simple two-arc bird silhouette — wings shown in flap pose
  return (
    <svg viewBox="0 0 60 36" width={size} height={size * 0.6} className="bird-flap">
      <path d={`M 4 18 Q 18 4 30 18 Q 42 4 56 18`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

const MangoLeafToran = ({ width = 600, color = "#5C7A2E", accent = "#A03B2A" }) => {
  // String of alternating mango leaves on a thread
  const leaves = 14;
  const spacing = width / leaves;
  return (
    <svg viewBox={`0 0 ${width} 60`} width="100%" height="60" preserveAspectRatio="xMidYMid meet">
      {/* Thread */}
      <path d={`M 10 12 Q ${width/2} 22 ${width - 10} 12`} fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
      {Array.from({ length: leaves }).map((_, i) => {
        const x = 10 + i * spacing + spacing / 2;
        const t = (i / leaves) * Math.PI;
        const y = 14 + Math.sin(t) * 6;
        const tilt = (i % 2 === 0) ? -10 : 10;
        return (
          <g key={i} transform={`translate(${x}, ${y}) rotate(${tilt})`}>
            {/* leaf */}
            <path d="M 0 0 Q -6 12 0 32 Q 6 12 0 0 Z" fill={color} opacity="0.92" />
            <path d="M 0 0 L 0 32" stroke="#3F5520" strokeWidth="0.6" />
          </g>
        );
      })}
    </svg>
  );
};

const Kalasha = ({ size = 56, color = "#A8842B", accent = "#A03B2A" }) => {
  // Sacred pot with coconut + mango leaves on top
  return (
    <svg viewBox="0 0 60 90" width={size * 0.7} height={size}>
      {/* Pot body */}
      <path d="M 14 50 Q 6 64 14 80 L 46 80 Q 54 64 46 50 Z" fill={color} stroke="#7A5A1E" strokeWidth="1" />
      {/* Pot neck */}
      <rect x="18" y="42" width="24" height="10" fill={color} stroke="#7A5A1E" strokeWidth="1" />
      {/* Rim */}
      <rect x="14" y="38" width="32" height="6" fill={color} stroke="#7A5A1E" strokeWidth="1" />
      {/* Mango leaves */}
      <path d="M 30 38 Q 18 28 14 14 Q 22 22 28 32" fill="#5C7A2E" />
      <path d="M 30 38 Q 42 28 46 14 Q 38 22 32 32" fill="#5C7A2E" />
      <path d="M 30 38 Q 30 24 30 12" fill="none" stroke="#5C7A2E" strokeWidth="2" />
      {/* Coconut */}
      <ellipse cx="30" cy="10" rx="7" ry="9" fill="#8B5A2B" />
      {/* Decorative bands on pot */}
      <path d="M 12 60 L 48 60" stroke={accent} strokeWidth="1.5" />
      <path d="M 14 70 L 46 70" stroke={accent} strokeWidth="1" opacity="0.7" />
      {/* Tilak dot */}
      <circle cx="30" cy="64" r="2.5" fill={accent} />
    </svg>
  );
};

const HomaKundam = ({ size = 56, color = "#A03B2A" }) => {
  // Square sacred fire pit with flame
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      {/* base */}
      <rect x="6" y="38" width="48" height="16" fill={color} stroke="#7A1F1A" strokeWidth="1" />
      <rect x="10" y="34" width="40" height="6" fill="#7A1F1A" />
      {/* flame */}
      <path d="M 30 12 Q 22 24 26 36 Q 30 30 30 24 Q 30 30 34 36 Q 38 24 30 12" fill="#E25822">
        <animate attributeName="d" dur="0.9s" repeatCount="indefinite"
          values="M 30 12 Q 22 24 26 36 Q 30 30 30 24 Q 30 30 34 36 Q 38 24 30 12;
                  M 30 14 Q 24 26 26 36 Q 30 28 30 22 Q 30 28 34 36 Q 36 26 30 14;
                  M 30 12 Q 22 24 26 36 Q 30 30 30 24 Q 30 30 34 36 Q 38 24 30 12" />
      </path>
      <path d="M 30 20 Q 26 28 28 36 Q 30 32 30 26 Q 30 32 32 36 Q 34 28 30 20" fill="#FFB347" />
      {/* embers */}
      <circle cx="20" cy="46" r="1.5" fill="#FFD700" opacity="0.8" />
      <circle cx="42" cy="46" r="1.2" fill="#FFD700" opacity="0.6" />
    </svg>
  );
};

const LotusIcon = ({ size = 56, color = "#A03B2A", accent = "#C9A227" }) => {
  // Top-down lotus with concentric petals
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45);
        return (
          <path key={i}
            d="M 30 30 Q 24 14 30 6 Q 36 14 30 30"
            fill={color}
            opacity="0.85"
            transform={`rotate(${angle} 30 30)`} />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 + 22.5);
        return (
          <path key={i}
            d="M 30 30 Q 26 18 30 12 Q 34 18 30 30"
            fill={accent}
            opacity="0.85"
            transform={`rotate(${angle} 30 30)`} />
        );
      })}
      <circle cx="30" cy="30" r="4" fill="#FFD700" />
    </svg>
  );
};

const LotusFlourish = ({ width = 120 }) => {
  // Pair of intertwined lotus side-view flourish
  return (
    <svg viewBox="0 0 200 60" width={width} height={width * 0.3}>
      {/* center stem */}
      <path d="M 100 50 L 100 30" stroke="#5C7A2E" strokeWidth="1.5" />
      {/* left lotus side */}
      <path d="M 100 30 Q 70 40 50 32 Q 70 36 100 30" fill="#A03B2A" opacity="0.85" />
      <path d="M 100 30 Q 80 24 60 24 Q 80 30 100 30" fill="#C9A227" opacity="0.9" />
      {/* right lotus side */}
      <path d="M 100 30 Q 130 40 150 32 Q 130 36 100 30" fill="#A03B2A" opacity="0.85" />
      <path d="M 100 30 Q 120 24 140 24 Q 120 30 100 30" fill="#C9A227" opacity="0.9" />
      {/* center bud */}
      <ellipse cx="100" cy="28" rx="5" ry="8" fill="#7A1F1A" />
      {/* flourishes outward */}
      <path d="M 50 32 Q 30 30 14 38" fill="none" stroke="#A8842B" strokeWidth="1" />
      <path d="M 150 32 Q 170 30 186 38" fill="none" stroke="#A8842B" strokeWidth="1" />
      <circle cx="14" cy="38" r="2" fill="#A8842B" />
      <circle cx="186" cy="38" r="2" fill="#A8842B" />
    </svg>
  );
};

const TempleBell = ({ size = 64, color = "#A8842B" }) => {
  return (
    <svg viewBox="0 0 60 90" width={size} height={size * 1.5}>
      {/* hanger */}
      <path d="M 30 4 L 30 14" stroke="#7A5A1E" strokeWidth="2" />
      <circle cx="30" cy="4" r="2" fill="#7A5A1E" />
      {/* top loop */}
      <path d="M 24 14 Q 30 8 36 14" fill="none" stroke={color} strokeWidth="2.5" />
      {/* bell body */}
      <path d="M 14 20 Q 14 60 22 70 L 38 70 Q 46 60 46 20 Z" fill={color} stroke="#7A5A1E" strokeWidth="1.5" />
      {/* rim */}
      <ellipse cx="30" cy="70" rx="16" ry="4" fill="#7A5A1E" />
      {/* clapper */}
      <line x1="30" y1="68" x2="30" y2="78" stroke="#7A5A1E" strokeWidth="2" />
      <circle cx="30" cy="80" r="3.5" fill="#7A5A1E" />
      {/* decorative rings */}
      <path d="M 16 32 Q 30 34 44 32" fill="none" stroke="#7A5A1E" strokeWidth="1" />
      <path d="M 17 46 Q 30 48 43 46" fill="none" stroke="#7A5A1E" strokeWidth="1" opacity="0.7" />
    </svg>
  );
};

const ScrollChevron = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path d="M 1 1 L 7 8 L 13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MusicIcon = ({ on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 18V6l11-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
    {!on && <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.5-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.4 1.8.8 2.5.9 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5-1.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

Object.assign(window, {
  Gopuram, Ganesha, Bird, MangoLeafToran, Kalasha, HomaKundam,
  LotusIcon, LotusFlourish, TempleBell, ScrollChevron,
  MusicIcon, WhatsAppIcon, CalendarIcon, MapPinIcon
});
