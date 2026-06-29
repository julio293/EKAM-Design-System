import React from 'react';
import { SunArc } from '@ekam/design-system';

export const Times = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 330 }}>
    <SunArc sunrise="6:12" sunset="6:48" progress={0.34} caption="Morning light" />
    <SunArc sunrise="6:12" sunset="6:48" progress={0.82} caption="Golden hour" />
  </div>
);
