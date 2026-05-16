document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('assets/titles.json?ts=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) return;

    const titles = await response.json();

    document.querySelectorAll('figure.tile').forEach((figure) => {
      const img = figure.querySelector('img');
      const caption = figure.querySelector('.cap, figcaption');
      if (!img || !caption) return;

      const filename = (img.getAttribute('src') || '').split('/').pop();
      const title = titles[filename];

      if (typeof title === 'string' && title.trim() !== '') {
        caption.textContent = title.trim();
        img.alt = title.trim();
      }
    });
  } catch (error) {
    console.warn('Could not load assets/titles.json', error);
  }
});