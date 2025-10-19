// script.js — menu toggle, smooth scroll, fade-in, mailto lead form

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  menuBtn && menuBtn.addEventListener('click', function () {
    mainNav && mainNav.classList.toggle('open');
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav
          if (window.innerWidth < 900 && mainNav) mainNav.classList.remove('open');
        }
      }
    });
  });

  // Fade-in observer
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  faders.forEach(f => observer.observe(f));

  // dynamic year in footer
  const y = new Date().getFullYear();
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = y;
});

// Lead form -> mailto fallback (keeps it simple for GH Pages)
function submitLead(e) {
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('name').value.trim());
  const org = encodeURIComponent(document.getElementById('org').value.trim());
  const contact = encodeURIComponent(document.getElementById('contactField').value.trim());
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  if (!name || !contact) {
    alert('Please enter your name and contact details.');
    return false;
  }

  const subject = encodeURIComponent('Kirunga Group — Lead / Request from ' + (org || name));
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nOrganization: ${decodeURIComponent(org)}\nContact: ${decodeURIComponent(contact)}\n\nMessage:\n${decodeURIComponent(message)}`);
  const mailto = `mailto:info@kirungagroup.com?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  return false;
}
