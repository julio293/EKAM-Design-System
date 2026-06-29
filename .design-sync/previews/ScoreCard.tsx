import React from 'react';
import { ScoreCard } from '@ekam/design-system';
export const Scores = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <ScoreCard label="Contrast" value="8.2" score={8.2} caption="Good — AA across surfaces" />
    <ScoreCard label="Consistency" value="6.4" score={6.4} caption="Caution — 3 conflicts" />
    <ScoreCard label="Naming" value="4.1" score={4.1} caption="Poor — hex typos" />
  </div>
);
