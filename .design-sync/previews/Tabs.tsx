import React from 'react';
import { Tabs } from '@ekam/design-system';

export const Default = () => (
  <div style={{ width: 300 }}>
    <Tabs tabs={['Overview', 'Amenities', 'Reviews']} defaultValue="Amenities" />
  </div>
);

export const Scrollable = () => (
  <div style={{ width: 300 }}>
    <Tabs scrollable defaultValue="Explore" tabs={['Today', 'Stay', 'Explore', 'Cabin', 'Connect', 'More']} />
  </div>
);
