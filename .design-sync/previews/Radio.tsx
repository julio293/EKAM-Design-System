import React from 'react';
import { Radio } from '@ekam/design-system';

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: '#14201A',
};

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={row}>
      <Radio checked={false} />
      <span style={labelStyle}>HDFC card · ending 4421</span>
    </div>
    <div style={row}>
      <Radio checked />
      <span style={labelStyle}>UPI · julio@okhdfcbank</span>
    </div>
    <div style={row}>
      <Radio checked={false} disabled />
      <span style={{ ...labelStyle, color: '#9A958A' }}>Cash on arrival · unavailable</span>
    </div>
  </div>
);
