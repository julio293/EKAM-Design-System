import React from 'react';
import { ListItem, Radio, Stepper } from '@ekam/design-system';

export const SelectionCards = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
    <ListItem variant="card" selected leading={<Radio checked />} title="HDFC card · ending 4421" subtitle="Visa · Expires 06/27" />
    <ListItem variant="card" leading={<Radio />} title="UPI · okhdfcbank" subtitle="Pay on arrival" />
  </div>
);

export const MenuRow = () => (
  <div style={{ width: 320 }}>
    <ListItem
      title="Adrak-elaichi chai"
      subtitle="Sweet · Cardamom"
      subtitleVariant="editorial"
      trailing={<Stepper defaultValue={1} price="₹ 140" />}
    />
  </div>
);
