import React from 'react';
import { color } from '../tokens/colors.js';
import { SubIcon } from '../logo/SubLogo.jsx';

/**
 * EKAM Avatar — Figma component "Avatar" (page 1:25 region, node 278:14764).
 *
 * Variant axes (from the Figma component set):
 *  - size:  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'   (24…96px)
 *  - shape: 'rounded' (full pill) | 'squared' (8px radius)
 *  - type:  'image' (photo / brand-glyph fallback) | 'text' (initial)
 *           Inferred: `src` ⇒ image, otherwise text.
 *  - color: 'black' | 'bindu' | 'deep'   (text/fill theme; ignored for image)
 *  - status: 'off' (only state in the Figma set; prop kept for extension)
 *
 * Cormorant Garamond initial, sizing ramp, and Bone/Bindu grounds all match Figma.
 */

// box size + initial type ramp per size token
const SIZES = {
  xs:    { box: 24, font: 18, weight: 600, lh: 22, tracking: 0.3 },
  sm:    { box: 32, font: 18, weight: 600, lh: 22, tracking: 0.3 },
  md:    { box: 40, font: 18, weight: 600, lh: 22, tracking: 0.3 },
  lg:    { box: 48, font: 24, weight: 500, lh: 28, tracking: 0.3 },
  xl:    { box: 64, font: 36, weight: 600, lh: 40, tracking: 0.3 },
  '2xl': { box: 80, font: 36, weight: 600, lh: 40, tracking: 0.3 },
  '3xl': { box: 96, font: 48, weight: 700, lh: 58, tracking: 0.4 },
};

// text-color themes: background + foreground
const COLORS = {
  black: { bg: color.bone,  fg: color.ink },   // ink on Bone
  bindu: { bg: color.bone,  fg: color.bindu },  // rust on Bone
  deep:  { bg: color.bindu, fg: color.cream },  // cream on Bindu fill
};

export default function Avatar({
  size = 'md',
  shape = 'rounded',
  type,
  color: colorVariant = 'black',
  src,
  alt = '',
  initial = 'Y',
  status = 'off',
  className,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const theme = COLORS[colorVariant] || COLORS.black;
  const isImage = type ? type === 'image' : Boolean(src);
  const radius = shape === 'squared' ? 8 : 999;

  const base = {
    position: 'relative',
    width: s.box,
    height: s.box,
    borderRadius: radius,
    overflow: 'hidden',
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  // ── Image avatar (photo, or brand-glyph placeholder on Bone) ───────
  if (isImage) {
    return (
      <span className={className} style={{ ...base, background: color.bone }} role="img" aria-label={alt || 'avatar'} {...rest}>
        {src ? (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          // Kutir glyph placeholder (matches the Figma "Image" default), 90% opacity
          <span style={{ opacity: 0.9, display: 'flex' }}>
            <SubIcon kind="home" size={Math.round(s.box * 0.66)} color={color.forest} />
          </span>
        )}
      </span>
    );
  }

  // ── Text avatar (single Cormorant Garamond initial) ────────────────
  return (
    <span
      className={className}
      style={{ ...base, background: theme.bg }}
      role="img"
      aria-label={alt || initial}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: s.weight,
          fontSize: s.font,
          lineHeight: `${s.lh}px`,
          letterSpacing: s.tracking,
          color: theme.fg,
        }}
      >
        {String(initial).slice(0, 1).toUpperCase()}
      </span>
    </span>
  );
}

export { SIZES as avatarSizes, COLORS as avatarColors };
