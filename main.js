/* ============================================
   ELITE ESTATES — main.js
   All interactive behaviour for the website
   ============================================ */


/* ── Navbar: add "scrolled" class after user scrolls down ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Toggle the scrolled style once the page is past 60px
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


/* ── Hero background: trigger Ken-Burns zoom shortly after load ── */
setTimeout(() => {
  const heroBg = document.getElementById('heroBg');
  if (heroBg) heroBg.classList.add('loaded');
}, 100);


/* ── Mobile menu: open / close fullscreen overlay ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}


/* ── Scroll-reveal: animate cards into view as user scrolls ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger each card slightly based on its position
      const delay = parseInt(entry.target.dataset.delay || 0);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      // Stop watching once the card is already visible
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Attach the observer to all card elements and set stagger delays
document.querySelectorAll('.prop-card, .service-card, .trust-card, .testi-card').forEach((card, index) => {
  card.dataset.delay = (index % 4) * 120; // max 360ms stagger within each row
  revealObserver.observe(card);
});


/* ── Contact form: handle submission with a loading / success state ── */
function handleSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submitBtn');

  // Show a "sending" state while we simulate the request
  submitBtn.textContent = 'Sending\u2026';
  submitBtn.disabled = true;

  // Simulate a short network delay, then confirm success
  setTimeout(() => {
    submitBtn.textContent = 'Message Sent \u2713';
    submitBtn.style.background = '#6B7C5E'; // muted green to signal success

    // Reset the button after a few seconds so the form can be used again
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      event.target.reset();
    }, 3000);
  }, 1500);
}