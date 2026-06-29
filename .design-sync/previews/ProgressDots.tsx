import React from 'react';
import { ProgressDots } from '@ekam/design-system';

export const Steps = () => (
  <div style={{ display: 'flex', alignItems: 'center', minHeight: 24 }}>
    <ProgressDots total={5} active={2} />
  </div>
);

export const Progression = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {[0, 1, 2, 3, 4].map((a) => (
      <ProgressDots key={a} total={5} active={a} />
    ))}
  </div>
);
