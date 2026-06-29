import React from 'react';
import { AppSectionHeader } from '@ekam/design-system';

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 300 }}>
    <AppSectionHeader size="small" title="Small heading" description="A quieter section label." />
    <AppSectionHeader size="medium" title="Medium heading" description="The default section size." />
    <AppSectionHeader size="large" title="Large heading" description="For top-of-screen sections." />
  </div>
);

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 300 }}>
    <AppSectionHeader title="Your stays" description="Upcoming and past cabins." actionLabel="See all" />
    <AppSectionHeader appearance="uiLabel" title="From the cabin" description="Notes, hints and smart recommendations." />
  </div>
);
