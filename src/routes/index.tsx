import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/seniors-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Senior Relief Resources — Find Local Help by ZIP" },
      {
        name: "description",
        content:
          "Enter your ZIP code to find rent relief, utility help, and income support resources available for seniors in your area.",
      },
      { property: "og:title", content: "Senior Relief Resources" },
      {
        property: "og:description",
        content:
          "Free 1-minute ZIP lookup to surface local rent, utility, and income support options for adults 50+.",
      },
    ],
  }),
  component: Index,
});

const NOTIFICATIONS = [
  "Margaret in Ohio just found 3 local relief options",
  "Linda in Florida is reviewing rent assistance",
  "James in Arizona just started the lookup",
  "Robert in Texas just checked utility help",
  "Susan in Georgia found local hotlines",
];

function useCountdown(seconds: number) {
  const [t, setT] = useState(seconds);
  useEffect(() => {
    const i = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function Index() {
  const [zip, setZip] = useState("");
  const [notifIdx, setNotifIdx] = useState(0);
  const time = useCountdown(9 * 60 + 44);

  useEffect(() => {
    const i = setInterval(() => setNotifIdx((v) => (v + 1) % NOTIFICATIONS.length), 7000);
    return () => clearInterval(i);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{5}$/.test(zip)) {
      alert(`Checking resources for ZIP ${zip}...`);
    }
  };

  return (
    <div className="relief-page">
      <div className="legalbar">ADVERTISEMENT — INFORMATIONAL RESOURCE FOR SENIORS</div>

      <div key={notifIdx} className="notification-box">
        {NOTIFICATIONS[notifIdx]}
      </div>

      <div className="container">
        <div className="brand">
          <div className="leaf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--teal)" }}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34" />
              <path d="M21 3c-3 0-6 1-9 3-3 2-5 5-5 9 0 2 1 3 3 3 4 0 7-2 9-5 2-3 3-7 2-10z" />
            </svg>
          </div>
          <span className="brand-name">Senior Relief Resources</span>
        </div>

        <section className="hero">
          <div className="blob bl1" />
          <div className="blob bl2" />
          <div className="blob bl3" />

          <h1>Access Income Relief Resources for Seniors</h1>
          <p className="sub">
            Enter your ZIP code to find rent relief, utility help, and other support options available in your area. It takes about a minute.
          </p>

          <div className="chips">
            <span className="chip"><span className="dot" /> Free Lookup</span>
            <span className="chip"><span className="dot" /> No Account</span>
            <span className="chip"><span className="dot" /> 1-Minute Check</span>
          </div>

          <div className="hero-media">
            <img src={heroImg} alt="Senior couple reviewing relief resources together" width={1280} height={768} />
          </div>

          <form className="zip-row" onSubmit={handleSubmit}>
            <label className="zip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                inputMode="numeric"
                maxLength={5}
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              />
            </label>
            <button className="btn btn-primary" type="submit">Get Started →</button>
          </form>

          <div style={{ textAlign: "center" }}>
            <span className="countdown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Time is running out: {time}
            </span>
          </div>

          <p className="micro">
            No account needed. You'll be guided to the next step after the quick ZIP check.
          </p>
        </section>

        <section className="section">
          <h3>What you may find</h3>
          <div className="grid">
            <Tile title="Rent Relief" desc="Programs that may help cover monthly rent." icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            } />
            <Tile title="Utility Help" desc="Support for electric, gas, and water bills." icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            } />
            <Tile title="Income Support" desc="Resources that may supplement income." icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            } />
            <Tile title="Local Hotlines" desc="Numbers to call for guidance in your state." icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            } />
          </div>
        </section>

        <section className="section">
          <h3>Why use this lookup</h3>
          <div className="checks">
            {[
              "Quick ZIP code lookup — takes less than a minute",
              "See locally available relief options in your area",
              "Get clear next steps without confusing paperwork",
              "Free to use — no signup or credit card required",
            ].map((t) => (
              <div className="check" key={t}>
                <div className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>{t}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h3>Frequently asked questions</h3>
          <div style={{ marginTop: 10 }}>
            <Faq q="Who is this for?" a="Adults 50+ looking for relief options like rent, utility, and income support available in their area." />
            <Faq q="Is this really free?" a="Yes. The ZIP lookup and the resources we surface are free to view. Some partner programs may have their own eligibility requirements." />
            <Faq q="Do I need to create an account?" a="No account is required. Just enter your ZIP code and you'll be guided to the next step." />
            <Faq q="How long does it take?" a="About a minute. We keep things short so you can quickly see what's available near you." />
          </div>
        </section>

        <p className="fineprint">
          This is an advertisement and informational resource. Availability of programs and eligibility varies by location and provider. We do not guarantee approval or specific benefits.
        </p>
        <div className="links">
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Contact</a>
        </div>
      </div>

      <div className="sticky">
        <div className="sticky-inner">
          <button
            className="btn btn-primary"
            onClick={() => document.querySelector<HTMLInputElement>(".zip input")?.focus()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Check My ZIP Code
          </button>
        </div>
      </div>
    </div>
  );
}

function Tile({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="tile">
      <div className="icon">{icon}</div>
      <div>
        <b>{title}</b>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="faq">{a}</div>
    </details>
  );
}
