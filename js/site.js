/* ============================================================
   FLYWALL — site interactions (vanilla, framework-free)
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  try { var saved = localStorage.getItem('fw-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  var toggle = $('#themeToggle');
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('fw-theme', next); } catch (e) {}
  });

  /* ---------- Nav shrink on scroll ---------- */
  var nav = $('#nav');
  var onScroll = function () { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveals ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- FAQ accordion ---------- */
  $$('#faq .faq-item').forEach(function (item) {
    var q = $('.faq-q', item), a = $('.faq-a', item);
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      $$('#faq .faq-item').forEach(function (other) { other.classList.remove('open'); $('.faq-a', other).style.maxHeight = null; });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------- Kanban: drag cards between columns ---------- */
  function initBoardDnD(boardEl) {
    function updateCounts() {
      $$('.column', boardEl).forEach(function (col) {
        var cc = $('.col-cards', col), cnt = $('.col-count', col);
        if (cc && cnt) cnt.textContent = $$('.card', cc).length;
      });
    }
    function afterEl(container, y) {
      var els = $$('.card:not(.dragging)', container);
      for (var i = 0; i < els.length; i++) {
        var box = els[i].getBoundingClientRect();
        if (y < box.top + box.height / 2) return els[i];
      }
      return null;
    }
    $$('.card', boardEl).forEach(function (card) {
      card.style.touchAction = 'none';
      card.style.cursor = 'grab';
      card.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;
        var sx = e.clientX, sy = e.clientY;
        var rect = card.getBoundingClientRect();
        var offX = e.clientX - rect.left, offY = e.clientY - rect.top, w = rect.width, h = rect.height;
        var moved = false, ph = null;
        function start() {
          try { card.setPointerCapture(e.pointerId); } catch (x) {}
          card.classList.add('dragging');
          ph = document.createElement('div'); ph.className = 'card-ph'; ph.style.height = h + 'px';
          card.parentNode.insertBefore(ph, card);
          card.style.position = 'fixed'; card.style.width = w + 'px'; card.style.zIndex = 9999;
          card.style.pointerEvents = 'none'; card.style.margin = '0'; card.style.cursor = 'grabbing';
        }
        function mv(ev) {
          if (!moved) { if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 4) return; moved = true; start(); }
          card.style.left = (ev.clientX - offX) + 'px';
          card.style.top = (ev.clientY - offY) + 'px';
          card.style.display = 'none';
          var under = document.elementFromPoint(ev.clientX, ev.clientY);
          card.style.display = '';
          var cc = (under && under.closest) ? under.closest('.col-cards') : null;
          $$('.col-cards', boardEl).forEach(function (c) { c.classList.toggle('drop-hot', c === cc); });
          if (cc && ph) { var a = afterEl(cc, ev.clientY); if (a) cc.insertBefore(ph, a); else cc.appendChild(ph); }
        }
        function up() {
          card.removeEventListener('pointermove', mv);
          card.removeEventListener('pointerup', up);
          if (!moved) return;
          card.classList.remove('dragging');
          card.style.position = ''; card.style.left = ''; card.style.top = ''; card.style.width = '';
          card.style.zIndex = ''; card.style.pointerEvents = ''; card.style.margin = ''; card.style.cursor = 'grab';
          if (ph && ph.parentNode) { ph.parentNode.insertBefore(card, ph); ph.remove(); }
          $$('.col-cards', boardEl).forEach(function (c) { c.classList.remove('drop-hot'); });
          updateCounts();
        }
        card.addEventListener('pointermove', mv);
        card.addEventListener('pointerup', up);
      });
    });
    updateCounts();
  }

  /* ---------- Hero canvas: pan, drag cards, parallax, links, live loop ---------- */
  (function () {
    var board = $('#heroBoard');
    if (!board) return;
    initBoardDnD(board);

    /* ---- the live record → summarize loop ---- */
    var toolbar = $('#heroToolbar'), tr = $('#heroTranscript'), timer = $('#heroTimer'),
        micBars = $$('#heroMic i'), tgt = $('#typeTarget'), caret = $('#typeCaret'),
        actionMini = $('#actionMini'), meetMeta = $('#meetMeta');
    var summary = 'Bob and Adam aligned: on-device memory is the moat. Ship the beta this week and charge for the memory tier.';

    if (reduce) {
      if (tgt) tgt.textContent = summary;
      if (caret) caret.classList.add('done');
      if (actionMini) actionMini.classList.add('show');
      if (meetMeta) meetMeta.textContent = '2 actions';
      return;
    }

    function typeOut(el, text) {
      return new Promise(function (resolve) {
        var i = 0;
        (function step() { el.textContent = text.slice(0, i++); if (i <= text.length) setTimeout(step, 30); else resolve(); })();
      });
    }
    var micTimer = null;
    function micOn() { micTimer = setInterval(function () { micBars.forEach(function (b) { b.style.height = (4 + Math.random() * 13).toFixed(0) + 'px'; }); }, 130); }
    function micOff() { if (micTimer) clearInterval(micTimer); micBars.forEach(function (b) { b.style.height = '4px'; }); }

    async function loop() {
      while (true) {
        // IDLE
        toolbar.classList.remove('recording');
        tr.hidden = true; tr.classList.remove('fade-in');
        tgt.textContent = ''; caret.classList.remove('done');
        actionMini.classList.remove('show');
        meetMeta.textContent = 'ready';
        await sleep(2400);
        // RECORDING
        toolbar.classList.add('recording');
        meetMeta.textContent = 'recording…';
        tr.hidden = false; void tr.offsetWidth; tr.classList.add('fade-in');
        micOn();
        var secs = 0;
        var ti = setInterval(function () { secs++; timer.textContent = '00:' + String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0'); }, 1000);
        timer.textContent = '00:00:00';
        await sleep(5200);
        clearInterval(ti); micOff();
        // SUMMARIZING
        toolbar.classList.remove('recording');
        tr.classList.remove('fade-in'); tr.hidden = true;
        meetMeta.textContent = 'summarizing…';
        await sleep(500);
        await typeOut(tgt, summary);
        caret.classList.add('done');
        actionMini.classList.add('show');
        meetMeta.textContent = '2 actions';
        await sleep(4200);
      }
    }
    loop();
  })();

  /* ---------- Hero edge panels: Files (left) & Chat (top) ---------- */
  (function () {
    var board = $('#heroBoard');
    if (!board) return;
    var panels = [
      { tab: $('#filesTab'), panel: $('#filesPanel'), close: $('#filesClose') },
      { tab: $('#chatTab'), panel: $('#chatPanel'), close: $('#chatClose') }
    ].filter(function (p) { return p.tab && p.panel; });
    function set(p, open) {
      p.panel.classList.toggle('open', open);
      p.tab.classList.toggle('is-open', open);
      p.tab.setAttribute('aria-expanded', open ? 'true' : 'false');
      p.panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    function closeAll(except) { panels.forEach(function (p) { if (p !== except) set(p, false); }); }
    panels.forEach(function (p) {
      p.tab.addEventListener('click', function (e) {
        e.stopPropagation();
        var willOpen = !p.panel.classList.contains('open');
        closeAll(p); set(p, willOpen);
      });
      if (p.close) p.close.addEventListener('click', function (e) { e.stopPropagation(); set(p, false); });
      p.panel.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    });
    // clicking/dragging elsewhere on the board closes any open panel
    board.addEventListener('pointerdown', function (e) {
      if (!e.target.closest('.edge-tab') && !e.target.closest('.edge-panel')) closeAll(null);
    });
  })();

  /* ---------- (Pillar 2 board is static — no JS needed) ---------- */

  /* ---------- Pillar 1 (record): timer + mic level ---------- */
  (function () {
    if (reduce) return;
    var timerEl = $('#recTimerP1'), mic = $('#micP1');
    var secs = 14 * 60 + 32;
    if (timerEl) setInterval(function () {
      secs++;
      var h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
      timerEl.textContent = [h, m, s].map(function (v) { return String(v).padStart(2, '0'); }).join(':');
    }, 1000);
    if (mic) { var bars = $$('i', mic); setInterval(function () { bars.forEach(function (b) { b.style.height = (4 + Math.random() * 13).toFixed(0) + 'px'; }); }, 140); }
  })();

  /* ---------- Knowledge graph (Memory section) ---------- */
  (function () {
    var stage = $('.mem-graph'), svg = $('#graphLinks');
    if (!stage || !svg) return;
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('preserveAspectRatio', 'none');
    var C = { meeting: 'var(--node-meeting)', note: 'var(--node-note)', doc: 'var(--node-doc)', theme: 'var(--node-theme)' };
    var nodes = [
      { id: 'strategy', t: 'theme', x: 50, y: 48, r: 15, label: 'strategy' },
      { id: 'm1', t: 'meeting', x: 26, y: 26, r: 11, label: 'Board call' },
      { id: 'm2', t: 'meeting', x: 75, y: 30, r: 11, label: 'Sprint plan' },
      { id: 'n1', t: 'note', x: 20, y: 72, r: 9, label: 'Pricing' },
      { id: 'n2', t: 'note', x: 80, y: 70, r: 9, label: 'Roadmap' },
      { id: 'd1', t: 'doc', x: 50, y: 84, r: 9, label: 'Market.pdf' },
      { id: 't2', t: 'theme', x: 50, y: 14, r: 9, label: 'hiring' },
      { id: 'n3', t: 'note', x: 90, y: 49, r: 7, label: 'Budget' }
    ];
    var edges = [['strategy', 'm1'], ['strategy', 'm2'], ['strategy', 'n1'], ['strategy', 'n2'], ['strategy', 'd1'], ['strategy', 't2'], ['m1', 'n1'], ['m1', 't2'], ['m2', 'n2'], ['m2', 'n3'], ['d1', 'n1'], ['m1', 'n3']];
    function pos(id) { var n = nodes.find(function (x) { return x.id === id; }); return { x: n.x * 4, y: n.y * 4 }; }
    var ph = '';
    edges.forEach(function (e) {
      var a = pos(e[0]), b = pos(e[1]);
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, nx = -(b.y - a.y), ny = (b.x - a.x), len = Math.hypot(nx, ny) || 1, off = 14;
      ph += '<path class="gl" vector-effect="non-scaling-stroke" d="M' + a.x + ' ' + a.y + ' Q ' + (mx + nx / len * off) + ' ' + (my + ny / len * off) + ' ' + b.x + ' ' + b.y + '"/>';
    });
    svg.innerHTML = ph;
    nodes.forEach(function (n) {
      var el = document.createElement('div');
      el.className = 'gnode'; el.style.left = n.x + '%'; el.style.top = n.y + '%';
      var d = n.r * 2;
      el.innerHTML = '<span class="gdot" style="width:' + d + 'px;height:' + d + 'px;background:' + C[n.t] + '"></span><span class="glabel">' + n.label + '</span>';
      stage.appendChild(el);
    });
    var gnodes = $$('.gnode', stage), glines = $$('.gl', svg);
    function build() {
      if (reduce) { glines.forEach(function (l) { l.classList.add('in'); }); gnodes.forEach(function (n) { n.classList.add('in'); }); return; }
      gnodes.forEach(function (n, i) { setTimeout(function () { n.classList.add('in'); }, 120 + i * 120); });
      glines.forEach(function (l, i) { setTimeout(function () { l.classList.add('in'); }, 680 + i * 80); });
    }
    if ('IntersectionObserver' in window) {
      var done = false;
      new IntersectionObserver(function (en) { if (en[0].isIntersecting && !done) { done = true; build(); } }, { threshold: 0.3 }).observe(stage);
    } else build();
  })();

  /* ---------- Scroll-spy: highlight active section in nav + pillar chips ---------- */
  (function () {
    var ids = ['record', 'notes', 'memory', 'privacy'];
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    function setActive(id) {
      $$('.nav-links a, .pchip').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      var best = null, bestRatio = -1;
      entries.forEach(function (en) { if (en.isIntersecting && en.intersectionRatio > bestRatio) { best = en.target; bestRatio = en.intersectionRatio; } });
      if (best) setActive(best.id);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- Mobile burger ---------- */
  (function () {
    var burger = $('#burger'), navLinks = $('.nav-links');
    if (!burger) return;
    burger.addEventListener('click', function () {
      var open = navLinks.style.display === 'flex';
      navLinks.style.cssText = open ? '' : 'display:flex;position:absolute;top:56px;right:8px;flex-direction:column;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:var(--radius-lg);padding:8px;box-shadow:var(--shadow-elevated);';
    });
  })();

  /* ---------- OS detection for download links ---------- */
  (function () {
    var isMac = /Mac/i.test(navigator.platform || navigator.userAgent);
    var url = isMac 
      ? 'https://github.com/1MARRC/Artemis/releases/download/v0.2.0/Flywall_0.2.0_x64.dmg'
      : 'releases/Flywall_0.2.0_x64-setup.exe';
    var labelText = 'Download for ' + (isMac ? 'Mac' : 'Windows');

    var pBtn = document.getElementById('primaryDownload');
    var pLabel = document.getElementById('dlLabel');
    if (pBtn && pLabel) {
      pBtn.href = url;
      pBtn.setAttribute('download', '');
      pLabel.textContent = labelText;
    }

    var fBtn = document.getElementById('finaleDownload');
    var fLabel = document.getElementById('dlLabel2');
    if (fBtn && fLabel) {
      fBtn.href = url;
      fBtn.setAttribute('download', '');
      fLabel.textContent = labelText;
    }
  })();

})();
