// Paints the night → dusk → mountains → meadow scene off the main thread.
// Ported from the Claude Design "Field Notes" painter. Receives {W, H, scale},
// replies with an ImageBitmap the page swaps in when it's ready.

const lerp = (a, b, t) => a + (b - a) * t;

function rng(seed) {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ramp(stops) {
  const out = [];
  for (let i = 0; i < 512; i++) {
    const t = i / 511;
    let j = 0;
    while (j < stops.length - 2 && stops[j + 1][0] < t) j++;
    const a = stops[j], b = stops[j + 1];
    const u = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0] || 1)));
    out.push([0, 1, 2].map((k) => lerp(a[1][k], b[1][k], u)));
  }
  return out;
}
const sample = (r, t) => r[Math.min(511, Math.max(0, Math.round(t * 511)))];

function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (mx + mn) / 2, d = mx - mn;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s, l];
}
function hsl2rgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const p = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return p.map((v) => (v + m) * 255);
}
function jit(rgb, rand, jh, jl) {
  const [h, s, l] = rgb2hsl(rgb[0], rgb[1], rgb[2]);
  return hsl2rgb(
    h + (rand() * 2 - 1) * jh,
    Math.min(1, Math.max(0, s + (rand() * 2 - 1) * 0.07)),
    Math.min(0.97, Math.max(0.03, l + (rand() * 2 - 1) * jl)),
  ).map(Math.round);
}
function warmify(rgb, x, y, sx, sy, radius, strength) {
  const d = Math.hypot(x - sx, y - sy);
  if (d > radius) return rgb;
  const f = (1 - d / radius) * strength;
  return [rgb[0] + (252 - rgb[0]) * f, rgb[1] + (208 - rgb[1]) * f, rgb[2] + (150 - rgb[2]) * f].map(Math.round);
}
function dab(ctx, x, y, w, h, rot, rgb, alpha, edge) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(1, Math.max(0.05, h / w));
  const r = w / 2;
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  const c = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},`;
  g.addColorStop(0, c + alpha.toFixed(3) + ')');
  g.addColorStop(Math.min(0.95, edge), c + (alpha * 0.85).toFixed(3) + ')');
  g.addColorStop(1, c + '0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 6.2832);
  ctx.fill();
  ctx.restore();
}
function ridgeLine(W, base, amp, rand, rolling) {
  const cycles = rolling
    ? [0.8 + rand() * 0.5, 1.8 + rand() * 0.8, 3.5 + rand() * 1.5, 7 + rand() * 3]
    : [1.1 + rand() * 0.8, 2.3 + rand() * 1.4, 4.5 + rand() * 2.5, 9 + rand() * 5];
  const amps = rolling ? [1, 0.45, 0.15, 0.05] : [1, 0.55, 0.28, 0.13];
  const modes = cycles.map((c, i) => ({ c, a: amps[i], p: rand() * 6.283 }));
  const tot = amps.reduce((a, b) => a + b, 0);
  const pts = [];
  const step = Math.max(4, Math.round(W / 340));
  for (let x = 0; x <= W + step; x += step) {
    let v = 0;
    for (const m of modes) v += m.a * Math.sin((6.283 * m.c * x) / W + m.p);
    v /= tot;
    const p = rolling ? 0.5 + 0.5 * v : Math.pow(1 - Math.abs(v), 1.6);
    pts.push([x, base - amp * p + (rand() * 2 - 1) * 0.8]);
  }
  return pts;
}
// Closed shape from a ridge line down to the bottom edge (no Path2D: not in every worker).
function fillShape(ctx, pts, W, H) {
  ctx.beginPath();
  ctx.moveTo(-10, H + 10);
  ctx.lineTo(-10, pts[0][1]);
  for (const p of pts) ctx.lineTo(p[0], p[1]);
  ctx.lineTo(W + 10, H + 10);
  ctx.closePath();
}

const P = { edge: 0.72, jitterH: 9, jitterL: 0.09, rotSpread: 0.35 };

function ridge(ctx, W, H, R, rand, sunX, f) {
  const { base, amp } = R;
  const pts = ridgeLine(W, base, amp, rand, R.rolling);
  const g = ctx.createLinearGradient(0, base - amp, 0, Math.min(H, base + amp * 2));
  g.addColorStop(0, `rgb(${R.col})`);
  g.addColorStop(1, `rgb(${R.dark})`);
  fillShape(ctx, pts, W, H);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  fillShape(ctx, pts, W, H);
  ctx.clip();
  const yTop = base - amp, yBot = Math.min(H, base + amp * 1.8);
  const n = Math.round((W * (yBot - yTop) * 0.005) / (f * f));
  for (let i = 0; i < n; i++) {
    const x = rand() * W;
    const y = yTop + rand() * (yBot - yTop);
    let col = rand() < 0.55 ? R.col : R.dark;
    col = jit(col, rand, P.jitterH * 0.8, P.jitterL);
    col = warmify(col, x, y, sunX, yTop, W * 0.45, 0.2);
    dab(ctx, x, y, (12 + rand() * 34) * f * 0.85, (5 + rand() * 12) * f * 0.85, (rand() * 2 - 1) * 0.9, col, 0.14 + rand() * 0.2, P.edge);
  }
  ctx.restore();
  if (R.snow) {
    for (let i = 2; i < pts.length - 2; i++) {
      const p = pts[i];
      const elev = (base - p[1]) / amp;
      if (elev > 0.62 && rand() < 0.4 + elev * 0.35) {
        const slope = Math.atan2(pts[i + 1][1] - pts[i - 1][1], pts[i + 1][0] - pts[i - 1][0]);
        const k = 1 + Math.floor(rand() * 3);
        for (let j = 0; j < k; j++) {
          const col = jit([234, 229, 241], rand, 5, 0.04);
          const drop = (1.5 + j * (2.5 + rand() * 3.5)) * f;
          dab(ctx, p[0] + (rand() * 2 - 1) * 4 * f, p[1] + drop, (5 + rand() * 9) * (0.4 + elev * 0.6) * f, (2 + rand() * 2.6) * f, slope + (rand() * 2 - 1) * 0.2, col, (0.52 - j * 0.13) * (0.4 + elev * 0.6), Math.min(0.8, P.edge));
        }
      }
    }
  }
  if (R.haze > 0) {
    const hg = ctx.createLinearGradient(0, base - amp, 0, base + amp);
    hg.addColorStop(0, `rgba(240,196,150,${R.haze})`);
    hg.addColorStop(1, 'rgba(240,196,150,0)');
    fillShape(ctx, pts, W, H);
    ctx.fillStyle = hg;
    ctx.fill();
  }
}

function paint(ctx, W, H, seed) {
  const rand = rng(11 + seed * 101);
  const f = Math.min(2.1, Math.max(1, W / 900));
  const horizon = H * 0.5;
  const nightEnd = H * 0.24;
  const meadowTop = H * 0.755;
  const mountainH = meadowTop - horizon;
  const sunX = W * (0.55 + rand() * 0.18), sunY = horizon - 20;
  const skyStops = [
    [0, [5, 7, 15]], [0.16, [13, 19, 48]], [0.32, [28, 39, 80]], [0.46, [61, 77, 125]],
    [0.6, [109, 115, 159]], [0.72, [160, 127, 152]], [0.84, [214, 150, 109]],
    [0.94, [236, 181, 124]], [1, [243, 201, 143]],
  ];
  const sky = ramp(skyStops);
  const meadowStops = [[0, [72, 63, 90]], [0.15, [62, 70, 60]], [0.35, [82, 102, 72]], [0.7, [66, 88, 59]], [1, [52, 70, 47]]];
  const meadow = ramp(meadowStops);
  const times = (n, fn) => { for (let i = Math.round(n); i > 0; i--) fn(); };

  // 1 — underpainting + sun glow
  const ug = ctx.createLinearGradient(0, 0, 0, horizon);
  skyStops.forEach((s) => ug.addColorStop(s[0], `rgb(${s[1]})`));
  ctx.fillStyle = ug;
  ctx.fillRect(0, 0, W, H);
  const sg = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 160 * f);
  sg.addColorStop(0, 'rgba(255,224,166,0.7)');
  sg.addColorStop(0.4, 'rgba(250,196,130,0.32)');
  sg.addColorStop(1, 'rgba(250,196,130,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, horizon + 80);

  // 2 — painted stars in the night zone
  times(W * 0.28, () => {
    const x = rand() * W, y = Math.pow(rand(), 1.5) * nightEnd;
    const r = 0.4 + rand() * 1.1;
    const a = 0.2 + rand() * 0.5 * (1 - y / nightEnd);
    const col = rand() < 0.12 ? [255, 225, 190] : [225, 235, 255];
    if (rand() < 0.04) dab(ctx, x, y, r * 9, r * 9, 0, col, 0.09, 0.4);
    ctx.fillStyle = `rgba(${col},${a.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 6.2832);
    ctx.fill();
  });

  // 3 — sky brushwork, big → small
  const skyA = W * (horizon + 20);
  const passes = [
    { n: (skyA * 0.0034) / (f * f), w: [46, 110], h: [10, 22], a: [0.12, 0.16], fleck: false },
    { n: (skyA * 0.0061) / (f * f), w: [20, 52], h: [6, 14], a: [0.16, 0.2], fleck: false },
    { n: (skyA * 0.0057) / (f * f), w: [8, 24], h: [3, 8], a: [0.2, 0.26], fleck: true },
  ];
  for (const pass of passes) {
    times(pass.n, () => {
      const x = rand() * W, y = rand() * (horizon + 20);
      const t = Math.min(1, y / horizon);
      const damp = 0.3 + 0.7 * t;
      let col = jit(sample(sky, t), rand, P.jitterH * damp, P.jitterL * damp);
      col = warmify(col, x, y, sunX, sunY, 190 * f, 0.4);
      if (pass.fleck && t > 0.45 && rand() < 0.03 + 0.14 * t) {
        col = jit(t > 0.72 ? [154, 112, 158] : [190, 155, 140], rand, 10, 0.06);
      }
      const w = lerp(pass.w[0], pass.w[1], rand()) * f;
      const h = lerp(pass.h[0], pass.h[1], rand()) * f;
      const flat = 0.45 + 0.55 * t;
      dab(ctx, x, y, w, h, (rand() * 2 - 1) * P.rotSpread * (1.4 - flat), col, pass.a[0] + rand() * pass.a[1], P.edge);
    });
  }

  // 4 — warm streaks near the horizon + cirrus in the dusk band
  const streakCols = [[238, 160, 120], [246, 196, 134], [214, 120, 110], [192, 124, 152]];
  times((W * 0.18) / f, () => {
    const y = horizon * (0.78 + rand() * 0.2);
    const col = jit(streakCols[Math.floor(rand() * streakCols.length)], rand, 7, 0.06);
    dab(ctx, rand() * W, y, (60 + rand() * 130) * f, (4 + rand() * 7) * f, (rand() * 2 - 1) * 0.05, col, 0.14 + rand() * 0.2, P.edge);
  });
  times((W * 0.035) / f, () => {
    const y = horizon * (0.52 + rand() * 0.24);
    const col = jit([196, 178, 194], rand, 8, 0.06);
    dab(ctx, rand() * W, y, (90 + rand() * 200) * f, (6 + rand() * 12) * f, (rand() * 2 - 1) * 0.04, col, 0.09 + rand() * 0.12, 0.6);
  });

  // 5 — ridgelines far → foothills
  const ridges = [
    { base: horizon + 0.34 * mountainH, amp: 0.44 * mountainH, col: [158, 140, 170], dark: [140, 122, 154], haze: 0.32, snow: true },
    { base: horizon + 0.62 * mountainH, amp: 0.3 * mountainH, col: [112, 93, 134], dark: [94, 76, 115], haze: 0.13, snow: true },
    { base: horizon + 1.02 * mountainH, amp: 0.22 * mountainH, col: [66, 58, 86], dark: [50, 46, 68], haze: 0, snow: false, rolling: true },
  ];
  for (const R of ridges) ridge(ctx, W, H, R, rand, sunX, f);

  // 6 — meadow: rolling grass line, underpaint, afterglow
  const mpts = ridgeLine(W, meadowTop + 0.02 * H, 0.022 * H, rand, true);
  const mstep = mpts.length > 1 ? mpts[1][0] - mpts[0][0] : 4;
  const lineAt = (x) => mpts[Math.max(0, Math.min(mpts.length - 1, Math.round(x / mstep)))][1];
  const g = ctx.createLinearGradient(0, meadowTop, 0, H);
  meadowStops.forEach((s) => g.addColorStop(s[0], `rgb(${s[1]})`));
  fillShape(ctx, mpts, W, H);
  ctx.fillStyle = g;
  ctx.fill();
  const ag = ctx.createLinearGradient(0, meadowTop, 0, meadowTop + 0.07 * H);
  ag.addColorStop(0, 'rgba(224,166,116,0.13)');
  ag.addColorStop(1, 'rgba(224,166,116,0)');
  ctx.fillStyle = ag;
  ctx.fill();

  // 7 — grass brushwork
  const meadowA = W * (H - meadowTop);
  times((meadowA * 0.005) / (f * f), () => {
    const x = rand() * W;
    const ly = lineAt(x);
    const y = ly - 14 * f + rand() * (H - ly + 14 * f);
    const u = Math.max(0, Math.min(1, (y - meadowTop) / (H - meadowTop)));
    const col = jit(sample(meadow, u), rand, 10, 0.07);
    dab(ctx, x, y, (16 + rand() * 34) * f, (5 + rand() * 11) * f, (rand() * 2 - 1) * 0.45, col, 0.14 + rand() * 0.2, P.edge);
  });

  // 8 — flowers in loose clusters, denser near the bottom
  const flCols = [[244, 240, 225], [227, 178, 60], [126, 104, 176], [169, 188, 228], [190, 98, 80]];
  const flWts = [0.3, 0.15, 0.25, 0.2, 0.1];
  let cluster = null;
  times((meadowA * 0.0018) / (f * f), () => {
    let x, y;
    if (rand() < 0.6) {
      if (!cluster || rand() < 0.12) cluster = [rand() * W, meadowTop + Math.pow(rand(), 0.7) * (H - meadowTop)];
      x = cluster[0] + (rand() * 2 - 1) * 60 * f;
      y = cluster[1] + (rand() * 2 - 1) * 26 * f;
    } else {
      x = rand() * W;
      y = meadowTop + Math.pow(rand(), 0.7) * (H - meadowTop);
    }
    if (y < lineAt(x) + 4 || y > H || x < 0 || x > W) return;
    const u = Math.max(0, (y - meadowTop) / (H - meadowTop));
    let pick = rand(), ci = 0;
    while (ci < flWts.length - 1 && (pick -= flWts[ci]) > 0) ci++;
    const col = jit(flCols[ci], rand, 8, 0.06);
    const r = (1.6 + rand() * 2.6) * (0.6 + u) * f;
    dab(ctx, x, y, r * 2, r * (1.4 + rand() * 0.8), rand() * 3.14, col, 0.35 + rand() * 0.35, 0.8);
  });

  // 9 — grain so nothing reads as smooth vector
  const tile = new OffscreenCanvas(320, 320);
  const t = tile.getContext('2d');
  for (let i = 0; i < 2400; i++) {
    t.fillStyle = rand() < 0.5
      ? `rgba(255,250,235,${(0.02 + rand() * 0.04).toFixed(3)})`
      : `rgba(25,22,44,${(0.02 + rand() * 0.035).toFixed(3)})`;
    t.fillRect(rand() * 320, rand() * 320, 1 + rand(), 1 + rand());
  }
  ctx.fillStyle = ctx.createPattern(tile, 'repeat');
  ctx.fillRect(0, 0, W, H);
}

self.onmessage = ({ data: { W, H, scale, seed, id } }) => {
  const cv = new OffscreenCanvas(Math.max(1, Math.round(W * scale)), Math.max(1, Math.round(H * scale)));
  const ctx = cv.getContext('2d');
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  paint(ctx, W, H, seed);
  const bitmap = cv.transferToImageBitmap();
  self.postMessage({ bitmap, id }, [bitmap]);
};
