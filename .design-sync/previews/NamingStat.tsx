import React from 'react';
import { NamingStat } from '@ekam/design-system';
export const Row = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <NamingStat label="Tokens audited" value="48" caption="across 4 groups" />
    <NamingStat label="Naming conflicts" value="3" caption="hex label typos" />
    <NamingStat label="Coverage" value="92%" caption="of Figma styles" />
  </div>
);
