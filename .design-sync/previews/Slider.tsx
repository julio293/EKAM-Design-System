import React from 'react';
import { Slider } from '@ekam/design-system';

export const Default = () => (
  <div style={{ width: 300 }}>
    <Slider defaultValue={60} minLabel="₹0" maxLabel="₹5,000" />
  </div>
);

export const WithInput = () => (
  <div style={{ width: 300 }}>
    <Slider defaultValue={3} min={0} max={7} showInput />
  </div>
);
