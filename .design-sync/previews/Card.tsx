import React from 'react';
import { Card } from '@ekam/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 340 }}>
    <Card eyebrow="EKAM · CABIN" title="Binsar." subtitle="Kumaon · 2,400 m" scriptLabel="कुटीर" />
    <Card eyebrow="— AN INVITATION" title="Binsar." photoHeight={260} stamp={{ script: 'कुटीर', label: 'EKAM' }} />
  </div>
);
