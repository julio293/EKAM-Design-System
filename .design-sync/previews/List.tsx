import React from 'react';
import { List, ListItem } from '@ekam/design-system';

export const Stacked = () => (
  <div style={{ width: 300 }}>
    <List>
      <ListItem title="Wood-burning stove" subtitle="Logs stacked by the door" />
      <ListItem title="Hot water — all day" subtitle="Solar, with a gas backup" />
      <ListItem title="Filter coffee & chai" subtitle="In the pantry shelf" />
      <ListItem title="Heated blankets" subtitle="Folded under each bed" />
    </List>
  </div>
);
