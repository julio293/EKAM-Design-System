import React from 'react';

/**
 * EKAM List — vertical container for ListItem rows (Figma "List", node 268:256).
 *
 * Stacks children in a column. For bordered selection cards (ListItem
 * variant="card") pass `gap` (e.g. 8) to separate them; plain rows carry their
 * own bottom hairline so the default gap is 0.
 */
export default function List({ children, gap = 0, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, width: '100%', ...style }} {...rest}>
      {children}
    </div>
  );
}
