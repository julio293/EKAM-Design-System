import React from 'react';
import { Stepper } from '@ekam/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 260 }}>
    <Stepper defaultValue={1} />
    <Stepper defaultValue={2} price="₹ 260" />
    <Stepper defaultValue={0} disabled />
  </div>
);
