/* Section components for Ayushya Homam invite */

const { useEffect, useRef, useState } = React;

// Hook: detect when an element enters viewport
function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

// Hook: parallax scroll offset
function useParallax() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// Open external links — escapes the preview iframe so target=_blank actually works
function openExternal(url) {
  return (e) => {
    e.preventDefault();
    try { (window.top || window).open(url, '_blank', 'noopener'); }
    catch { window.open(url, '_blank', 'noopener'); }
  };
}

const HeroSection = ({ palette }) => {
  const scrollY = useParallax();

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-sky" />
      <div className="hero-sun" />

      {/* Title at top of hero — clean sky background, no overlap */}
      <div className="hero-title-wrap">
        <div className="hero-title-plate">
          <div className="hero-eyebrow">An invitation</div>
          <h1 className="hero-title">Ayushya Homam<br/>&amp; Karna Vedha</h1>
          <div className="hero-sub">9th June &middot; 7:00 AM &middot; Bangalore</div>
        </div>
      </div>

      {/* Birds in upper sky */}
      <div className="bird" style={{ top: '40%', animation: `flyAcross calc(14s / var(--motion-scale)) linear infinite` }}>
        <Bird color={palette.kumkum} size={28} />
      </div>
      <div className="bird" style={{ top: '46%', animation: `flyAcross calc(18s / var(--motion-scale)) linear infinite`, animationDelay: '-6s' }}>
        <Bird color={palette.kumkum} size={20} />
      </div>
      <div className="bird" style={{ top: '34%', animation: `flyAcross calc(22s / var(--motion-scale)) linear infinite`, animationDelay: '-12s' }}>
        <Bird color={palette.kumkum} size={24} />
      </div>

      {/* Distant gopuram silhouettes (parallax depth) */}
      <img className="gopuram-silhouette left"
        src="assets/gopuram-cutout.png" alt=""
        style={{ transform: `translateY(${scrollY * 0.06}px) scale(0.78)` }} />
      <img className="gopuram-silhouette right"
        src="assets/gopuram-cutout.png" alt=""
        style={{ transform: `translateY(${scrollY * 0.06}px) scale(0.72)` }} />

      {/* Main gopuram — real image */}
      <img className="hero-gopuram"
        src="assets/gopuram-cutout.png"
        alt="Gopuram temple tower"
        style={{ transform: `translateX(-50%) translateY(${scrollY * 0.18}px)` }} />

      {/* Ganesha medallion — floats above gopuram peak, in clean sky between title and tower */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) translateY(${-scrollY * 0.04}px)`,
        zIndex: 5,
        pointerEvents: 'none'
      }}>
        <Ganesha size={84} color="#E8C66A" accent="#5A1A14" />
      </div>

      {/* Foreground diyas */}
      <div className="diya-row">
        <div className="diya"><div className="diya-bowl"/><div className="diya-flame" style={{ animationDelay: '0s' }}/></div>
        <div className="diya"><div className="diya-bowl"/><div className="diya-flame" style={{ animationDelay: '-0.3s' }}/></div>
        <div className="diya"><div className="diya-bowl"/><div className="diya-flame" style={{ animationDelay: '-0.5s' }}/></div>
        <div className="diya"><div className="diya-bowl"/><div className="diya-flame" style={{ animationDelay: '-0.2s' }}/></div>
      </div>

      <div className="scroll-hint">
        <span>Scroll to begin</span>
        <ScrollChevron />
      </div>
    </section>
  );
};

const InvocationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.3);

  return (
    <section ref={ref} className="invocation" data-screen-label="02 Invocation">
      <div className="container">
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '0ms' }}>
          <div className="eyebrow">Shubhamastu</div>
        </div>
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '200ms', marginTop: 24 }}>
          <h2 className="header">With the blessings of Lord Ganesha</h2>
        </div>
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '400ms', marginTop: 16 }}>
          <p className="subline">we joyfully invite you to the Ayushya Homam<br/>of our beloved daughter</p>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '600ms' }}>
          <div className="kalasha-pair">
            <Kalasha size={68} />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold-deep), transparent)', margin: '0 24px' }} />
            <Kalasha size={68} />
          </div>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="toran" style={{ animation: `swayToran calc(4s / var(--motion-scale)) ease-in-out infinite` }}>
            <MangoLeafToran width={600} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes swayToran {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
      `}</style>
    </section>
  );
};

const NameRevealSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.35);
  const name = "Varnika";

  return (
    <section ref={ref} className="name-reveal" data-screen-label="03 Name reveal">
      <div className="container">
        <div className={`fade-line ${inView ? 'in' : ''}`}>
          <div className="name-eyebrow">Celebrating the first year of</div>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="photo-frame">
            <div className="photo-inner">
              <img src="assets/kuku.png" alt="Kuku" />
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div className="name-halo" />
          <div className="name-display">
            {name.split('').map((ch, i) => (
              <span key={i}
                className={`name-letter ${inView ? 'in' : ''}`}
                style={{ transitionDelay: `${400 + i * 120}ms` }}>
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '1600ms' }}>
          <div className="kuku-line">lovingly called <em>Kuku</em></div>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '1900ms', marginTop: 36 }}>
          <div className="divider">
            <span className="line" />
            <span className="dot" />
            <span className="line" />
          </div>
        </div>

        {/* Birds circling on entry */}
        {inView && (
          <>
            <div style={{
              position: 'absolute', top: '20%', left: '50%',
              animation: 'circleFly calc(6s / var(--motion-scale)) ease-out 1.2s 1 forwards',
              opacity: 0
            }}>
              <Bird color="#A03B2A" size={22} />
            </div>
            <div style={{
              position: 'absolute', top: '24%', left: '50%',
              animation: 'circleFly2 calc(6.4s / var(--motion-scale)) ease-out 1.5s 1 forwards',
              opacity: 0
            }}>
              <Bird color="#7A1F1A" size={18} />
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes circleFly {
          0% { opacity: 0; transform: translate(-200px, 0); }
          15% { opacity: 0.9; }
          50% { transform: translate(200px, -40px); }
          85% { opacity: 0.9; }
          100% { opacity: 0; transform: translate(420px, -60px); }
        }
        @keyframes circleFly2 {
          0% { opacity: 0; transform: translate(220px, -20px); }
          15% { opacity: 0.9; }
          50% { transform: translate(-180px, -50px); }
          85% { opacity: 0.9; }
          100% { opacity: 0; transform: translate(-440px, -80px); }
        }
      `}</style>
    </section>
  );
};

const DetailsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  return (
    <section ref={ref} className="details" data-screen-label="04 Details">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow">The Ceremony</div>
        <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 38px)', color: 'var(--terracotta)', marginTop: 12 }}>
          Two sacred rituals, one sunrise
        </h2>

        <div className="cards">
          <div className={`detail-card left ${inView ? 'in' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="card-icon"><HomaKundam size={64} /></div>
            <div className="card-eyebrow">Ritual one</div>
            <div className="card-title">Ayushya Homam</div>
            <div className="card-meta">
              <div>Tuesday, June 9th</div>
              <div>7:00 AM onwards</div>
            </div>
          </div>
          <div className={`detail-card right ${inView ? 'in' : ''}`} style={{ transitionDelay: '300ms' }}>
            <div className="card-icon"><LotusIcon size={64} /></div>
            <div className="card-eyebrow">Ritual two</div>
            <div className="card-title">Karna Vedha</div>
            <div className="card-meta">
              <div>Ear piercing ceremony</div>
              <div>To follow the homam</div>
            </div>
          </div>
        </div>

        <div className={`venue fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>The Venue</div>
          <div className="venue-name">Havyaka Bhavana</div>
          <div className="venue-loc">Malleshwaram, Bangalore</div>
          <a className="btn" href="https://maps.google.com/?q=Havyaka+Bhavana+Malleshwaram+Bangalore"
             target="_blank" rel="noreferrer"
             onClick={openExternal("https://maps.google.com/?q=Havyaka+Bhavana+Malleshwaram+Bangalore")}>
            <MapPinIcon /> Open in Maps
          </a>
        </div>
      </div>
    </section>
  );
};

const HostsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.35);

  return (
    <section ref={ref} className="hosts" data-screen-label="05 Hosts">
      <div className="container">
        <div className={`fade-line ${inView ? 'in' : ''}`}>
          <div className="preamble">With love and gratitude,</div>
        </div>
        <h2 className={`hosts-names ${inView ? 'in' : ''}`}>
          Akshay <span className="italic" style={{ color: 'var(--gold-deep)', fontSize: '0.7em' }}>&amp;</span> Pavithra
        </h2>
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className="hosts-sub">parents of the little one</div>
        </div>
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="lotus-flourish" style={{
            transformOrigin: 'center',
            animation: inView ? `bloom calc(2s / var(--motion-scale)) cubic-bezier(.36,1.4,.4,1) 0.8s 1 both` : 'none'
          }}>
            <LotusFlourish width={140} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bloom {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

const RsvpSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.3);

  const wa = "https://wa.me/919113641264?text=" + encodeURIComponent("Hi! Confirming attendance for Varnika's Ayushya Homam on June 9th 🙏");

  // Generate .ics on click
  const downloadIcs = () => {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kuku//Ayushya Homam//EN',
      'BEGIN:VEVENT',
      'UID:kuku-ayushya-homam-2026@invite',
      'DTSTAMP:20260601T000000Z',
      'DTSTART:20260609T013000Z', // 7:00 AM IST = 01:30 UTC
      'DTEND:20260609T060000Z',
      'SUMMARY:Varnika\'s Ayushya Homam & Karna Vedha',
      'LOCATION:Havyaka Bhavana, Malleshwaram, Bangalore',
      'DESCRIPTION:Celebrating Kuku\'s first year. Hosted by Akshay & Pavithra.',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kuku-ayushya-homam.ics'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={ref} className="rsvp" data-screen-label="06 RSVP">
      <div className="container">
        <div className={`fade-line ${inView ? 'in' : ''}`}>
          <div className="hashtag">#KukusAyushyaHomam</div>
        </div>
        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="rsvp-line">Your blessings mean the world to us.<br/>Please let us know you'll be there.</div>
        </div>

        <div className={`rsvp-actions fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '400ms' }}>
          <a className="btn" href={wa} target="_blank" rel="noreferrer" onClick={openExternal(wa)}>
            <WhatsAppIcon /> RSVP on WhatsApp
          </a>
          <button className="btn outline" onClick={downloadIcs}>
            <CalendarIcon /> Add to Calendar
          </button>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '600ms' }}>
          <div className={`bell-wrap ${inView ? 'swing' : ''}`}>
            <TempleBell size={56} />
          </div>
        </div>

        <div className={`fade-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="footer-credit">designed with love · +91 9113641264 for queries</div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  HeroSection, InvocationSection, NameRevealSection,
  DetailsSection, HostsSection, RsvpSection
});
