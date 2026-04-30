// Shared atoms used across all three aesthetic directions.

// ─────────────────────────────────────────────────────────────
// BottleMark — abstract bottle silhouette (CSS, monochrome).
// Not photographic. Reads as a wine bottle without trying to be one.
// ─────────────────────────────────────────────────────────────
function BottleMark({ color = '#5C2A2A', label, height = 80, foil }) {
  // Simple bottle shape via SVG paths — kept abstract and consistent.
  return (
    <svg viewBox="0 0 60 200" width={height * 0.3} height={height} style={{ display: 'block' }}>
      {/* neck */}
      <rect x="25" y="0" width="10" height="50" fill={color} opacity="0.92" />
      {/* foil */}
      {foil && <rect x="23" y="0" width="14" height="22" fill={foil} />}
      {/* shoulder */}
      <path d="M22,50 Q22,62 14,72 L14,190 Q14,196 20,196 L40,196 Q46,196 46,190 L46,72 Q38,62 38,50 Z" fill={color} opacity="0.92"/>
      {/* label area — slightly lighter rectangle */}
      <rect x="14" y="100" width="32" height="60" fill="rgba(255,255,255,0.07)" />
      {label && (
        <text x="30" y="135" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
          {label}
        </text>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Hand-drawn-ish flourish — a simple wavy line, used as a divider.
// ─────────────────────────────────────────────────────────────
function Flourish({ color, width = 80, hand = true }) {
  if (!hand) {
    return <div style={{ width, height: 1, background: color, opacity: 0.4 }} />;
  }
  return (
    <svg viewBox="0 0 80 8" width={width} height={8} style={{ display: 'block' }}>
      <path d="M2,4 Q12,1 22,4 T42,4 T62,4 T78,4" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Tag chip — small flavor/region tags
// ─────────────────────────────────────────────────────────────
function Tag({ children, dir, kind = 'flavor', selected }) {
  const colors = {
    flavor: { fg: dir.accent, bg: 'transparent', border: dir.accent },
    region: { fg: dir.inkSoft, bg: 'transparent', border: dir.line },
    style:  { fg: dir.accent2, bg: 'transparent', border: dir.accent2 },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      fontFamily: dir.body,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: selected ? dir.surface : colors.fg,
      background: selected ? colors.fg : colors.bg,
      border: `0.5px solid ${selected ? colors.fg : colors.border}`,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// SmallCaps — used for sparse navigation/labels (very Soča)
// ─────────────────────────────────────────────────────────────
function SmallCaps({ children, dir, size = 10, color, weight = 500 }) {
  return (
    <span style={{
      fontFamily: dir.body,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: color || dir.inkFaint,
    }}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// HandIcon — minimal hand-drawn-feel SVG icons
// Stroke-based, slightly imperfect. Used when iconStyle === 'hand'.
// ─────────────────────────────────────────────────────────────
function HandIcon({ kind, size = 18, color = 'currentColor', hand = true }) {
  const sw = hand ? 1.2 : 1.4;
  const wobble = hand ? 'd-hand' : '';
  const paths = {
    glass: <>
      <path d={hand ? 'M7,3 Q7.2,9 12,12 Q16.8,9 17,3 Z' : 'M7,3 L17,3 Q16.8,9 12,12 Q7.2,9 7,3 Z'} stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      <path d="M12,12 L12,18" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
      <path d="M9,21 L15,21" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
    </>,
    bottle: <>
      <path d={hand ? 'M10,2 L14,2 L14,7 Q16,9 16,12 L16,21 Q16,22 15,22 L9,22 Q8,22 8,21 L8,12 Q8,9 10,7 Z' : 'M10,2 L14,2 L14,7 Q16,9 16,12 L16,21 L8,21 L8,12 Q8,9 10,7 Z'} stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    </>,
    book: <>
      <path d="M4,4 Q4,3 5,3 L11,3 Q12,3 12,4 L12,20 Q12,21 11,21 L5,21 Q4,21 4,20 Z" stroke={color} strokeWidth={sw} fill="none"/>
      <path d="M12,4 Q12,3 13,3 L19,3 Q20,3 20,4 L20,20 Q20,21 19,21 L13,21 Q12,21 12,20 Z" stroke={color} strokeWidth={sw} fill="none"/>
    </>,
    salon: <>
      <circle cx="8" cy="9" r="3" stroke={color} strokeWidth={sw} fill="none"/>
      <circle cx="16" cy="9" r="3" stroke={color} strokeWidth={sw} fill="none"/>
      <path d="M3,20 Q3,15 8,15 Q11,15 12,17 Q13,15 16,15 Q21,15 21,20" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
    </>,
    note: <>
      <path d="M5,4 L17,4 L19,6 L19,20 L5,20 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      <path d="M8,10 L16,10 M8,14 L14,14 M8,17 L13,17" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
    </>,
    grape: <>
      <circle cx="8" cy="10" r="2.5" stroke={color} strokeWidth={sw} fill="none"/>
      <circle cx="13" cy="10" r="2.5" stroke={color} strokeWidth={sw} fill="none"/>
      <circle cx="10" cy="14" r="2.5" stroke={color} strokeWidth={sw} fill="none"/>
      <circle cx="15" cy="14" r="2.5" stroke={color} strokeWidth={sw} fill="none"/>
      <path d="M10,4 Q12,5 12,8" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
    </>,
    arrow: <>
      <path d="M5,12 L19,12 M14,7 L19,12 L14,17" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
    quill: <>
      <path d="M5,19 L11,13 M19,5 Q15,5 12,9 Q9,12 8,16 L11,13 Q15,12 17,10 Q19,8 19,5 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    </>,
    plus: <>
      <path d="M12,5 L12,19 M5,12 L19,12" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
    </>,
    check: <>
      <path d="M5,12 L10,17 L19,7" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
    cellar: <>
      <path d="M3,11 L12,4 L21,11 L21,21 L3,21 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      <path d="M9,21 L9,14 L15,14 L15,21" stroke={color} strokeWidth={sw} fill="none"/>
    </>,
    chev: <>
      <path d="M9,6 L15,12 L9,18" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: 'block', flexShrink: 0 }}>
      {paths[kind] || paths.glass}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Marginalia — small annotation in the margin (for Salon direction)
// ─────────────────────────────────────────────────────────────
function Marginalia({ children, dir, side = 'right' }) {
  return (
    <div style={{
      fontFamily: dir.mono,
      fontSize: 9,
      letterSpacing: '0.06em',
      color: dir.inkFaint,
      textAlign: side,
      lineHeight: 1.4,
    }}>
      {children}
    </div>
  );
}

window.WC = { BottleMark, Flourish, Tag, SmallCaps, HandIcon, Marginalia };
