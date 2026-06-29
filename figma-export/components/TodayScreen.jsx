import React from 'react';
import { palette } from '../tokens/tokens.js';
import cabinPhoto from '../assets/cabinPhoto.js';
import HeaderCompanion from './HeaderCompanion.jsx';
import AppSectionHeader from './AppSectionHeader.jsx';
import LetterCard from './LetterCard.jsx';
import SunArc from './SunArc.jsx';
import Card from './Card.jsx';
import TabBar from './TabBar.jsx';

/**
 * EKAM Today / Home screen — an example screen composed from EKAM organisms:
 * HeaderCompanion (greeting) → "Coming up" LetterCard → Sun Arc time graphic →
 * Cabin Card → bottom TabBar. A 393-wide mobile frame.
 *
 * This is a composition (page), not an atomic component — it shows how the
 * pieces fit together for the Today tab.
 */
export default function TodayScreen({
  name = 'Anika',
  state = 'morning',
  style,
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 393,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: palette.cream,
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
        ...style,
      }}
    >
      {/* greeting header */}
      <HeaderCompanion
        state={state}
        eyebrow="— DAY 2 OF 3 · BINSAR"
        title={`Morning ${name}`}
        description="The kettle's on the stove. The monal called from the fridge at 5:32"
      />

      {/* body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '24px 20px 28px' }}>
        {/* Coming up — LetterCard */}
        <LetterCard
          subtitle="— COMING UP"
          title="Sunset chai on the ridge"
          quote="5:30 PM · bring a layer, the wind picks up after six."
          style={{ width: '100%' }}
        />

        {/* Today's light — Sun Arc */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AppSectionHeader appearance="uiLabel" title="Today's light" />
          <div
            style={{
              background: '#FFFFFF',
              border: `1px solid #E0DBD2`,
              borderRadius: 8,
              padding: '20px 16px 12px',
            }}
          >
            <SunArc sunrise="6:12" sunset="6:48" progress={0.34} caption="Golden hour" />
          </div>
        </section>

        {/* Your cabin — Card */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AppSectionHeader title="Your cabin" actionLabel="Details" />
          <Card
            eyebrow="EKAM · CABIN"
            title="Binsar."
            subtitle="Kumaon · 2,400 m"
            scriptLabel="कुटीर"
            style={{ width: '100%' }}
          />
        </section>
      </div>

      {/* bottom navigation */}
      <TabBar defaultValue="today" />
    </div>
  );
}
