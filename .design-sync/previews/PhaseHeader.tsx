import React from 'react';
import { PhaseHeader } from '@ekam/design-system';
export const Tones = () => (
  <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <PhaseHeader tone="danger">Phase 1 · Critical fixes</PhaseHeader>
    <PhaseHeader tone="terracotta">Phase 2 · Accessibility</PhaseHeader>
    <PhaseHeader tone="forest">Phase 3 · Polish</PhaseHeader>
  </div>
);
