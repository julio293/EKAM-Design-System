import React from 'react';
import { palette } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import PhaseHeader from '../components/PhaseHeader.jsx';
import TaskRow from '../components/TaskRow.jsx';
import { checklist } from '../data/report.js';

/** "Prioritised fix checklist" — node 202:242. Three phased columns. */
export default function Checklist() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <SectionHeader label={checklist.label} title={checklist.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'start' }}>
        {checklist.phases.map((phase) => (
          <div key={phase.title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PhaseHeader tone={phase.tone}>{phase.title}</PhaseHeader>
            {phase.tasks.map((t) => (
              <TaskRow key={t} label={t} surface={palette.parchment} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
