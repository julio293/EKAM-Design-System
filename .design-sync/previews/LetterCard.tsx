import React from 'react';
import { LetterCard } from '@ekam/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 340 }}>
    <LetterCard
      subtitle="— FROM THE CABIN"
      quote="Foggy mornings expected tomorrow. The ridge walk holds longer if you wait an hour for the lift to clear."
      note="Sand fill, 2px clay rule on the left."
    />
    <LetterCard subtitle="— FROM THE CABIN" quote="The kettle is on the stove. Tea by the window at first light." />
  </div>
);
