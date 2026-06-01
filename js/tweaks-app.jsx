/* Flywall — Tweaks panel app. Renders nothing until the Tweaks toolbar is on. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFB38E",
  "displayFont": "Newsreader",
  "glow": 100,
  "orbs": true,
  "headline": "Stop searching folders. Start thinking in space."
}/*EDITMODE-END*/;

function FlywallTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    // accent + a slightly lighter hover derived from it
    root.style.setProperty('--accent-primary', t.accent);
    root.style.setProperty('--accent-hover', t.accent);
    root.style.setProperty('--font-display', `"${t.displayFont}", Georgia, serif`);
    const orbsEl = document.querySelector('.orbs');
    if (orbsEl) {
      orbsEl.style.display = t.orbs ? '' : 'none';
      orbsEl.style.opacity = (t.glow / 100).toFixed(2);
    }
    const h = document.querySelector('#heroHeadline');
    if (h && h.dataset.tweaked !== '0') {
      // only overwrite if user changed it from default
      if (t.headline !== TWEAK_DEFAULTS.headline) h.textContent = t.headline;
    }
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand" />
      <TweakColor label="Accent (peach)" value={t.accent}
        options={['#FFB38E', '#FF9A6B', '#F0A98A', '#C0633D']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSelect label="Display font" value={t.displayFont}
        options={['Newsreader', 'Georgia', 'Inter']}
        onChange={(v) => setTweak('displayFont', v)} />

      <TweakSection label="Atmosphere" />
      <TweakToggle label="Ambient orbs" value={t.orbs}
        onChange={(v) => setTweak('orbs', v)} />
      <TweakSlider label="Glow intensity" value={t.glow} min={0} max={140} unit="%"
        onChange={(v) => setTweak('glow', v)} />

      <TweakSection label="Copy" />
      <TweakText label="Hero headline" value={t.headline}
        onChange={(v) => setTweak('headline', v)} />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const host = document.createElement('div');
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<FlywallTweaks />);
})();
