/* Forge — shared site behaviour: nav, reveal-on-scroll, pricing period toggle */
(() => {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const setOpen = open => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const plans = {
    monthly:   { amt: '£6.99',  per: '/ month',   note: '' },
    quarterly: { amt: '£17.99', per: '/ quarter', note: '£6.00/mo · save 14%' },
    annual:    { amt: '£47.99', per: '/ year',    note: '£4.00/mo · save 43%' },
  };
  document.querySelectorAll('.plan.pro').forEach(card => {
    const btns = card.querySelectorAll('.period button');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.setAttribute('aria-pressed', x === b));
      const p = plans[b.dataset.period];
      card.querySelector('[data-price-amt]').textContent = p.amt;
      card.querySelector('[data-price-per]').textContent = p.per;
      card.querySelector('[data-price-note]').innerHTML = p.note || '&nbsp;';
    }));
  });
})();
