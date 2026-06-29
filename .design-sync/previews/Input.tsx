import React from 'react';
import { Input } from '@ekam/design-system';

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
    <Input label="Full name" placeholder="Anika Sharma" />
    <Input label="Email" defaultValue="anika@" error="Enter a valid email address" />
    <Input label="Membership ID" placeholder="Unavailable" disabled />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
    <Input size="sm" placeholder="Small" />
    <Input size="md" placeholder="Medium" />
    <Input size="lg" placeholder="Large" />
  </div>
);
