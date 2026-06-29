import React from 'react';
import { LetterCard } from '@ekam/design-system';

export const ComingUp = () => (
  <div style={{ width: 340 }}>
    <LetterCard subtitle="— COMING UP" title="Mountain Breakfast" quote="Tray at the door · 8:30" />
  </div>
);

export const Letter = () => (
  <div style={{ width: 340 }}>
    <LetterCard
      subtitle="— FROM THE CABIN"
      quote="Foggy mornings expected tomorrow. The ridge walk holds longer if you wait an hour for the lift to clear."
    />
  </div>
);
