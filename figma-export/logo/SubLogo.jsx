import React from 'react';
import { subBrands, typefaces, logoColors } from './logoTokens.js';

/**
 * Sub-brand mark icons (Figma "SubLogo" component, variants Kutir/Van/Shikhar/Chai).
 * These are simple line approximations of the official vector marks — swap with the
 * exported SVGs from Figma for pixel-exact brand use.
 */
function SubIcon({ kind, size = 64, color }) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'home': // Kutir — home & living
      return (
        <svg {...common}><path d="M12 30 32 14l20 16" /><path d="M18 28v20h28V28" /><path d="M28 48V36h8v12" /></svg>
      );
    case 'trees': // Van — nature & forest
      return (
        <svg {...common}><path d="M22 40 14 40l8-12 8 12h-4l6 9H16zM44 36l-6 0 6-10 6 10h-3l5 8H39z" /><path d="M24 49v6M47 44v8" /></svg>
      );
    case 'peak': // Shikhar — peak & elevation
      return (
        <svg {...common}><path d="M6 50 26 18l10 16 6-9 16 25z" /><path d="M20 28l6 6 5-4" /></svg>
      );
    case 'cup': // Chai — tea & ritual
      return (
        <svg {...common}><path d="M16 26h28v12a14 14 0 0 1-28 0z" /><path d="M44 28h5a5 5 0 0 1 0 12h-5" /><path d="M24 12c0 4-3 4-3 8M32 12c0 4-3 4-3 8" /></svg>
      );
    default:
      return null;
  }
}

/**
 * Sub-brand lockup card — icon + Devanagari + Latin + label, with the vertical's
 * accent color (Figma node 159:2339 pattern).
 */
export default function SubLogo({ brand = 'kutir', size = 64, showText = true, style }) {
  const data = subBrands.find((b) => b.key === brand) || subBrands[0];
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12, ...style }}>
      <SubIcon kind={data.icon} size={size} color={data.accent} />
      {showText && (
        <div style={{ textAlign: 'center', fontFamily: typefaces.ui.family, color: logoColors.ink }}>
          <div style={{ fontFamily: typefaces.devanagari.family, fontSize: 22, color: data.accent }}>{data.devanagari}</div>
          <div style={{ fontFamily: typefaces.primary.family, fontWeight: 700, fontSize: 26, letterSpacing: 1, marginTop: 2 }}>{data.latin}</div>
          <div style={{ fontSize: 12, color: '#4F5C3F', marginTop: 4 }}>{data.label}</div>
        </div>
      )}
    </div>
  );
}

export { SubIcon };
