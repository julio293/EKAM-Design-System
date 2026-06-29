import React from 'react';
import { ProgressBar } from '@ekam/design-system';

export const Default = () => (
  <div style={{ width: 320 }}>
    <ProgressBar value={60} />
  </div>
);

export const WithLabels = () => (
  <div style={{ width: 320 }}>
    <ProgressBar value={40} labelLeft="Day 2" labelRight="of 3" />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320 }}>
    <ProgressBar value={30} disabled />
  </div>
);
