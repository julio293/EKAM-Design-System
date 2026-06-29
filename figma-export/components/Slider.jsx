import React, { useId, useState } from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Slider — exported from Figma "Slider" (node 29:3062, canvas 1:44).
 *
 * Track: 2px rail, surface/bone (#ECE4D3) with an accent/bindu (#B4613A) fill
 * up to the thumb. Thumb: 20px white disc, bindu ring + shadow/lg.
 * States (Default / Hover / Focus / Disabled) resolve live from interaction.
 *
 * Figma toggles → props:
 *   Label=On  → end min/max labels (minLabel / maxLabel)
 *   Icon=On   → ± stepper buttons (steppers)
 *   Input=On  → numeric value input (showInput)
 *
 * Tokens (node 29:3078): accent/bindu #B4613A · bindu-deep #9C4F2A ·
 *   surface/bone #ECE4D3 · text/ink #14201A · shadow/lg · editorial/sm (value text).
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";
const SHADOW_LG = '0 6px 12px -6px rgba(0,0,0,0.08), 0 3px 6px -3px rgba(0,0,0,0.08)';
const THUMB = 20;

const valueText = {
  fontFamily: EDITORIAL_FONT,
  fontStyle: 'italic',
  fontSize: 16,
  lineHeight: '24px',
  color: palette.ink,
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

function Stepper({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={dir === 'inc' ? 'Increase' : 'Decrease'}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        padding: 0,
        border: 'none',
        background: 'transparent',
        color: disabled ? palette.mist : palette.bindu,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        fontSize: 18,
        lineHeight: 1,
      }}
    >
      {dir === 'inc' ? '+' : '−'}
    </button>
  );
}

export default function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  minLabel,
  maxLabel,
  steppers = false,
  showInput = false,
  formatValue = (v) => v,
  style,
  ...rest
}) {
  const isControlled = value != null;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const reactId = useId();
  // useId() contains colons (":r0:") — strip to non-word chars so the scoped
  // <style> selector below is valid (an unescaped ":" silently kills the rule,
  // which is why the native blue track/thumb used to leak through).
  const inputId = `ekam-slider-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const pct = ((current - min) / (max - min)) * 100;
  const clampedPct = Math.max(0, Math.min(100, pct));

  const commit = (next) => {
    const v = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const fill = disabled ? palette.mist : palette.bindu;
  const ring = disabled ? palette.mist : hover || focus ? palette.binduDeep : palette.bindu;

  // The native range is kept ONLY for interaction (drag + keyboard + a11y).
  // Every native part is made fully transparent so it never paints its own
  // track/thumb (browsers default these to accent-color, which would leak a
  // green thumb / dark track). The visible rail, fill and thumb are real divs.
  const thumbCss = `
    #${inputId}{ -webkit-appearance:none; appearance:none; width:100%; height:${THUMB}px; margin:0; background:transparent; cursor:${disabled ? 'not-allowed' : 'pointer'}; }
    #${inputId}:focus{ outline:none; }
    #${inputId}::-webkit-slider-runnable-track{ -webkit-appearance:none; appearance:none; background:transparent; border:none; height:${THUMB}px; }
    #${inputId}::-moz-range-track{ background:transparent; border:none; height:${THUMB}px; }
    #${inputId}::-moz-range-progress{ background:transparent; }
    #${inputId}::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:${THUMB}px; height:${THUMB}px; border-radius:50%; background:transparent; border:none; box-shadow:none; cursor:${disabled ? 'not-allowed' : 'pointer'}; }
    #${inputId}::-moz-range-thumb{ width:${THUMB}px; height:${THUMB}px; border-radius:50%; background:transparent; border:none; box-shadow:none; cursor:${disabled ? 'not-allowed' : 'pointer'}; }
  `;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', ...style }}>
      <style>{thumbCss}</style>

      {minLabel != null && <span style={valueText}>{minLabel}</span>}

      <div
        style={{ position: 'relative', flex: '1 1 0', minWidth: 0, height: THUMB, display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* visual rail + fill */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: palette.bone, overflow: 'hidden' }}>
          <div style={{ width: `${clampedPct}%`, height: '100%', background: fill }} />
        </div>
        {/* visual thumb — white disc with bindu ring (kept inside the track via translateX) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: `${clampedPct}%`,
            transform: `translate(-${clampedPct}%, -50%)`,
            width: THUMB,
            height: THUMB,
            borderRadius: '50%',
            background: '#fff',
            border: `2px solid ${ring}`,
            boxShadow: focus && !disabled ? '0 0 0 3px #599CDB66' : disabled ? 'none' : SHADOW_LG,
            boxSizing: 'border-box',
            pointerEvents: 'none',
            transition: 'border-color 120ms ease',
          }}
        />
        {/* interactive + accessible native range, made fully transparent (see thumbCss) */}
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          onChange={(e) => commit(Number(e.target.value))}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ position: 'absolute', left: 0, right: 0, width: '100%', margin: 0, height: THUMB, cursor: disabled ? 'not-allowed' : 'pointer', zIndex: 2 }}
          {...rest}
        />
      </div>

      {maxLabel != null && <span style={valueText}>{maxLabel}</span>}

      {steppers && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Stepper dir="dec" disabled={disabled} onClick={() => commit(current - step)} />
          <Stepper dir="inc" disabled={disabled} onClick={() => commit(current + step)} />
        </div>
      )}

      {showInput && (
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          onChange={(e) => commit(Number(e.target.value))}
          aria-label="Value"
          style={{
            width: 64,
            flexShrink: 0,
            border: `1px solid ${palette.mist}`,
            borderRadius: 8,
            padding: '6px 8px',
            fontFamily: EDITORIAL_FONT,
            fontStyle: 'italic',
            fontSize: 16,
            lineHeight: '24px',
            color: palette.ink,
            background: disabled ? palette.bone : '#fff',
          }}
        />
      )}

      {showInput || steppers || maxLabel != null ? null : (
        <span style={{ ...valueText, minWidth: 0 }}>{formatValue(current)}</span>
      )}
    </div>
  );
}
