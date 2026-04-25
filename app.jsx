/* Main app — Ayushya Homam invite */

const { useEffect, useState, useRef } = React;

const PALETTES = {
  warm: { gold: '#C9A227', goldDeep: '#A8842B', terracotta: '#A03B2A', kumkum: '#7A1F1A', cream: '#FAF3E0' },
  rich: { gold: '#D4A017', goldDeep: '#B8860B', terracotta: '#8E2814', kumkum: '#5F1308', cream: '#F4E4BD' },
  soft: { gold: '#D9B85F', goldDeep: '#BC9540', terracotta: '#B85A48', kumkum: '#8C342A', cream: '#FBF6E5' }
};

const FONT_PAIRS = {
  marcellus:  { display: 'Marcellus',          italic: 'Cormorant Garamond', body: 'Lora' },
  cormorant:  { display: 'Cormorant Garamond', italic: 'Cormorant Garamond', body: 'Lora' },
  cinzel:     { display: 'Cinzel',             italic: 'Cormorant Garamond', body: 'EB Garamond' },
  tirotamil:  { display: 'Tiro Tamil',         italic: 'Cormorant Garamond', body: 'Lora' }
};

function PetalField({ density = 14 }) {
  const petals = Array.from({ length: density }, (_, i) => {
    const variant = i % 4 === 0 ? 'gold' : (i % 5 === 0 ? 'cream' : '');
    const left = (i * 7.3) % 100;
    const dur = 12 + (i * 1.7) % 16;
    const delay = -((i * 2.1) % 14);
    const size = 10 + (i % 4) * 3;
    return (
      <div key={i} className={`petal ${variant}`}
        style={{
          left: `${left}%`,
          width: size, height: size * 1.2,
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
          opacity: 0.3 + ((i % 5) * 0.12)
        }} />
    );
  });
  return <div className="petal-field">{petals}</div>;
}

function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader ${gone ? 'gone' : ''}`}>
      <div className="loader-inner">
        <div className="loader-glyph" />
        <div className="loader-text">शुभं · auspicious beginnings</div>
      </div>
    </div>
  );
}

function Controls({ musicOn, onToggleMusic }) {
  return (
    <div className="controls">
      <button className={`icon-btn ${musicOn ? 'on' : ''}`}
        onClick={onToggleMusic}
        aria-label={musicOn ? 'Mute music' : 'Play music'}
        title="Background music (Tamil/Kannada instrumental)">
        <MusicIcon on={musicOn} />
      </button>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "fonts": "marcellus",
  "motionSpeed": 1,
  "petals": 14
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);
  const [musicOn, setMusicOn] = useState(false);

  const palette = PALETTES[tweaks.palette] || PALETTES.warm;
  const fonts = FONT_PAIRS[tweaks.fonts] || FONT_PAIRS.marcellus;

  // Apply tweaks to CSS vars
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--gold', palette.gold);
    r.style.setProperty('--gold-deep', palette.goldDeep);
    r.style.setProperty('--terracotta', palette.terracotta);
    r.style.setProperty('--kumkum', palette.kumkum);
    r.style.setProperty('--cream', palette.cream);
    r.style.setProperty('--motion-scale', tweaks.motionSpeed);
    r.style.setProperty('--font-display', `'${fonts.display}', serif`);
    r.style.setProperty('--font-italic', `'${fonts.italic}', serif`);
    r.style.setProperty('--font-body', `'${fonts.body}', Georgia, serif`);
  }, [tweaks]);

  // OG meta — set title for sharing
  useEffect(() => {
    document.title = "Varnika's Ayushya Homam · June 9th";
  }, []);

  const toggleMusic = () => {
    setMusicOn(m => !m);
    // Music is a placeholder — in production would play instrumental loop
  };

  return (
    <>
      <Loader />
      <div className="page-bg" />
      <PetalField density={tweaks.petals} />
      <Controls musicOn={musicOn} onToggleMusic={toggleMusic} />

      <HeroSection palette={palette} />
      <InvocationSection />
      <NameRevealSection />
      <DetailsSection />
      <HostsSection />
      <RsvpSection />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio label="Tone"
            value={tweaks.palette}
            options={[
              { value: 'warm', label: 'Warm gold + terracotta' },
              { value: 'rich', label: 'Rich brass + sindoor' },
              { value: 'soft', label: 'Soft amber + clay' }
            ]}
            onChange={v => setTweaks({ palette: v })} />
        </TweakSection>

        <TweakSection title="Typography">
          <TweakRadio label="Display font"
            value={tweaks.fonts}
            options={[
              { value: 'marcellus', label: 'Marcellus (architectural)' },
              { value: 'cormorant', label: 'Cormorant (refined serif)' },
              { value: 'cinzel', label: 'Cinzel (classical caps)' },
              { value: 'tirotamil', label: 'Tiro Tamil (regional flavor)' }
            ]}
            onChange={v => setTweaks({ fonts: v })} />
        </TweakSection>

        <TweakSection title="Motion">
          <TweakSlider label="Animation speed"
            value={tweaks.motionSpeed} min={0} max={2} step={0.1}
            onChange={v => setTweaks({ motionSpeed: v })}
            format={v => v === 0 ? 'paused' : `${v.toFixed(1)}×`} />
          <TweakSlider label="Petal density"
            value={tweaks.petals} min={0} max={40} step={1}
            onChange={v => setTweaks({ petals: v })} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
