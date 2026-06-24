import React, { useId, useState } from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Tabs — exported from Figma "❖ Tabs" (node 29:4978).
 *
 * A tab bar with a bone baseline track and an accent/bindu active indicator.
 * Items are equal-width by default, or auto-width + horizontally scrollable
 * when `scrollable` is set (Figma toggle isScrollable=true). 2–5+ tabs.
 *
 * Tokens (node 29:4978):
 *   height          dimension/tabs/md = 48
 *   padding         px spacing/tabs/lg 16 · py spacing/tabs/md 12 · gap sm 8
 *   label           ui/eyebrow-button — Inter Medium 11 / 13.5 / +2.5 / UPPERCASE
 *   active text     text/ink #14201A · inactive text  state/mist #D8D3C4
 *   baseline track  surface/bone #ECE4D3 · active indicator accent/bindu #B4613A
 *   indicator       2px, radius/tabs/full = 999
 *
 * tabs: Array<string | { label, value?, icon?, disabled? }>
 */

const labelStyle = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  fontWeight: 500,
  fontSize: 11,
  lineHeight: '13.5px',
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const normalize = (t, i) =>
  typeof t === 'string' ? { label: t, value: t } : { ...t, value: t.value ?? t.label ?? i };

export default function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  scrollable = false,
  ariaLabel = 'Tabs',
  style,
}) {
  const items = tabs.map(normalize);
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const selected = isControlled ? value : internal;
  const baseId = useId();

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        width: '100%',
        overflowX: scrollable ? 'auto' : 'visible',
        ...style,
      }}
    >
      {/* bone baseline track */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: palette.bone,
          borderRadius: 999,
        }}
      />

      {items.map((item, i) => {
        const isActive = item.value === selected;
        const tabId = `${baseId}-tab-${i}`;
        return (
          <button
            key={item.value ?? i}
            type="button"
            role="tab"
            id={tabId}
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => !item.disabled && select(item.value)}
            style={{
              position: 'relative',
              flex: scrollable ? '0 0 auto' : '1 1 0',
              minWidth: 0,
              height: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <span
              style={{
                display: 'flex',
                flex: '1 1 0',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                minHeight: 0,
                ...labelStyle,
                color: isActive ? palette.ink : palette.mist,
              }}
            >
              {item.icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{item.icon}</span>}
              {item.label}
            </span>
            {/* active indicator */}
            <span
              aria-hidden
              style={{
                width: '100%',
                height: 2,
                borderRadius: 999,
                background: isActive ? palette.bindu : 'transparent',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
