// Design tokens for The Wine Club — three directions.
// Each direction is a complete palette + type system.

const DIRECTIONS = {
  cellarBook: {
    name: 'The Cellar Book',
    tag: 'Warm cream · deep wine · Cormorant',
    bg: '#F5F0EB',
    surface: '#FAF6F1',
    paper: '#FFFCF7',
    ink: '#2D2926',
    inkSoft: '#5C5651',
    inkFaint: '#8C7E72',
    line: '#E8E0D8',
    lineSoft: 'rgba(45,41,38,0.08)',
    accent: '#5C2A2A',          // wine
    accent2: '#A8513A',          // bronze
    blush: '#D4AFA0',
    display: '"Cormorant Garamond", "Cormorant", Georgia, serif',
    body: '"Inter", "Helvetica Neue", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  carbonCream: {
    name: 'Carbon & Cream',
    tag: 'Charcoal night · candlelit · cinematic',
    bg: '#1A1614',
    surface: '#221E1B',
    paper: '#2A2521',
    ink: '#F0E8DD',
    inkSoft: '#C2B6A8',
    inkFaint: '#857A6E',
    line: 'rgba(240,232,221,0.08)',
    lineSoft: 'rgba(240,232,221,0.04)',
    accent: '#D4A88C',           // candleglow
    accent2: '#A8513A',          // ember
    blush: '#C97D6A',
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  salon: {
    name: 'Salon',
    tag: 'Newsprint · marginalia · hand-set',
    bg: '#EFEAE0',
    surface: '#F7F2E8',
    paper: '#FCF8EE',
    ink: '#1F1B17',
    inkSoft: '#5A5048',
    inkFaint: '#8A7E72',
    line: 'rgba(31,27,23,0.14)',
    lineSoft: 'rgba(31,27,23,0.07)',
    accent: '#7A2A1F',           // oxblood
    accent2: '#3F4A2E',           // bottle green
    blush: '#C49A6C',
    display: '"EB Garamond", Garamond, serif',
    body: '"EB Garamond", Garamond, serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
};

window.DIRECTIONS = DIRECTIONS;
