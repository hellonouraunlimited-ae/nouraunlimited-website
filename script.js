const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const form = document.getElementById('rfq-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `RFQ: ${data.get('product')} — ${data.get('company')}`;
    const body = [
      'REQUEST FOR QUOTATION',
      '',
      `Company: ${data.get('company')}`,
      `Contact person: ${data.get('contact')}`,
      `Email: ${data.get('email')}`,
      `WhatsApp: ${data.get('phone') || 'Not provided'}`,
      '',
      `Product required: ${data.get('product')}`,
      `Estimated quantity: ${data.get('quantity') || 'Not specified'}`,
      `Destination country: ${data.get('destination')}`,
      `Preferred Incoterm: ${data.get('incoterm')}`,
      '',
      'Additional requirements:',
      data.get('message') || 'None provided'
    ].join('\n');
    window.location.href = `mailto:sales@nouraunlimited.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
