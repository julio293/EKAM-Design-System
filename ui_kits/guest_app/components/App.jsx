/* global React */

const { useState, useRef, useEffect } = React;

const TABS = [
  { id: 'home',     label: 'Cabin',    dev: 'घर',   icon: (<svg viewBox="0 0 24 24"><path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>) },
  { id: 'programs', label: 'Walks',    dev: 'पथ',   icon: (<svg viewBox="0 0 24 24"><path d="M3 20l4-8 5 4 4-10 5 14"/></svg>) },
  { id: 'order',    label: 'Chai',     dev: 'चाय',  icon: (<svg viewBox="0 0 24 24"><path d="M5 8h12a2 2 0 012 2v6a4 4 0 01-4 4H7a4 4 0 01-4-4v-6a2 2 0 012-2zM19 11h2a2 2 0 010 4h-2M7 4v2M11 3v3M15 4v2"/></svg>) },
  { id: 'settings', label: 'You',      dev: 'आप',   icon: (<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>) },
];

function App() {
  const [tab, setTab] = useState('home');
  const [toast, setToastState] = useState({ on: false, msg: '' });
  const timeoutRef = useRef(null);

  const showToast = (msg) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToastState({ on: true, msg });
    timeoutRef.current = setTimeout(() => setToastState({ on: false, msg: '' }), 3000);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <React.Fragment>
      <StatusBar />
      <div className="content" key={tab}>
        {tab === 'home'     && <HomeScreen onNav={setTab} />}
        {tab === 'programs' && <ProgramsScreen />}
        {tab === 'order'    && <OrderScreen showToast={showToast} />}
        {tab === 'settings' && <SettingsScreen />}
      </div>
      <div className={`toast ${toast.on ? 'on' : ''}`}>{toast.msg}</div>
      <div className="tabbar">
        {TABS.map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
