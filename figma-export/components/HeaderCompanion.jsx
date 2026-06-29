import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import morningFull from '../assets/scenes/hc-morning-full.svg';
import morningScroll from '../assets/scenes/hc-morning-scroll.svg';
import eveningFull from '../assets/scenes/hc-evening-full.svg';
import eveningScroll from '../assets/scenes/hc-evening-scroll.svg';

/**
 * EKAM Header Companion — immersive header from Figma "Header Companion" (node 293:3209).
 *
 * The background is the exact Figma scene (vector, exported as SVG): a layered
 * ridge landscape with a warm sun glow, moon/stars, and ember dots. The status
 * bar, eyebrow, title and line are live text overlaid on top.
 * Figma axes:
 *   state    = 'morning' | 'evening'
 *   isScroll = false → full header (250) · true → collapsed (170, smaller title)
 * Pass `backgroundImage` to override the scene with a photo.
 *
 * Tokens: surface/cream #FAF7F0 (text + status bar) · ui/label Inter Medium 11/+2.5 ·
 *   display/lg Cormorant SemiBold 36/40 · editorial/sm Cormorant Italic 16/24.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

const SCENES = {
  'morning-false': morningFull,
  'morning-true': morningScroll,
  'evening-false': eveningFull,
  'evening-true': eveningScroll,
};

// Make an exported scene fill its container responsively.
function fillSvg(svg) {
  return svg.replace(
    /<svg\b[^>]*>/,
    (tag) =>
      tag
        .replace(/\swidth="[^"]*"/, '')
        .replace(/\sheight="[^"]*"/, '')
        .replace(/<svg/, '<svg preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block"'),
  );
}

// Ambient motion layered over the static scene (twinkle, rising embers, glow breath).
const ANIM_CSS = `
@keyframes ekamHcTwinkle { 0%,100%{opacity:.15} 50%{opacity:1} }
@keyframes ekamHcEmber { 0%{transform:translateY(10px);opacity:0} 20%{opacity:1} 75%{opacity:.85} 100%{transform:translateY(-30px);opacity:0} }
/* slow, gentle drift — the flare breathes and wanders a little, never pulses hard */
@keyframes ekamHcFlare { 0%{transform:translate(0,0) scale(1);opacity:.42} 50%{transform:translate(-7px,5px) scale(1.05);opacity:.62} 100%{transform:translate(0,0) scale(1);opacity:.42} }
@media (prefers-reduced-motion: reduce){ .ekam-hc-anim > *{ animation:none !important } }
`;

const EMBERS = [
  { left: '14%', bottom: 22, size: 5, dur: 5.5, delay: 0 },
  { left: '48%', bottom: 16, size: 6, dur: 6.5, delay: 1.4 },
  { left: '69%', bottom: 30, size: 4, dur: 5.0, delay: 2.6 },
  { left: '82%', bottom: 20, size: 5, dur: 7.0, delay: 0.8 },
];
// Many stars, each with its own duration/delay/size so the twinkle reads as random.
const STARS = [
  { left: '9%', top: 24, size: 2, dur: 2.3, delay: 0.0 },
  { left: '18%', top: 46, size: 1, dur: 3.7, delay: 1.6 },
  { left: '24%', top: 16, size: 2, dur: 1.9, delay: 0.7 },
  { left: '31%', top: 38, size: 1, dur: 4.4, delay: 2.3 },
  { left: '39%', top: 22, size: 2, dur: 2.7, delay: 0.3 },
  { left: '46%', top: 50, size: 1, dur: 3.2, delay: 1.1 },
  { left: '53%', top: 18, size: 1, dur: 4.0, delay: 2.8 },
  { left: '60%', top: 40, size: 2, dur: 2.1, delay: 0.9 },
  { left: '67%', top: 28, size: 1, dur: 3.5, delay: 1.9 },
  { left: '74%', top: 14, size: 2, dur: 2.5, delay: 0.4 },
  { left: '85%', top: 44, size: 1, dur: 4.6, delay: 1.3 },
  { left: '92%', top: 30, size: 2, dur: 2.9, delay: 2.5 },
];

function Ambience({ state }) {
  return (
    <div className="ekam-hc-anim" aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <style>{ANIM_CSS}</style>
      {/* breathing sun glow over the horizon */}
      <div
        style={{
          position: 'absolute',
          top: '14%',
          right: '14%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(235,165,85,0.5) 0%, rgba(200,120,60,0.12) 45%, transparent 70%)',
          mixBlendMode: 'screen',
          animation: 'ekamHcFlare 14s ease-in-out infinite',
        }}
      />
      {/* randomly twinkling stars (evening) */}
      {state === 'evening' &&
        STARS.map((s, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: '#fff',
              animation: `ekamHcTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      {/* drifting embers */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            borderRadius: '50%',
            background: '#b4613a',
            boxShadow: '0 0 7px 2px rgba(180,97,58,0.6)',
            animation: `ekamHcEmber ${e.dur}s ease-in-out ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Minimal iOS status bar (9:41 + signal / wifi / battery), cream on the scene. */
function StatusBar() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 22px 0', color: palette.cream }}>
      <span style={{ fontFamily: typography.fontFamily, fontWeight: 600, fontSize: 15 }}>9:41</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.5} y={8 - i * 2.4} width="3" height={4 + i * 2.4} rx="0.6" fill={palette.cream} />
          ))}
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <path d="M1 4.2C4.7 1.3 11.3 1.3 15 4.2" stroke={palette.cream} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.6 6.8C6 5 10 5 12.4 6.8" stroke={palette.cream} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="9.8" r="1.2" fill={palette.cream} />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden>
          <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke={palette.cream} strokeWidth="1.2" opacity="0.6" />
          <rect x="2.2" y="2.2" width="17" height="8.6" rx="1.6" fill={palette.cream} />
          <rect x="24" y="4" width="1.8" height="5" rx="0.9" fill={palette.cream} opacity="0.6" />
        </svg>
      </span>
    </div>
  );
}

export default function HeaderCompanion({
  eyebrow = '— DAY 2 OF 3 · BINSAR',
  title = 'Morning Anika',
  description,
  state = 'morning',
  backgroundImage, // url; overrides the SVG scene
  isScroll = false,
  animated = true, // ambient motion (twinkle / embers / glow); respects prefers-reduced-motion
  statusBar, // override the default status bar; pass null to hide
  style,
  ...rest
}) {
  const height = isScroll ? 170 : 250;
  const scene = SCENES[`${state}-${isScroll}`] || SCENES['morning-false'];
  const titleSize = isScroll ? 26 : 36;
  const titleLh = isScroll ? '30px' : '40px';
  const bar = statusBar === undefined ? <StatusBar /> : statusBar;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 393,
        maxWidth: '100%',
        height,
        background: '#0C120E',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {/* background scene */}
      {backgroundImage ? (
        <img src={backgroundImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: fillSvg(scene) }} />
      )}

      {!backgroundImage && animated && <Ambience state={state} />}

      {bar}

      {/* left-aligned content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'flex-start',
          justifyContent: isScroll ? 'center' : 'flex-end',
          flex: '1 1 0',
          width: '100%',
          padding: isScroll ? '0 32px' : '0 32px 28px',
          textAlign: 'left',
          color: palette.cream,
        }}
      >
        {eyebrow && (
          <p style={{ margin: 0, fontFamily: typography.fontFamily, fontWeight: 500, fontSize: 11, lineHeight: '13.5px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            {eyebrow}
          </p>
        )}
        {title && (
          <p style={{ margin: 0, maxWidth: '100%', fontFamily: EDITORIAL_FONT, fontWeight: 600, fontSize: titleSize, lineHeight: titleLh, letterSpacing: '0.3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </p>
        )}
        {description && (
          <p style={{ margin: 0, maxWidth: 330, fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
