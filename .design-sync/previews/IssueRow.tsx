import React from 'react';
import { IssueRow } from '@ekam/design-system';
export const Severities = () => (
  <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <IssueRow severity="critical" title="Sage fails WCAG on cream" description="2.1:1 contrast — never use for body text." scope="Color tokens" />
    <IssueRow severity="important" title="Bindu valid for AA Large only" description="Reserve #B4613A for 18pt+ headings and CTAs." scope="Accent" />
    <IssueRow severity="note" title="Map inverse tokens for dark mode" description="Ink as background, Cream/Sage as foreground." scope="Theming" alt />
  </div>
);
