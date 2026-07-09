/* ---------- Nav: morph on scroll ---------- */

var nav = document.getElementById('nav');
var heroSection = document.getElementById('hero');

function onScroll() {
  var limit = heroSection ? heroSection.offsetTop + heroSection.offsetHeight - 70 : 600;
  nav.classList.toggle('scrolled', window.scrollY > limit);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Nav: mobile menu ---------- */

document.getElementById('burger').addEventListener('click', function () {
  nav.classList.toggle('menu-open');
});
document.querySelectorAll('.mobile-menu-link').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('menu-open');
  });
});

/* ---------- Hero widget: tap to open/close (mobile bottom sheet) ---------- */

var heroWidget = document.querySelector('.widget');
document.querySelector('.widget-head').addEventListener('click', function () {
  heroWidget.classList.toggle('open');
});

/* ---------- Scroll reveal ---------- */

(function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('.outcome-card, .how-step, .grounded-card, .price-card');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('in-view');
      observer.unobserve(el);
      el.addEventListener('transitionend', function done() {
        el.classList.remove('reveal', 'in-view');
        el.style.transitionDelay = '';
        el.removeEventListener('transitionend', done);
      });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 3) * 90 + 'ms';
    observer.observe(el);
  });
})();

/* ---------- FAQ accordion ---------- */

document.querySelectorAll('.faq-item').forEach(function (item) {
  item.querySelector('.faq-q').addEventListener('click', function () {
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (other) {
      other.classList.remove('open');
    });
    if (!wasOpen) item.classList.add('open');
  });
});

/* ---------- Tilt effect ---------- */

(function initTilt() {
  var MAX = 4.5;
  document.querySelectorAll('[data-tilt]').forEach(function (el) {
    el.style.willChange = 'transform';
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = ((e.clientX - r.left) / r.width) * 2 - 1;
      var py = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.transition = 'transform .05s ease-out';
      el.style.transform = 'perspective(600px) rotateX(' + (-py * MAX).toFixed(2) + 'deg) rotateY(' + (px * MAX).toFixed(2) + 'deg) translateY(-1px)';
    });
    el.addEventListener('pointerleave', function () {
      el.style.transition = 'transform .35s cubic-bezier(.22,.61,.36,1)';
      el.style.transform = '';
    });
  });
})();

/* ---------- Demo chat ---------- */

var swatches = {
  warm: "repeating-linear-gradient(45deg, oklch(91% 0.015 90) 0 7.0710678px, oklch(86% 0.025 85) 7.0710678px 14.1421356px)",
  sage: "repeating-linear-gradient(45deg, oklch(89% 0.04 128) 0 7.0710678px, oklch(84% 0.05 150) 7.0710678px 14.1421356px)",
  stone: "repeating-linear-gradient(45deg, oklch(90% 0.025 200) 0 7.0710678px, oklch(85% 0.035 205) 7.0710678px 14.1421356px)",
  dusk: "repeating-linear-gradient(45deg, oklch(88% 0.03 300) 0 7.0710678px, oklch(82% 0.05 290) 7.0710678px 14.1421356px)",
  bloom: "repeating-linear-gradient(45deg, oklch(92% 0.035 20) 0 7.0710678px, oklch(87% 0.055 350) 7.0710678px 14.1421356px)",
};

var accents = {
  spruce: { base: "oklch(33% 0.04 200)", dark: "oklch(26% 0.035 200)", tint: "oklch(33% 0.04 200 / 0.1)" },
  brass: { base: "oklch(52% 0.1 75)", dark: "oklch(44% 0.09 75)", tint: "oklch(52% 0.1 75 / 0.12)" },
  moss: { base: "oklch(48% 0.09 160)", dark: "oklch(40% 0.08 160)", tint: "oklch(48% 0.09 160 / 0.12)" },
  clay: { base: "oklch(52% 0.1 40)", dark: "oklch(44% 0.09 40)", tint: "oklch(52% 0.1 40 / 0.12)" },
  plum: { base: "oklch(48% 0.09 320)", dark: "oklch(40% 0.08 320)", tint: "oklch(48% 0.09 320 / 0.12)" },
};

var stores = {
  home: {
    name: "Wrenfield Home",
    tagline: "Home furnishings",
    script: [
      { q: "Compact desk for a small bedroom, under $300?", a: "Two options that fit a tight space and stay under budget:", products: [{ name: "Wren Compact Desk", meta: "$249 · 40in frame", swatch: "warm" }, { name: "Poplar Fold Desk", meta: "$189 · folds flat", swatch: "sage" }] },
      { q: "Is the Aster shelf solid wood?", a: "It's engineered oak veneer over an MDF core, not solid wood. Each shelf holds up to 30 lb." },
      { q: "Do you have the Wren desk in walnut?", a: "Walnut's out until next month. Oak and ash are in stock and ship in 1–2 days." },
    ],
  },
  fashion: {
    name: "Marlow & Co",
    tagline: "Fashion & apparel",
    script: [
      { q: "Lightweight jacket for spring, size medium?", a: "Both run true to size in medium and pack down small:", products: [{ name: "Fielding Anorak", meta: "$128 · packable", swatch: "dusk" }, { name: "Rue Bomber", meta: "$98 · runs small", swatch: "stone" }] },
      { q: "Does the Rue Bomber run small?", a: "About half a size small. Most people size up if they're in between." },
      { q: "Is the Fielding Anorak water resistant?", a: "Yes, DWR-coated shell. It handles light rain but isn't built for a downpour." },
    ],
  },
  beauty: {
    name: "Alder & Bloom",
    tagline: "Skincare & beauty",
    script: [
      { q: "Something for dry, sensitive skin, under $40?", a: "Both fit, fragrance-free and made for sensitive skin:", products: [{ name: "Oat Milk Barrier Cream", meta: "$32 · fragrance-free", swatch: "bloom" }, { name: "Calm Repair Serum", meta: "$36 · overnight", swatch: "sage" }] },
      { q: "Is the Calm Repair Serum safe during pregnancy?", a: "That's a medical question I can't answer from a product listing. Worth checking with a doctor first." },
      { q: "Is the Oat Milk Cream fragrance-free?", a: "Yes, fragrance-free and dermatologist tested." },
    ],
  },
};

var heroMsgs = document.getElementById('hero-msgs');
var demoMsgs = document.getElementById('demo-msgs');
var demoTyped = document.getElementById('demo-typed');
var demoTypedText = document.getElementById('demo-typed-text');
var demoPlaceholder = document.getElementById('demo-placeholder');
var demoStoreName = document.getElementById('demo-store-name');
var demoStoreTagline = document.getElementById('demo-store-tagline');

var storeKey = 'home';
var token = 0;
var timer = null;
var typingEls = [];

function el(tag, className) {
  var node = document.createElement(tag);
  node.className = className;
  return node;
}

function scrollBottom() {
  heroMsgs.scrollTop = heroMsgs.scrollHeight;
  demoMsgs.scrollTop = demoMsgs.scrollHeight;
}

function setTyped(text) {
  demoTypedText.textContent = text;
  var has = text.length > 0;
  demoTyped.style.display = has ? 'inline' : 'none';
  demoPlaceholder.style.display = has ? 'none' : 'inline';
}

function clearConvo() {
  heroMsgs.innerHTML = '';
  demoMsgs.innerHTML = '';
  typingEls = [];
}

function addUserBubble(text) {
  [heroMsgs, demoMsgs].forEach(function (container) {
    var row = el('div', 'msg-row msg-row--user');
    var col = el('div', 'msg-col');
    var bubble = el('div', 'bubble bubble--user');
    bubble.textContent = text;
    col.appendChild(bubble);
    row.appendChild(col);
    container.appendChild(row);
  });
  scrollBottom();
}

function addBotBubble(hasProducts) {
  var refs = [heroMsgs, demoMsgs].map(function (container) {
    var row = el('div', 'msg-row msg-row--bot');
    var col = el('div', 'msg-col');
    var bubble = el('div', 'bubble bubble--bot');
    var textNode = document.createTextNode('');
    var caret = el('span', 'caret');
    bubble.appendChild(textNode);
    bubble.appendChild(caret);
    col.appendChild(bubble);
    var skel = null;
    if (hasProducts) {
      skel = el('div', 'skeletons');
      skel.innerHTML = '<div class="skel"></div><div class="skel skel--b"></div>';
      col.appendChild(skel);
    }
    row.appendChild(col);
    container.appendChild(row);
    return { textNode: textNode, caret: caret, col: col, skel: skel };
  });
  scrollBottom();
  return refs;
}

function showProducts(refs, products) {
  refs.forEach(function (ref) {
    if (ref.skel) ref.skel.remove();
    var wrap = el('div', 'prod-cards');
    products.forEach(function (p) {
      var card = el('div', 'prod-card');
      var img = el('div', 'prod-img');
      img.style.background = swatches[p.swatch] || swatches.warm;
      img.style.backgroundSize = '20px 20px';
      var name = el('div', 'prod-name');
      name.textContent = p.name;
      var meta = el('div', 'prod-meta');
      meta.textContent = p.meta;
      var btn = el('div', 'prod-btn');
      btn.textContent = 'Add to cart';
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(meta);
      card.appendChild(btn);
      wrap.appendChild(card);
    });
    ref.col.appendChild(wrap);
  });
  scrollBottom();
}

function showTyping() {
  typingEls = [heroMsgs, demoMsgs].map(function (container) {
    var t = el('div', 'typing');
    t.innerHTML = '<span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>';
    container.appendChild(t);
    return t;
  });
  scrollBottom();
}

function hideTyping() {
  typingEls.forEach(function (t) { t.remove(); });
  typingEls = [];
}

function typeChar(myToken, fullText, i, cb) {
  if (myToken !== token) return;
  setTyped(fullText.slice(0, i));
  if (i >= fullText.length) { cb(); return; }
  timer = setTimeout(function () { typeChar(myToken, fullText, i + 1, cb); }, 26 + Math.random() * 34);
}

function streamBotText(myToken, fullText, refs, cb) {
  function reveal(i) {
    if (myToken !== token) return;
    refs.forEach(function (ref) { ref.textNode.data = fullText.slice(0, i); });
    scrollBottom();
    if (i >= fullText.length) {
      refs.forEach(function (ref) { ref.caret.remove(); });
      cb();
      return;
    }
    timer = setTimeout(function () { reveal(i + 1); }, 10 + Math.random() * 16);
  }
  reveal(0);
}

function runStep(myToken, key, idx) {
  if (myToken !== token) return;
  var script = stores[key].script;
  var item = script[idx % script.length];
  typeChar(myToken, item.q, 0, function () {
    timer = setTimeout(function () {
      if (myToken !== token) return;
      addUserBubble(item.q);
      setTyped('');
      showTyping();
      timer = setTimeout(function () {
        if (myToken !== token) return;
        hideTyping();
        var refs = addBotBubble(!!item.products);
        streamBotText(myToken, item.a, refs, function () {
          if (myToken !== token) return;
          if (item.products) {
            timer = setTimeout(function () {
              if (myToken !== token) return;
              showProducts(refs, item.products);
              scheduleNext(myToken, key, idx);
            }, 450);
          } else {
            scheduleNext(myToken, key, idx);
          }
        });
      }, 1300);
    }, 450);
  });
}

function scheduleNext(myToken, key, idx) {
  timer = setTimeout(function () {
    if (myToken !== token) return;
    var nextIdx = idx + 1;
    if (nextIdx >= stores[key].script.length) {
      clearConvo();
      timer = setTimeout(function () {
        if (myToken === token) runStep(myToken, key, 0);
      }, 700);
    } else {
      runStep(myToken, key, nextIdx);
    }
  }, 2600);
}

function startPlaying(key) {
  token += 1;
  var myToken = token;
  clearTimeout(timer);
  clearConvo();
  setTyped('');
  timer = setTimeout(function () { runStep(myToken, key, 0); }, 500);
}

/* ---------- Demo customization ---------- */

var storeOptsWrap = document.querySelector('.store-opts');
var storeOptBtns = document.querySelectorAll('.store-opt');

storeOptBtns.forEach(function (btn, idx) {
  btn.addEventListener('click', function () {
    var key = btn.dataset.store;
    if (key === storeKey) return;
    storeKey = key;
    storeOptBtns.forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });
    storeOptsWrap.style.setProperty('--wheel-shift', (30 - idx * 30) + 'px');
    demoStoreName.textContent = stores[key].name;
    demoStoreTagline.textContent = stores[key].tagline;
    startPlaying(key);
  });
});

document.querySelectorAll('.accent-dot').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var accent = accents[btn.dataset.accent];
    var root = document.documentElement;
    root.style.setProperty('--accent-base', accent.base);
    root.style.setProperty('--accent-dark', accent.dark);
    root.style.setProperty('--accent-tint', accent.tint);
    document.querySelectorAll('.accent-dot').forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });
  });
});

/* ---------- Customize bar: fade in with the demo (mobile) ---------- */

(function initCustomizeFade() {
  if (!('IntersectionObserver' in window)) return;
  var bar = document.querySelector('.customize');
  var panel = document.querySelector('.demo-panel');
  if (!bar || !panel) return;
  bar.classList.add('bar-hidden');
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      bar.classList.remove('bar-hidden');
      io.disconnect();
    }
  }, { threshold: 0.15 });
  io.observe(panel);
})();

startPlaying(storeKey);
