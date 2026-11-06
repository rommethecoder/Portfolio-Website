(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  document.querySelectorAll('.detail-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
      button.querySelector('span').textContent = expanded ? '+' : '−';
    });
  });
  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, {passive: true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
  const art = document.querySelector('.system-art');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    art.addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      art.style.transform = `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg)`;
    });
    art.addEventListener('pointerleave', () => { art.style.transform = ''; });
  }
})();
