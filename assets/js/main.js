const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-bg', { scale: 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } });
  });

  const pano = gsap.timeline({
    scrollTrigger: {
      trigger: '.panorama-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });

  pano.to('.panorama-img', { backgroundPosition: '100% center', ease: 'none' }, 0)
      .to('.panorama-progress span', { width: '100%', ease: 'none' }, 0)
      .to('.copy-1', { opacity: 1, y: '-50%', duration: 0.08 }, 0.02)
      .to('.copy-1', { opacity: 0, y: '-58%', duration: 0.08 }, 0.20)
      .to('.copy-2', { opacity: 1, y: '-50%', duration: 0.08 }, 0.26)
      .to('.copy-2', { opacity: 0, y: '-58%', duration: 0.08 }, 0.44)
      .to('.copy-3', { opacity: 1, y: '-50%', duration: 0.08 }, 0.50)
      .to('.copy-3', { opacity: 0, y: '-58%', duration: 0.08 }, 0.68)
      .to('.copy-4', { opacity: 1, y: '-50%', duration: 0.10 }, 0.74);
} else {
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  const firstCopy = document.querySelector('.copy-1');
  if (firstCopy) firstCopy.style.opacity = '1';
}

// Sastavlja narudžbu iz padajućih izbornika u jedno polje za Web3Forms
const orderForm = document.querySelector('form.form');
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    const rows = [...orderForm.querySelectorAll('.order-row')];
    const selectedItems = rows.map((row) => {
      const dish = row.querySelector('.dish-select')?.value || '';
      const qty = Number(row.querySelector('.dish-qty')?.value || 0);
      if (!dish || qty <= 0) return null;
      return `${qty}x ${dish}`;
    }).filter(Boolean);

    const summary = orderForm.querySelector('#narudzba-summary');
    if (summary) summary.value = selectedItems.join('\n');

    if (summary && !summary.value) {
      event.preventDefault();
      alert('Molimo odaberite barem jedno jelo i količinu.');
    }
  });
}
