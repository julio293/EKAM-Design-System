import React from 'react';
import { palette } from '../tokens/tokens.js';
import cabinPhoto from '../assets/cabinPhoto.js';
import TopNav from './TopNav.jsx';
import AppSectionHeader from './AppSectionHeader.jsx';
import Card from './Card.jsx';
import KeyCard from './KeyCard.jsx';
import List from './List.jsx';
import ListItem from './ListItem.jsx';
import TabBar from './TabBar.jsx';

/**
 * EKAM Stay screen — the guest's current stay, composed from EKAM organisms:
 * TopNav → Cabin Card → booking rows → KeyCard (gate code) → amenities List →
 * bottom TabBar. A 393-wide mobile frame.
 *
 * A composition (page), not an atomic component.
 */
export default function StayScreen({ onBack, style }) {
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
      <TopNav title="Your stay" hindiTitle="कुटीर" showBack onBack={onBack} background />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '20px 20px 28px' }}>
        {/* cabin hero */}
        <Card
          image={cabinPhoto}
          eyebrow="EKAM · CABIN"
          title="Binsar."
          subtitle="Kumaon · 2,400 m"
          scriptLabel="कुटीर"
          style={{ width: '100%' }}
        />

        {/* booking */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AppSectionHeader title="Your booking" actionLabel="Manage" />
          <List>
            <ListItem title="12 March → 15 March" subtitle="3 nights · 2 guests" subtitleVariant="editorial" />
            <ListItem title="Booking · EKM-2811" subtitle="Confirmed" subtitleVariant="editorial" />
          </List>
        </section>

        {/* gate code */}
        <KeyCard
          label="— GATE CODE · CABIN DOOR"
          code="2811"
          note="Same for the cabin door and the lower gate."
          actionLabel="Share the key"
          style={{ width: '100%' }}
        />

        {/* amenities */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AppSectionHeader appearance="uiLabel" title="In the cabin" />
          <List>
            <ListItem title="Wood-burning stove" subtitle="Logs stacked by the door" />
            <ListItem title="Hot water — all day" subtitle="Solar, with a gas backup" />
            <ListItem title="Filter coffee & chai" subtitle="In the pantry shelf" />
            <ListItem title="Heated blankets" subtitle="Folded under each bed" />
          </List>
        </section>
      </div>

      <TabBar defaultValue="stay" />
    </div>
  );
}
