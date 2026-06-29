import React from 'react';
import { Button } from '@ekam/design-system';

export const Types = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', width: 240 }}>
    <Button type="primary" bindu>Reserve cabin</Button>
    <Button type="secondary" dropdown>Sort by</Button>
    <Button type="clear">Cancel</Button>
  </div>
);

export const SizesAndStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', width: 240 }}>
    <Button size="xs">Extra small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button disabled>Disabled</Button>
  </div>
);
