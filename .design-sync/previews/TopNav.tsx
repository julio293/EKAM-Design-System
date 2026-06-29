import React from 'react';
import { TopNav } from '@ekam/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 380 }}>
    <TopNav title="Stays" hindiTitle="निवास" showBack />
    <TopNav title="The Bindu" trailing={<span style={{ fontSize: 11, letterSpacing: '2.5px', color: '#B4613A', fontWeight: 600 }}>EDIT</span>} />
  </div>
);
