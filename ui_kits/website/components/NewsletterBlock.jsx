/* global React */
function NewsletterBlock() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); if (email.includes('@')) setSent(true); };

  return (
    <section className="surface is-ink" id="newsletter">
      <div className="container container--narrow newsletter">
        <span className="eyebrow">— The quiet list</span>
        <h2 className="title">A letter four times a year. Never more.</h2>
        <p className="lede">
          When a new site opens, when the journal is bound, when the wood stove is laid for the season. Five messages per stay, no more.
        </p>
        {sent ? (
          <div className="newsletter__done">
            <span className="newsletter__dev">एकम्</span>
            <p className="body">— A note from us is on its way to <strong>{email}</strong>. Walk slowly.</p>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={submit}>
            <div className="newsletter__field">
              <label>Your email</label>
              <input
                type="email"
                placeholder="anika@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="newsletter__cta">
              Subscribe
            </button>
          </form>
        )}
        <p className="newsletter__small">No tracking. No "limited time". Unsubscribe with one click.</p>
      </div>
    </section>
  );
}
window.NewsletterBlock = NewsletterBlock;
