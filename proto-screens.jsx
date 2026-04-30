// Member-side mobile screens for the navigable prototype.
// Routes: home, wines, detail, salon, thread, note, profile.

const { BottleMark, Flourish, Tag, SmallCaps, HandIcon, Marginalia } = window.WC;
const SAMP = window.SAMPLE;

const TAB_H = 70;

function densP(d, c, r, x) { return d === 'compact' ? c : d === 'comfy' ? x : r; }

// ─────────────────────────────────────────────────────────────
// Tab bar — shared. Pinned at the bottom of the phone.
// ─────────────────────────────────────────────────────────────
function TabBar({ dir, route, go, iconStyle = 'hand' }) {
  const hand = iconStyle === 'hand';
  const tabs = [
    { k: 'home', label: 'Home', icon: 'cellar' },
    { k: 'wines', label: 'My wines', icon: 'bottle' },
    { k: 'salon', label: 'Salon', icon: 'salon' },
    { k: 'note', label: 'Note', icon: 'quill' },
    { k: 'profile', label: 'Taste', icon: 'grape' },
  ];
  const active = (route === 'thread') ? 'salon' : (route === 'detail') ? 'wines' : route;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: TAB_H,
      background: dir.surface,
      borderTop: `0.5px solid ${dir.lineSoft}`,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      paddingBottom: 14,
      zIndex: 20,
    }}>
      {tabs.map(t => {
        const on = active === t.k;
        return (
          <button key={t.k}
            onClick={() => go({ name: t.k })}
            style={{
              appearance: 'none', border: 'none', background: 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              cursor: 'pointer', padding: '8px 0',
              color: on ? dir.accent : dir.inkFaint,
            }}>
            <HandIcon kind={t.icon} size={20} color="currentColor" hand={hand}/>
            <span style={{
              fontFamily: dir.body, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
              fontWeight: on ? 600 : 500,
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable header — kicker + title + flourish
// ─────────────────────────────────────────────────────────────
function PageHeader({ kicker, title, italic, dir, hand = true, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
      <div>
        <SmallCaps dir={dir}>{kicker}</SmallCaps>
        <h1 style={{
          fontFamily: dir.display, fontWeight: 400, fontSize: 34, lineHeight: 1.05,
          margin: '6px 0 0', letterSpacing: '-0.01em', color: dir.ink,
        }}>
          {italic ? <em style={{ fontStyle: 'italic' }}>{italic} </em> : null}{title}
        </h1>
        <div style={{ marginTop: 10 }}><Flourish color={dir.accent} width={56} hand={hand} /></div>
      </div>
      {right}
    </div>
  );
}

// Tap-back chevron for sub-pages
function BackBar({ dir, label, go, hand = true }) {
  return (
    <button
      onClick={() => go({ name: 'home' })}
      style={{
        appearance: 'none', border: 'none', background: 'transparent',
        display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        color: dir.inkSoft, padding: 0, marginBottom: 14,
      }}>
      <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
        <HandIcon kind="chev" size={14} color="currentColor" hand={hand}/>
      </span>
      <span style={{ fontFamily: dir.body, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — current quarterly allocation
// ─────────────────────────────────────────────────────────────
function Home({ dir, density, iconStyle, go }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20,
      color: dir.ink, fontFamily: dir.body,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px ${pad}px` }}>
        <PageHeader
          kicker="Spring · MMXXVI"
          italic="Welcome back,"
          title="Aurelia."
          dir={dir} hand={hand}
        />
        <p style={{
          fontFamily: dir.display, fontStyle: 'italic', fontSize: 17, lineHeight: 1.55,
          color: dir.inkSoft, margin: '8px 0 0', maxWidth: 320,
        }}>
          Three bottles, chosen for you. Pickup is <span style={{ color: dir.accent }}>Saturday, May 9</span> at Soča.
        </p>
      </div>

      {/* allocation */}
      <div style={{ padding: `0 ${pad}px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <SmallCaps dir={dir}>The allocation</SmallCaps>
          <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>
            tap a bottle to read more
          </span>
        </div>
        {SAMP.allocation.map((b, i) => (
          <button key={b.id}
            onClick={() => go({ name: 'detail', id: b.id })}
            style={{
              appearance: 'none', border: 'none', background: dir.surface,
              width: '100%', textAlign: 'left', cursor: 'pointer',
              padding: `${densP(density, 14, 18, 22)}px 16px`,
              borderTop: i === 0 ? `0.5px solid ${dir.lineSoft}` : 'none',
              borderBottom: `0.5px solid ${dir.lineSoft}`,
              display: 'flex', gap: 14, alignItems: 'center',
              color: dir.ink,
            }}>
            <BottleMark color={b.color} height={64} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: dir.inkFaint }}>
                {String(i + 1).padStart(2, '0')} · {b.region}
              </div>
              <div style={{ fontFamily: dir.display, fontSize: 22, fontStyle: 'italic', color: dir.ink, lineHeight: 1.1, marginTop: 2 }}>
                {b.name}
              </div>
              <div style={{ fontFamily: dir.display, fontSize: 13, color: dir.inkSoft, marginTop: 1 }}>
                {b.producer} · {b.vintage}
              </div>
            </div>
            <HandIcon kind="chev" size={14} color={dir.inkFaint} hand={hand}/>
          </button>
        ))}
      </div>

      {/* curator note */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <div style={{
          padding: '18px 18px 20px', background: dir.paper,
          border: `0.5px solid ${dir.lineSoft}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <SmallCaps dir={dir} color={dir.accent}>From the curator</SmallCaps>
            <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>3d ago</span>
          </div>
          <p style={{
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 16, lineHeight: 1.55,
            color: dir.ink, margin: 0,
          }}>
            "{SAMP.quarter.note}"
          </p>
          <div style={{ marginTop: 12, fontFamily: dir.display, fontSize: 14, color: dir.accent, fontStyle: 'italic' }}>
            — Jacqui
          </div>
          <button
            onClick={() => go({ name: 'note' })}
            style={{
              marginTop: 14, appearance: 'none', border: `0.5px solid ${dir.accent}`,
              background: 'transparent', color: dir.accent,
              padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
              fontFamily: dir.body, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500,
            }}>
            Reply →
          </button>
        </div>
      </div>

      {/* footer */}
      <div style={{ padding: `${pad}px ${pad}px ${pad}px`, textAlign: 'center' }}>
        <Flourish color={dir.inkFaint} width={120} hand={hand} />
        <div style={{ marginTop: 8, fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>
          {SAMP.quarter.location}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MY WINES — history. Grouped by quarter.
// ─────────────────────────────────────────────────────────────
function MyWines({ dir, density, iconStyle, go }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';

  // Group history by quarter
  const groups = {};
  SAMP.history.forEach(h => { (groups[h.q] ||= []).push(h); });
  const order = Object.keys(groups);

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20, fontFamily: dir.body }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <PageHeader
          kicker="The cellar book"
          italic="Every bottle"
          title="you've had."
          dir={dir} hand={hand}
        />
        <p style={{
          fontFamily: dir.display, fontStyle: 'italic', fontSize: 16, lineHeight: 1.5,
          color: dir.inkSoft, margin: '6px 0 0',
        }}>
          A running record. Tap a wine to add a tasting note.
        </p>
      </div>

      <div style={{ padding: `${pad}px 0 0` }}>
        {order.map((q, qi) => (
          <div key={q} style={{ marginBottom: pad * 0.6 }}>
            <div style={{
              padding: `0 ${pad}px 8px`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            }}>
              <SmallCaps dir={dir}>{q}</SmallCaps>
              <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>
                {groups[q].length} bottles
              </span>
            </div>
            {groups[q].map((h, i) => {
              const colors = ['#7A2A2A', '#9B3838', '#5C2A2A'];
              return (
                <button key={h.id}
                  onClick={() => go({ name: 'detail', id: h.id })}
                  style={{
                    appearance: 'none', background: 'transparent',
                    border: 'none', borderTop: `0.5px solid ${dir.lineSoft}`,
                    borderBottom: i === groups[q].length - 1 ? `0.5px solid ${dir.lineSoft}` : 'none',
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    padding: `${densP(density, 12, 14, 18)}px ${pad}px`,
                    display: 'flex', gap: 14, alignItems: 'center',
                  }}>
                  <BottleMark color={colors[i % 3]} height={48} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: dir.display, fontSize: 18, fontStyle: 'italic', color: dir.ink, lineHeight: 1.15 }}>
                      {h.name}
                    </div>
                    <div style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: dir.inkFaint, marginTop: 2 }}>
                      {h.producer} · {h.region}
                    </div>
                    {h.note && (
                      <div style={{
                        fontFamily: dir.display, fontStyle: 'italic', fontSize: 13, color: dir.inkSoft,
                        marginTop: 6, lineHeight: 1.4,
                      }}>
                        "{h.note}"
                      </div>
                    )}
                  </div>
                  {h.rating === 'love' && (
                    <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 13, color: dir.accent, flexShrink: 0 }}>
                      ♥
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WINE DETAIL — opens from Home or My Wines
// ─────────────────────────────────────────────────────────────
function WineDetail({ dir, density, iconStyle, bottleId, go, privateNote, setPrivateNote }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';
  const b = SAMP.allocation.find(x => x.id === bottleId)
         || SAMP.history.find(x => x.id === bottleId);

  if (!b) {
    return <div style={{ padding: 24 }}>Not found. <button onClick={() => go({ name: 'home' })}>Back</button></div>;
  }

  // shape it for either source
  const region = b.region;
  const isAllocation = !!b.curatorNote;

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20, fontFamily: dir.body, color: dir.ink,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <BackBar dir={dir} label="back" go={go} hand={hand} />
      </div>

      {/* hero — bottle on cream */}
      <div style={{
        background: dir.paper,
        borderTop: `0.5px solid ${dir.lineSoft}`,
        borderBottom: `0.5px solid ${dir.lineSoft}`,
        padding: `30px ${pad}px 36px`,
        display: 'flex', gap: 22, alignItems: 'flex-end',
      }}>
        <BottleMark color={b.color || '#5C2A2A'} height={180} />
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
          <SmallCaps dir={dir}>{region}</SmallCaps>
          <h1 style={{
            fontFamily: dir.display, fontWeight: 400, fontSize: 32, fontStyle: 'italic',
            margin: '6px 0 2px', lineHeight: 1, letterSpacing: '-0.01em', color: dir.ink,
          }}>
            {b.name}
          </h1>
          <div style={{ fontFamily: dir.display, fontSize: 15, color: dir.inkSoft }}>
            {b.producer}{b.vintage ? ` · ${b.vintage}` : ''}
          </div>
          <div style={{ marginTop: 12 }}>
            <Flourish color={dir.accent} width={48} hand={hand} />
          </div>
        </div>
      </div>

      {/* curator note */}
      {isAllocation && (
        <div style={{ padding: `${pad}px ${pad}px 0` }}>
          <SmallCaps dir={dir} color={dir.accent}>From Jacqui</SmallCaps>
          <p style={{
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 18, lineHeight: 1.55,
            color: dir.ink, margin: '10px 0 0',
          }}>
            "{b.curatorNote}"
          </p>
        </div>
      )}

      {/* tags */}
      {b.tags && (
        <div style={{ padding: `${pad}px ${pad}px 0` }}>
          <SmallCaps dir={dir}>What to expect</SmallCaps>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {b.tags.map(t => <Tag key={t} dir={dir} kind="flavor">{t}</Tag>)}
          </div>
        </div>
      )}

      {/* tasting note */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <SmallCaps dir={dir}>Your tasting note</SmallCaps>
          <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>only you see this</span>
        </div>
        <textarea
          value={privateNote}
          onChange={(e) => setPrivateNote(e.target.value)}
          placeholder={b.note ? `"${b.note}"` : 'A line, a memory, a pairing — anything…'}
          style={{
            width: '100%', minHeight: 80, padding: 14, resize: 'none',
            background: dir.surface, color: dir.ink,
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
            border: `0.5px solid ${dir.lineSoft}`, borderRadius: 4, outline: 'none',
          }}
        />
      </div>

      {/* salon thread link */}
      {b.id === 'b1' && (
        <div style={{ padding: `${pad * 0.7}px ${pad}px 0` }}>
          <button
            onClick={() => go({ name: 'thread', id: 's1' })}
            style={{
              appearance: 'none', width: '100%', textAlign: 'left',
              background: 'transparent', border: `0.5px solid ${dir.lineSoft}`,
              padding: '14px 16px', cursor: 'pointer', borderRadius: 4,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
            <HandIcon kind="salon" size={20} color={dir.accent} hand={hand}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 14, color: dir.ink, lineHeight: 1.2 }}>
                7 members are talking about this bottle in the Salon
              </div>
              <div style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: dir.inkFaint, marginTop: 4 }}>
                "The Trousseau is uncanny" →
              </div>
            </div>
          </button>
        </div>
      )}

      <div style={{ padding: `${pad}px ${pad}px 0`, textAlign: 'center' }}>
        <Flourish color={dir.inkFaint} width={80} hand={hand} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SALON INDEX — uses Salon typography (already wired by parent)
// ─────────────────────────────────────────────────────────────
function SalonIndex({ dir, density, iconStyle, go }) {
  const pad = densP(density, 22, 30, 38);
  const hand = iconStyle === 'hand';
  const cats = ['All', 'Tastings', 'Pairings', 'Regions', 'Off-Topic'];
  const [cat, setCat] = React.useState('All');
  const visible = cat === 'All' ? SAMP.salon : SAMP.salon.filter(t => t.cat === cat);

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20,
      fontFamily: dir.body, color: dir.ink,
      background: dir.bg,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <SmallCaps dir={dir}>The Salon</SmallCaps>
        <h1 style={{
          fontFamily: dir.display, fontWeight: 400, fontSize: 38, fontStyle: 'italic',
          margin: '6px 0 0', lineHeight: 1, letterSpacing: '-0.01em', color: dir.ink,
        }}>
          A quiet conversation.
        </h1>
        <div style={{ marginTop: 12 }}><Flourish color={dir.accent} width={56} hand={hand} /></div>
        <p style={{
          fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
          color: dir.inkSoft, margin: '14px 0 0',
        }}>
          Speak as you would at the bar. First names only.
        </p>
      </div>

      {/* categories */}
      <div style={{
        padding: `${pad * 0.7}px ${pad}px 0`,
        display: 'flex', gap: 6, flexWrap: 'wrap',
      }}>
        {cats.map(c => {
          const on = c === cat;
          return (
            <button key={c}
              onClick={() => setCat(c)}
              style={{
                appearance: 'none',
                padding: '5px 12px', borderRadius: 999,
                border: `0.5px solid ${on ? dir.ink : dir.line}`,
                background: on ? dir.ink : 'transparent',
                color: on ? dir.surface : dir.inkSoft,
                fontFamily: dir.body, fontSize: 10, letterSpacing: '0.06em',
                cursor: 'pointer',
              }}>{c}</button>
          );
        })}
      </div>

      {/* threads */}
      <div style={{ padding: `${pad * 0.6}px 0 0` }}>
        {visible.map((t, i) => (
          <button key={t.id}
            onClick={() => go({ name: 'thread', id: t.id })}
            style={{
              appearance: 'none', background: 'transparent', border: 'none',
              borderTop: `0.5px solid ${dir.lineSoft}`,
              borderBottom: i === visible.length - 1 ? `0.5px solid ${dir.lineSoft}` : 'none',
              width: '100%', textAlign: 'left', cursor: 'pointer',
              padding: `${densP(density, 14, 18, 22)}px ${pad}px`,
              color: dir.ink,
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
              <SmallCaps dir={dir} size={9} color={t.pinned ? dir.accent : dir.inkFaint}>
                {t.pinned ? '✦ Pinned' : t.cat}
              </SmallCaps>
              <span style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.06em', color: dir.inkFaint }}>·</span>
              <span style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.08em', color: dir.inkFaint, textTransform: 'uppercase' }}>{t.when}</span>
            </div>
            <h3 style={{
              fontFamily: dir.display, fontWeight: 400, fontSize: 22, lineHeight: 1.15,
              margin: 0, color: dir.ink, letterSpacing: '-0.005em',
            }}>
              <span style={{ fontStyle: 'italic' }}>{t.title.split(' ')[0]} </span>
              {t.title.split(' ').slice(1).join(' ')}
            </h3>
            <div style={{
              marginTop: 6, fontFamily: dir.display, fontSize: 14, lineHeight: 1.5,
              color: dir.inkSoft,
            }}>
              {t.preview}
            </div>
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: dir.display, fontStyle: 'italic', fontSize: 13,
            }}>
              <span style={{ color: t.author === 'Jacqui' ? dir.accent : dir.ink }}>{t.author}</span>
              {t.author === 'Jacqui' && <SmallCaps dir={dir} size={8} color={dir.accent2}>· The curator</SmallCaps>}
              <span style={{ marginLeft: 'auto', color: dir.inkFaint }}>{t.replies} replies</span>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: `${pad}px ${pad}px 0`, textAlign: 'center' }}>
        <Flourish color={dir.inkFaint} width={80} hand={hand} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SALON THREAD — Salon typography
// ─────────────────────────────────────────────────────────────
function SalonThread({ dir, density, iconStyle, threadId, go, raised, setRaised }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';
  const t = SAMP.salon.find(x => x.id === threadId) || SAMP.salon[0];

  const bodyText = {
    s1: [
      'Jacqui warned me. I was still not ready.',
      'I drank this slightly chilled with a roast chicken on Sunday, the first warm evening of the year, and the woodland strawberry note was so vivid I kept setting the glass down to look at it. It is technically a red wine. It pours pale rosé. It tastes like nothing I would describe as wine — more like a memory of fruit you ate as a child, the kind that grows wild.',
      'Has anyone else opened theirs yet?',
    ],
    s2: [
      'Has anyone tried this. I am tempted.',
      'The white pepper note seems like it would either be revelatory or completely fight the steak. I cannot tell which. Going to attempt it Saturday and report back unless someone talks me down.',
    ],
    s3: [
      'A few of you are getting Jura wines this round.',
      'I want to talk a little about why this little region matters and what to expect from these bottles. The Jura is a sliver of eastern France between Burgundy and the Swiss border. Tiny. Cold. The wines have an oxidative tradition — sherry-like, nutty, savory — but the Trousseau in your allocation is from the more contemporary, fresh-fruit side of the region.',
      'If you have never had a Trousseau, this is the gentlest possible introduction. If you have, you already know.',
    ],
    s4: [
      'I bought a decanter on impulse. I have used it once.',
      'Tell me your honest decanter habits. Do you actually decant your weeknight bottles? Is it a marriage-y wedding-registry object or do you genuinely use it? I cannot tell if I am a fool.',
    ],
  }[t.id] || ['…'];

  const replies = {
    s1: [
      { who: 'Saoirse', when: '1d', text: 'Yes. I had mine Friday. The grandmother thing — exactly. I called mine.' },
      { who: 'Yuki', when: '1d', text: 'Mine is still on the counter. You are giving me permission to open it on a Tuesday.' },
      { who: 'Jacqui', when: '12h', curator: true, text: 'This is exactly the response I hoped for. The Tissots have been farming this site for four generations and the wine knows it.' },
    ],
    s2: [
      { who: 'Eliot', when: '3d', text: 'Do it. Pepper on pepper. Worst case you have a story.' },
      { who: 'Aurelia', when: '2d', text: 'I had it with a peppered short rib once and almost levitated. Send.' },
    ],
    s3: [
      { who: 'Tomás', when: '6d', text: 'This is so helpful — I always assume Jura means oxidative and step back. Will open with fresh expectations.' },
      { who: 'Indira', when: '5d', text: 'Can we do a Jura tasting at Soča sometime?' },
    ],
    s4: [
      { who: 'Cyrus', when: '13d', text: 'I use mine for water now. There, I said it.' },
      { who: 'Saoirse', when: '12d', text: 'Decanting young natural reds is the actual move. Not the fancy Bordeaux thing.' },
    ],
  }[t.id] || [];

  const isRaised = !!raised[t.id];
  const raisedCount = (t.id === 's1' ? 7 : t.id === 's3' ? 11 : 3) + (isRaised ? 1 : 0);

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20,
      fontFamily: dir.body, color: dir.ink,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <button
          onClick={() => go({ name: 'salon' })}
          style={{
            appearance: 'none', border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            color: dir.inkSoft, padding: 0, marginBottom: 10,
          }}>
          <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
            <HandIcon kind="chev" size={14} color="currentColor" hand={hand}/>
          </span>
          <SmallCaps dir={dir} size={9}>The Salon · {t.cat}</SmallCaps>
        </button>

        <h1 style={{
          fontFamily: dir.display, fontWeight: 400, fontSize: 30, lineHeight: 1.1,
          margin: 0, letterSpacing: '-0.01em', color: dir.ink,
        }}>
          <span style={{ fontStyle: 'italic' }}>{t.title.split(' ')[0]} </span>
          {t.title.split(' ').slice(1).join(' ')}
        </h1>
        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 10,
        }}>
          <span style={{
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 16,
            color: t.author === 'Jacqui' ? dir.accent : dir.ink,
          }}>{t.author}</span>
          {t.author === 'Jacqui' && <SmallCaps dir={dir} size={9} color={dir.accent2}>The curator</SmallCaps>}
          <span style={{ fontFamily: dir.body, fontSize: 9, letterSpacing: '0.1em', color: dir.inkFaint, textTransform: 'uppercase', marginLeft: 'auto' }}>
            {t.when}
          </span>
        </div>

        <div style={{ marginTop: 18 }}><Flourish color={dir.accent} width={56} hand={hand} /></div>

        {/* body */}
        <div style={{ marginTop: 16 }}>
          {bodyText.map((p, i) => (
            <p key={i} style={{
              fontFamily: dir.display, fontSize: 17, lineHeight: 1.6,
              color: dir.ink, margin: i === 0 ? 0 : '14px 0 0',
              fontStyle: i === bodyText.length - 1 && bodyText.length > 2 ? 'italic' : 'normal',
            }}>
              {p}
            </p>
          ))}
        </div>

        {/* raise a glass */}
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setRaised({ ...raised, [t.id]: !isRaised })}
            style={{
              appearance: 'none',
              border: `0.5px solid ${isRaised ? dir.accent : dir.line}`,
              background: isRaised ? dir.accent : 'transparent',
              color: isRaised ? dir.surface : dir.inkSoft,
              padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
              fontFamily: dir.display, fontStyle: 'italic', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.15s',
            }}>
            <HandIcon kind="glass" size={14} color="currentColor" hand={hand}/>
            {isRaised ? 'glass raised' : 'raise a glass'}
          </button>
          <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 13, color: dir.inkFaint }}>
            {raisedCount} raised
          </span>
        </div>
      </div>

      {/* divider */}
      <div style={{ padding: `${pad}px 0`, textAlign: 'center' }}>
        <Flourish color={dir.inkFaint} width={120} hand={hand} />
      </div>

      {/* replies */}
      <div style={{ padding: `0 ${pad}px` }}>
        {replies.map((c, i) => (
          <div key={i} style={{
            padding: `${densP(density, 14, 18, 22)}px 0`,
            borderTop: `0.5px solid ${dir.lineSoft}`,
            borderBottom: i === replies.length - 1 ? `0.5px solid ${dir.lineSoft}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontFamily: dir.display, fontStyle: 'italic', fontSize: 16,
                color: c.curator ? dir.accent : dir.ink,
              }}>{c.who}</span>
              {c.curator && <SmallCaps dir={dir} size={9} color={dir.accent2}>The curator</SmallCaps>}
              <span style={{ marginLeft: 'auto', fontFamily: dir.body, fontSize: 9, letterSpacing: '0.1em', color: dir.inkFaint, textTransform: 'uppercase' }}>{c.when}</span>
            </div>
            <p style={{
              margin: '6px 0 0', fontFamily: dir.display, fontSize: 16, lineHeight: 1.55,
              color: dir.inkSoft,
            }}>
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* reply box */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <textarea
          placeholder="Reply with manners…"
          style={{
            width: '100%', minHeight: 60, padding: 14, resize: 'none',
            background: dir.surface, color: dir.ink,
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
            border: `0.5px solid ${dir.lineSoft}`, borderRadius: 4, outline: 'none',
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NOTE TO JACQUI — direct message
// ─────────────────────────────────────────────────────────────
function Note({ dir, density, iconStyle, go, composeMsg, setComposeMsg }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';
  const [sent, setSent] = React.useState(false);

  const messages = [
    { from: 'jacqui', when: '3 days ago', text: SAMP.quarter.note },
    { from: 'me', when: '2 days ago', text: 'The Schiava last quarter was extraordinary. I want more chillable reds in my life.' },
    { from: 'jacqui', when: '2 days ago', text: 'Noted. The Trousseau in your spring box is exactly that — open it cool, you will see.' },
  ];

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20,
      fontFamily: dir.body, color: dir.ink,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <SmallCaps dir={dir}>A note to</SmallCaps>
        <h1 style={{
          fontFamily: dir.display, fontWeight: 400, fontSize: 36, fontStyle: 'italic',
          margin: '6px 0 0', lineHeight: 1, letterSpacing: '-0.01em', color: dir.accent,
        }}>
          Jacqui
        </h1>
        <p style={{
          fontFamily: dir.display, fontStyle: 'italic', fontSize: 14, lineHeight: 1.5,
          color: dir.inkSoft, margin: '10px 0 0', maxWidth: 280,
        }}>
          The more she knows about your taste, the better next quarter gets.
        </p>
      </div>

      {/* thread */}
      <div style={{ padding: `${pad}px ${pad}px 0`, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: m.from === 'me' ? dir.accent : dir.surface,
            color: m.from === 'me' ? dir.surface : dir.ink,
            padding: '12px 14px',
            borderRadius: 4,
            border: m.from === 'me' ? 'none' : `0.5px solid ${dir.lineSoft}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, gap: 12 }}>
              <SmallCaps dir={dir} size={9}
                color={m.from === 'me' ? 'rgba(255,255,255,0.65)' : dir.inkFaint}>
                {m.from === 'me' ? 'You' : 'Jacqui'}
              </SmallCaps>
              <span style={{
                fontFamily: dir.body, fontSize: 9, letterSpacing: '0.06em',
                color: m.from === 'me' ? 'rgba(255,255,255,0.55)' : dir.inkFaint,
                textTransform: 'uppercase',
              }}>{m.when}</span>
            </div>
            <p style={{
              margin: 0, fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
            }}>
              {m.text}
            </p>
          </div>
        ))}
        {sent && composeMsg && (
          <div style={{
            alignSelf: 'flex-end', maxWidth: '85%',
            background: dir.accent, color: dir.surface,
            padding: '12px 14px', borderRadius: 4,
          }}>
            <SmallCaps dir={dir} size={9} color="rgba(255,255,255,0.65)">You · just now</SmallCaps>
            <p style={{ margin: '4px 0 0', fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5 }}>
              {composeMsg}
            </p>
          </div>
        )}
      </div>

      {/* compose */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <textarea
          value={composeMsg}
          onChange={(e) => setComposeMsg(e.target.value)}
          placeholder="Tell Jacqui what you're loving (or not)…"
          style={{
            width: '100%', minHeight: 80, padding: 14, resize: 'none',
            background: dir.paper, color: dir.ink,
            fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
            border: `0.5px solid ${dir.lineSoft}`, borderRadius: 4, outline: 'none',
          }}
        />
        <button
          disabled={!composeMsg.trim()}
          onClick={() => { setSent(true); setComposeMsg(''); }}
          style={{
            marginTop: 10, width: '100%', appearance: 'none', border: 'none',
            background: composeMsg.trim() ? dir.accent : dir.line,
            color: composeMsg.trim() ? dir.surface : dir.inkFaint,
            padding: '14px 20px', borderRadius: 4, cursor: composeMsg.trim() ? 'pointer' : 'default',
            fontFamily: dir.body, fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
          Send to Jacqui
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE — taste fingerprint
// ─────────────────────────────────────────────────────────────
function Profile({ dir, density, iconStyle, go, pickedFlavors, setPickedFlavors }) {
  const pad = densP(density, 22, 28, 36);
  const hand = iconStyle === 'hand';

  const toggle = (f) => {
    const next = new Set(pickedFlavors);
    if (next.has(f)) next.delete(f); else next.add(f);
    setPickedFlavors(next);
  };

  return (
    <div style={{
      height: '100%', overflowY: 'auto', paddingBottom: TAB_H + 20,
      fontFamily: dir.body, color: dir.ink,
    }}>
      <div style={{ padding: `${pad - 4}px ${pad}px 0` }}>
        <SmallCaps dir={dir}>Your taste</SmallCaps>
        <h1 style={{
          fontFamily: dir.display, fontWeight: 400, fontSize: 32, fontStyle: 'italic',
          margin: '6px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em', color: dir.ink,
        }}>
          Aurelia, in <span style={{ color: dir.accent }}>flavors</span>.
        </h1>
        <div style={{ marginTop: 12 }}><Flourish color={dir.accent} width={56} hand={hand} /></div>
        <p style={{
          fontFamily: dir.display, fontStyle: 'italic', fontSize: 15, lineHeight: 1.5,
          color: dir.inkSoft, margin: '14px 0 0',
        }}>
          What's currently calling to you. Update anytime — Jacqui sees this when she curates.
        </p>
      </div>

      {/* flavor cloud */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SAMP.flavors.map(f => {
            const on = pickedFlavors.has(f);
            return (
              <button key={f}
                onClick={() => toggle(f)}
                style={{
                  appearance: 'none',
                  padding: '8px 14px', borderRadius: 999,
                  border: `0.5px solid ${on ? dir.accent : dir.line}`,
                  background: on ? dir.accent : 'transparent',
                  color: on ? dir.surface : dir.inkSoft,
                  fontFamily: dir.display, fontStyle: 'italic', fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* adventure scale */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <SmallCaps dir={dir}>Adventure scale</SmallCaps>
          <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.accent }}>surprise me</span>
        </div>
        <div style={{ position: 'relative', height: 26 }}>
          <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 1, background: dir.line }}/>
          <div style={{ position: 'absolute', top: 8, left: '72%', width: 9, height: 9, borderRadius: '50%', background: dir.accent }}/>
          <div style={{ position: 'absolute', top: 0, left: 0, fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>cozy</div>
          <div style={{ position: 'absolute', top: 0, right: 0, fontFamily: dir.display, fontStyle: 'italic', fontSize: 12, color: dir.inkFaint }}>surprise me</div>
        </div>
      </div>

      {/* facts */}
      <div style={{ padding: `${pad}px ${pad}px 0` }}>
        <SmallCaps dir={dir}>Facts</SmallCaps>
        <div style={{ marginTop: 10 }}>
          {[
            ['Member since', SAMP.member.joined],
            ['Quarters with the club', String(SAMP.member.quartersWith)],
            ['Bottles received', '24'],
            ['Loved this year', '7'],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '12px 0', borderBottom: `0.5px solid ${dir.lineSoft}`,
            }}>
              <span style={{ fontFamily: dir.body, fontSize: 11, letterSpacing: '0.08em', color: dir.inkSoft, textTransform: 'uppercase' }}>{k}</span>
              <span style={{ fontFamily: dir.display, fontStyle: 'italic', fontSize: 16, color: dir.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `${pad}px ${pad}px 0`, textAlign: 'center' }}>
        <Flourish color={dir.inkFaint} width={80} hand={hand} />
      </div>
    </div>
  );
}

window.WC.proto = { TabBar, Home, MyWines, WineDetail, SalonIndex, SalonThread, Note, Profile };
