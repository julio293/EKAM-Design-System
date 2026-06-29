import React from 'react';
import { HeaderCompanion } from '@ekam/design-system';

export const Morning = () => (
  <HeaderCompanion
    state="morning"
    eyebrow="— DAY 2 OF 3 · BINSAR"
    title="Morning Anika"
    description="The kettle's on the stove. The monal called from the fridge at 5:32"
  />
);

export const Scrolled = () => (
  <HeaderCompanion
    state="morning"
    isScroll
    eyebrow="— DAY 2 OF 3 · BINSAR"
    title="Morning Anika"
    description="The kettle's on the stove. The monal called from the fridge at 5:32"
  />
);

export const Evening = () => (
  <HeaderCompanion
    state="evening"
    eyebrow="— DAY 2 OF 3 · BINSAR"
    title="Evening Anika"
    description="The ridge has gone violet. Dinner is laid by the window."
  />
);
