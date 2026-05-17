// ── Reading Progress Bar ─────────────────────────────
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / total * 100) + '%';
});

// ── Mobile Nav Toggle ────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ── Resume Modal ─────────────────────────────────────
const modal = document.getElementById('modal');
document.getElementById('openModal').addEventListener('click', () => modal.classList.add('open'));
document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

// ── Scroll Reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Terminal Typer ────────────────────────────────────
const termLines = [
  { type: 'prompt', text: 'whoami' },
  { type: 'output', text: 'michael_herrera' },
  { type: 'blank' },
  { type: 'prompt', text: 'cat profile.json' },
  { type: 'kv', key: '  "role"',       val: '"Lead AI Server Technician"' },
  { type: 'kv', key: '  "location"',   val: '"Dallas, TX"' },
  { type: 'kv', key: '  "experience"', val: '"3+ years"' },
  { type: 'kv', key: '  "degree"',     val: '"B.S. Cybersecurity Mgmt"' },
  { type: 'blank' },
  { type: 'prompt', text: 'uptime --impact' },
  { type: 'output', text: '$15K saved/rack | 40% throughput ↑' },
  { type: 'blank' },
  { type: 'prompt', text: '_' },
];

const termBody = document.getElementById('terminal-body');
let lineIdx = 0;

function addLine() {
  if (lineIdx >= termLines.length) return;
  const l = termLines[lineIdx++];
  const div = document.createElement('div');

  if (l.type === 'blank') {
    div.className = 't-blank';
  } else if (l.type === 'prompt') {
    div.className = 't-line';
    div.innerHTML = l.text === '_'
      ? `<span class="t-prompt">$</span><span class="cursor"></span>`
      : `<span class="t-prompt">$</span><span class="t-cmd"> ${l.text}</span>`;
  } else if (l.type === 'output') {
    div.className = 't-out';
    div.textContent = l.text;
  } else if (l.type === 'kv') {
    div.className = 't-out';
    div.innerHTML = `<span class="t-key">${l.key}</span>: <span class="t-val">${l.val}</span>`;
  }

  termBody.appendChild(div);
  if (lineIdx < termLines.length) setTimeout(addLine, l.type === 'blank' ? 60 : 120);
}

setTimeout(addLine, 1200);