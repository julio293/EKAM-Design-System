import React from 'react';
import { Badge } from '@ekam/design-system';

export const Tones = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <Badge tone="forest">Confirmed</Badge>
    <Badge tone="danger">Sold out</Badge>
    <Badge tone="terracotta">2 left</Badge>
    <Badge tone="olive">Draft</Badge>
    <Badge tone="ink">New</Badge>
  </div>
);
