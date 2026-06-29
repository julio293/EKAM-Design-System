import React from 'react';
import { KeyCard } from '@ekam/design-system';

export const Default = () => (
  <div style={{ width: '100%', maxWidth: 340 }}>
    <KeyCard
      label="— GATE CODE · CABIN DOOR"
      code="2811"
      note="Same for the cabin door and the lower gate."
      actionLabel="Share the key"
    />
  </div>
);
