import React from 'react';
import { TierCard } from '@ekam/design-system';
export const Tiers = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <TierCard accent="terracotta" title="Surface" value="3" body="Cream, Sand, Bone — warm-light grounds." />
    <TierCard accent="forest" title="Text" value="4" body="Ink, Forest, Moss, Sage." />
  </div>
);
