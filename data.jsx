// Sample data — used across all screens
const SAMPLE = {
  member: {
    name: 'Aurelia',
    fullName: 'Aurelia Vance',
    joined: 'Spring 2024',
    quartersWith: 8,
  },
  curator: { name: 'Jacqui' },

  // Current quarterly allocation
  quarter: {
    label: 'Spring · MMXXVI',
    pickupDate: 'Saturday, May 9',
    pickupTime: '4 — 6 pm',
    location: 'Soča · 120 N. Main Ave, White Salmon',
    note: 'I leaned into chillable reds this quarter — the kind of bottles I want on the patio at dusk. The Trousseau is the one I want to hear back about.',
  },

  allocation: [
    {
      id: 'b1',
      name: 'Trousseau',
      producer: 'Domaine Tissot',
      region: 'Arbois · Jura',
      vintage: '2023',
      curatorNote: 'Pale, almost rosé in color. I think you will find the woodland strawberry uncanny — a little wild, like it wandered in from the woods.',
      tags: ['light-bodied', 'bright fruit', 'old-world'],
      color: '#7A2A2A',
    },
    {
      id: 'b2',
      name: 'Susucaru Rosso',
      producer: 'Frank Cornelissen',
      region: 'Mt. Etna · Sicily',
      vintage: '2022',
      curatorNote: 'You said you wanted something "alive." This is alive. Volcanic soil, glou-glou, drink it cool.',
      tags: ['natural', 'spice', 'volcanic'],
      color: '#9B3838',
    },
    {
      id: 'b3',
      name: 'Pineau d\'Aunis',
      producer: 'Lise & Bertrand Jousset',
      region: 'Loire',
      vintage: '2023',
      curatorNote: 'White pepper. That is the whole sales pitch. Open it with charcuterie.',
      tags: ['peppery', 'herbal', 'natural'],
      color: '#5C2A2A',
    },
  ],

  history: [
    { id: 'h1', q: 'Winter 25', name: 'Lacrima di Morro d\'Alba', producer: 'Marotti Campi', region: 'Marche', received: 'Feb 2026', note: 'Roses. I poured this for my mother and she cried a little.', rating: 'love' },
    { id: 'h2', q: 'Winter 25', name: 'Riesling Kabinett', producer: 'Keller', region: 'Rheinhessen', received: 'Feb 2026', note: 'I drank this on a Tuesday with takeout and felt rich.', rating: 'love' },
    { id: 'h3', q: 'Winter 25', name: 'Mondeuse', producer: 'Domaine Belluard', region: 'Savoie', received: 'Feb 2026', note: '', rating: null },
    { id: 'h4', q: 'Autumn 25', name: 'Schiava', producer: 'Foradori', region: 'Alto Adige', received: 'Nov 2025', note: 'I want more of these chillable reds.', rating: 'love' },
    { id: 'h5', q: 'Autumn 25', name: 'Cinsault', producer: 'Mas de Daumas Gassac', region: 'Languedoc', received: 'Nov 2025', note: 'A little hot for me. Good with food though.', rating: 'meh' },
    { id: 'h6', q: 'Autumn 25', name: 'Picpoul', producer: 'Domaine Félines', region: 'Languedoc', received: 'Nov 2025', note: '', rating: null },
  ],

  salon: [
    { id: 's1', cat: 'Tastings', author: 'Eliot', when: '2 days ago', title: 'The Trousseau is uncanny', preview: 'Jacqui warned me. I was still not ready for the woodland strawberry. Drank it slightly chilled with a roast chicken on Sunday and wanted to call my grandmother.', replies: 7 },
    { id: 's2', cat: 'Pairings', author: 'Yuki', when: '4 days ago', title: 'Pineau d\'Aunis with a peppered ribeye?', preview: 'Has anyone tried this. I am tempted. The white pepper note seems like it would either be revelatory or completely fight the steak.', replies: 4 },
    { id: 's3', cat: 'Regions', author: 'Jacqui', when: '1 week ago', pinned: true, title: 'Spring quarter — a note on the Jura', preview: 'A few of you are getting Jura wines this round. I want to talk about why this little region matters and what to expect from these bottles.', replies: 12 },
    { id: 's4', cat: 'Off-Topic', author: 'Cyrus', when: '2 weeks ago', title: 'Decanters — am I a fool', preview: 'I bought a decanter on impulse. I have used it once. Tell me your honest decanter habits.', replies: 9 },
  ],

  members: [
    { id: 'm1', name: 'Aurelia V.', joined: 'Spring 24', last: '2d', flag: 'msg' },
    { id: 'm2', name: 'Eliot M.', joined: 'Autumn 24', last: '5d' },
    { id: 'm3', name: 'Yuki T.', joined: 'Spring 25', last: '1w', flag: 'low' },
    { id: 'm4', name: 'Cyrus B.', joined: 'Winter 23', last: '2w' },
    { id: 'm5', name: 'Saoirse R.', joined: 'Summer 25', last: '3d' },
    { id: 'm6', name: 'Tomás P.', joined: 'Spring 25', last: '1d', flag: 'msg' },
    { id: 'm7', name: 'Indira K.', joined: 'Autumn 23', last: '4d' },
    { id: 'm8', name: 'Marcus L.', joined: 'Winter 24', last: '6d' },
  ],

  catalog: [
    { id: 'c1', name: 'Trousseau', producer: 'Tissot', region: 'Jura', vintage: '23', stock: 6, price: 38, sent: false, neverSend: false },
    { id: 'c2', name: 'Susucaru Rosso', producer: 'Cornelissen', region: 'Etna', vintage: '22', stock: 4, price: 32, sent: false, neverSend: false },
    { id: 'c3', name: 'Pineau d\'Aunis', producer: 'Jousset', region: 'Loire', vintage: '23', stock: 9, price: 28, sent: false, neverSend: false },
    { id: 'c4', name: 'Lacrima', producer: 'Marotti', region: 'Marche', vintage: '23', stock: 7, price: 26, sent: true, lastSent: 'W25' },
    { id: 'c5', name: 'Schiava', producer: 'Foradori', region: 'Alto Adige', vintage: '23', stock: 2, price: 34, sent: true, lastSent: 'A25' },
    { id: 'c6', name: 'Mondeuse', producer: 'Belluard', region: 'Savoie', vintage: '22', stock: 3, price: 42, sent: true, lastSent: 'W25' },
    { id: 'c7', name: 'Gamay', producer: 'Lapierre', region: 'Beaujolais', vintage: '23', stock: 12, price: 36, sent: false },
    { id: 'c8', name: 'Frappato', producer: 'COS', region: 'Sicily', vintage: '22', stock: 5, price: 30, sent: false },
  ],

  flavors: [
    'bright fruit', 'earthy depth', 'floral aromatics', 'spice & smoke',
    'crisp minerality', 'rich & velvety', 'herbal & green', 'funky & wild',
  ],
};

window.SAMPLE = SAMPLE;
