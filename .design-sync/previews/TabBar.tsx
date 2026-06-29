import React from 'react';
import { TabBar } from '@ekam/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <TabBar defaultValue="today" />
    <TabBar defaultValue="stay" showHindi={false} />
  </div>
);
