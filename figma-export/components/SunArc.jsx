import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Sun Arc — a sunrise→sunset time graphic. A semicircular track (bone) with
 * the travelled portion in accent/bindu and a glowing sun marker at the current
 * position. Sunrise / sunset times sit under the ends; an optional caption under
 * the apex (e.g. "Golden hour").
 *
 * Tokens: surface/bone (track) · accent/bindu (sun + travelled arc) · text/moss
 *   (eyebrows) · text/ink (times). Cormorant for times, Inter for labels.
 *
 * progress: 0–1 position of the sun between sunrise (0) and sunset (1).
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export default function SunArc({
  sunrise = '6:12',
  sunset = '6:48',
  sunriseLabel = 'Sunrise',
  sunsetLabel = 'Sunset',
  progress = 0.5,
  caption = 'Golden hour',
  style,
  ...rest
}) {
  const W = 329, baseY = 116, R = W / 2 - 18, cx = W / 2;
  const left = cx - R, right = cx + R;
  const p = clamp(progress, 0, 1);
  const a = Math.PI * (1 - p);
  const sunX = cx + R * Math.cos(a);
  const sunY = baseY - R * Math.sin(a);
  const arcLen = Math.PI * R;
  const arc = `M ${left},${baseY} A ${R},${R} 0 0 1 ${right},${baseY}`;

  const eyebrow = { fontFamily: typography.fontFamily, fontWeight: 500, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', fill: palette.moss };
  const time = { fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, fill: palette.ink };

  return (
    <svg viewBox={`0 0 ${W} 150`} width="100%" style={{ display: 'block', maxWidth: W, ...style }} role="img" aria-label={`Sun arc — ${sunriseLabel} ${sunrise}, ${sunsetLabel} ${sunset}`} {...rest}>
      <defs>
        <radialGradient id="ekam-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B4613A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#B4613A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* full track (dotted, mist) */}
      <path d={arc} fill="none" stroke={palette.mist} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 7" />
      {/* travelled portion (solid bindu) */}
      <path d={arc} fill="none" stroke={palette.bindu} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${arcLen * p} ${arcLen}`} />
      {/* end ticks */}
      <circle cx={left} cy={baseY} r="2.5" fill={palette.mist} />
      <circle cx={right} cy={baseY} r="2.5" fill={palette.mist} />
      {/* sun */}
      <circle cx={sunX} cy={sunY} r="16" fill="url(#ekam-sun-glow)" />
      <circle cx={sunX} cy={sunY} r="6.5" fill={palette.bindu} />

      {/* labels */}
      <text x={left} y={baseY + 22} textAnchor="start" style={eyebrow}>{sunriseLabel}</text>
      <text x={left} y={baseY + 40} textAnchor="start" style={time}>{sunrise}</text>
      <text x={right} y={baseY + 22} textAnchor="end" style={eyebrow}>{sunsetLabel}</text>
      <text x={right} y={baseY + 40} textAnchor="end" style={time}>{sunset}</text>
      {caption && (
        <text x={cx} y={baseY + 34} textAnchor="middle" style={{ fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 15, fill: palette.bindu }}>
          {caption}
        </text>
      )}
    </svg>
  );
}
