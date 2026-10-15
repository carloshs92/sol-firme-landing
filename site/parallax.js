// Parallax de la landing: cada [data-parallax] se desplaza según qué tan lejos
// está su sección del centro de la pantalla. Positivo = va más rápido que el
// scroll (cerca); negativo = más lento (lejos). [data-giro] además lo rota.
// Solo transform, en un requestAnimationFrame, y solo para las secciones a la
// vista. Con "reducir movimiento" no se mueve nada.
const quieto = matchMedia('(prefers-reduced-motion: reduce)');
const capas = [...document.querySelectorAll('[data-parallax]')].map((el) => ({
  el,
  caja: el.closest('section') || el.parentElement,
  vel: parseFloat(el.dataset.parallax) || 0,
  giro: parseFloat(el.dataset.giro) || 0,
}));
const visibles = new Set();
let pedido = 0;

function pintar() {
  pedido = 0;
  const centro = innerHeight / 2;
  const tope = Math.min(140, innerHeight * 0.18);
  for (const c of capas) {
    if (!visibles.has(c.caja)) continue;
    // Distancia al centro medida en su sitio sin mover (offsetTop no cambia con transform).
    const d = c.caja.getBoundingClientRect().top + c.el.offsetTop + c.el.offsetHeight / 2 - centro;
    const y = Math.max(-tope, Math.min(tope, d * c.vel));
    c.el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)` + (c.giro ? ` rotate(${(d * c.giro).toFixed(1)}deg)` : '');
  }
}
const pedir = () => { if (!pedido) pedido = requestAnimationFrame(pintar); };

const ojo = new IntersectionObserver((entradas) => {
  for (const e of entradas) e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target);
  pedir();
}, { rootMargin: '20% 0px' });

function activar() {
  if (quieto.matches) {
    removeEventListener('scroll', pedir);
    removeEventListener('resize', pedir);
    ojo.disconnect();
    visibles.clear();
    for (const c of capas) c.el.style.transform = '';
    return;
  }
  new Set(capas.map((c) => c.caja)).forEach((caja) => ojo.observe(caja));
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir, { passive: true });
  pedir();
}
quieto.addEventListener('change', activar);
activar();
