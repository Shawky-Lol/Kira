/* ============================================================
   KIRA SHOP — main.js
   Blood cursor · Dark magic glyphs · Glitch title · Cart
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. TIMESTAMP
   ───────────────────────────────────────────── */
(function initTimestamp() {
  const el = document.getElementById('timestamp');
  if (!el) return;
  const now = new Date();
  el.textContent =
    now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' ' +
    now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
})();


/* ─────────────────────────────────────────────
   2. CART
   ───────────────────────────────────────────── */
let cartCount = 0;

document.getElementById('cartBtn').addEventListener('click', () => {
  showToast('Shoppex checkout — backend integration pending');
});

function addToCart(name) {
  cartCount++;
  document.getElementById('cartBtn').textContent = `Cart (${cartCount})`;
  showToast(`${name} added to cart`);
}

// Expose globally so inline onclick="" works
window.addToCart = addToCart;


/* ─────────────────────────────────────────────
   3. TOAST
   ───────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

window.showToast = showToast;


/* ─────────────────────────────────────────────
   4. BLOOD CURSOR
   ───────────────────────────────────────────── */
(function initBloodCursor() {
  const cursor = document.getElementById('bloodCursor');
  if (!cursor) return;

  let mx = -100, my = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    spawnDrip(mx, my);
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  // Click burst
  document.addEventListener('mousedown', () => {
    cursor.style.transform =
      `translate(calc(${mx}px - 50%), calc(${my}px - 50%)) scale(1.6)`;
    setTimeout(() => {
      cursor.style.transform =
        `translate(calc(${mx}px - 50%), calc(${my}px - 50%)) scale(1)`;
    }, 150);

    // Spawn extra drips on click
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnDrip(mx + (Math.random() - 0.5) * 14, my), i * 60);
    }
  });

  let lastDrip = 0;

  function spawnDrip(x, y) {
    const now = performance.now();
    if (now - lastDrip < 80) return; // throttle
    lastDrip = now;

    const drip = document.createElement('div');
    drip.className = 'drip';
    drip.style.left = (x - 2.5 + (Math.random() - 0.5) * 8) + 'px';
    drip.style.top  = y + 'px';
    drip.style.width = (3 + Math.random() * 4) + 'px';
    document.body.appendChild(drip);

    setTimeout(() => drip.remove(), 950);
  }
})();


/* ─────────────────────────────────────────────
   5. DARK MAGIC GLYPHS (Canvas)
   ───────────────────────────────────────────── */
(function initGlyphs() {
  const canvas = document.getElementById('glyphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* Character pools — runic, kanji, occult, gothic fraktur, alchemical */
  const RUNES = [
    'ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ',
    'ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ',
    'ᛚ','ᛜ','ᛞ','ᛟ',
  ];

  const KANJI = [
    '死','神','鬼','闇','呪','魔','滅','怨',
    '恨','霊','狂','悪','暗','剣','血','命',
    '罪','罰','憎','怖','滅','崩','傷','嘘',
  ];

  const OCCULT = [
    '✦','✧','⛧','⸸','☽','☾','⚰','⛦',
    '†','‡','⌖','◈','⟁','⧗','⬡','⬟',
    '⚔','☠','⚜','⚿','⛩','🜏','🝊','🜔',
  ];

  const FRAKTUR = [
    '𝔄','𝔅','𝔇','𝔈','𝔉','𝔊','𝔍','𝔎',
    '𝔏','𝔐','𝔑','𝔒','𝔓','𝔔','𝔖','𝔗',
    '𝔘','𝔙','𝔚','𝔛','𝔜',
  ];

  const GREEK = ['Ω','Ψ','Λ','Σ','Δ','Φ','Γ','Θ','Ξ','Π','Ϡ','Ϟ'];

  const ALL_CHARS = [...RUNES, ...KANJI, ...OCCULT, ...FRAKTUR, ...GREEK];

  /* Color palettes: [r, g, b] */
  const PALETTES = [
    [130,  0,  0],  // deep blood red (most common)
    [100,  0,  0],  // near-black red
    [160, 90,  0],  // dark amber / cursed gold
    [ 80,  0,100],  // void purple
    [  0, 60, 80],  // abyss teal (rare)
  ];

  const PALETTE_WEIGHTS = [0.50, 0.20, 0.15, 0.10, 0.05];

  function pickPalette() {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < PALETTE_WEIGHTS.length; i++) {
      acc += PALETTE_WEIGHTS[i];
      if (r < acc) return PALETTES[i];
    }
    return PALETTES[0];
  }

  function randChar() {
    return ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
  }

  /* Glyph state */
  let glyphs = [];
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createGlyph(forceAlpha) {
    const [r, g, b] = pickPalette();
    const size      = 12 + Math.random() * 40;
    const maxAlpha  = 0.07 + Math.random() * 0.32;

    return {
      x:         Math.random() * W,
      y:         Math.random() * H,
      char:      randChar(),
      size,
      alpha:     forceAlpha ? maxAlpha * Math.random() : 0,
      maxAlpha,
      phase:     forceAlpha ? 'hold' : 'in',
      life:      forceAlpha ? Math.floor(Math.random() * 80) : 0,
      maxLife:   90 + Math.random() * 160,
      driftX:    (Math.random() - 0.5) * 0.35,
      riseSpeed: 0.08 + Math.random() * 0.28,
      r, g, b,
      // morph: occasionally swap character mid-life
      morphAt:   Math.random() < 0.3 ? 0.45 + Math.random() * 0.2 : -1,
      morphed:   false,
    };
  }

  /* Pre-populate */
  for (let i = 0; i < 40; i++) {
    glyphs.push(createGlyph(true));
  }

  /* Animation loop */
  let frame = 0;

  function tick() {
    requestAnimationFrame(tick);
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Spawn new glyphs at a steady rate
    if (frame % 10 === 0 && glyphs.length < 70) glyphs.push(createGlyph(false));
    if (frame % 22 === 0 && glyphs.length < 70) glyphs.push(createGlyph(false));

    for (let i = glyphs.length - 1; i >= 0; i--) {
      const g = glyphs[i];

      // Move
      g.x += g.driftX;
      g.y -= g.riseSpeed;
      g.life++;

      // Morph character once at mid-life
      if (!g.morphed && g.morphAt > 0) {
        const progress = g.life / g.maxLife;
        if (progress >= g.morphAt) {
          g.char   = randChar();
          g.morphed = true;
        }
      }

      // Fade state machine
      if (g.phase === 'in') {
        g.alpha += 0.010;
        if (g.alpha >= g.maxAlpha) { g.alpha = g.maxAlpha; g.phase = 'hold'; }
      } else if (g.phase === 'hold') {
        if (g.life > g.maxLife * 0.65) g.phase = 'out';
      } else {
        g.alpha -= 0.007;
        if (g.alpha <= 0) { glyphs.splice(i, 1); continue; }
      }

      // Draw
      ctx.save();
      ctx.globalAlpha = g.alpha;
      ctx.font        = `${g.size}px 'UnifrakturMaguntia', serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle   = `rgb(${g.r},${g.g},${g.b})`;
      ctx.fillText(g.char, g.x, g.y);
      ctx.restore();
    }
  }

  tick();
})();


/* ─────────────────────────────────────────────
   6. GLITCH — extra random flicker on scroll
   ───────────────────────────────────────────── */
(function initScrollGlitch() {
  const title = document.getElementById('heroTitle');
  if (!title) return;

  let scrollY = 0;
  let ticking  = false;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        // Intensify glow as user scrolls away from hero
        const intensity = Math.min(scrollY / 400, 1);
        title.style.filter = intensity > 0.1
          ? `brightness(${1 + intensity * 0.4})`
          : '';
        ticking = false;
      });
      ticking = true;
    }
  });

  // Random glitch burst every 8-14 seconds
  function randomGlitchBurst() {
    title.classList.add('glitch-active');
    setTimeout(() => title.classList.remove('glitch-active'), 300 + Math.random() * 200);
    setTimeout(randomGlitchBurst, 8000 + Math.random() * 6000);
  }
  setTimeout(randomGlitchBurst, 3000);
})();