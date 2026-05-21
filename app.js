// ── Theme Toggle ──
// Apply saved theme immediately to prevent flash
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }


  const views = {
    home: document.getElementById('home-view'),
    about: document.getElementById('about-view'),
    projects: document.getElementById('projects-view'),
    blog: document.getElementById('blog-view'),
    resume: document.getElementById('resume-view'),
    contact: document.getElementById('contact-view')
  };

  let currentViewId = 'home';

  // Navigation logic using hash routing
  function navigateTo(targetViewId) {
    if (!views[targetViewId]) {
      targetViewId = 'home';
    }

    if (currentViewId === targetViewId) return;

    const currentView = views[currentViewId];
    const nextView = views[targetViewId];

    // Fade out current view
    currentView.classList.add('fade-out');

    // Wait for transition duration
    setTimeout(() => {
      currentView.classList.add('hidden');
      currentView.classList.remove('fade-out');

      // Setup and fade in next view
      nextView.classList.remove('hidden');
      // Force repaint to trigger animation
      nextView.offsetHeight;
      
      currentViewId = targetViewId;
    }, 250); // Matches transition duration in style.css
  }

  // Handle Hash Changes
  function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
  }

  // Set up listeners for the nav links
  document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      window.location.hash = target === 'home' ? '' : target;
    });
  });

  // Handle Back Buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
    });
  });

  // Listen to hash changes (covers browser navigation back/forward)
  window.addEventListener('hashchange', handleRoute);

  // Initialize route on load
  const initialHash = window.location.hash.slice(1);
  if (initialHash && views[initialHash]) {
    // Hide home-view directly to avoid flash, show target
    views.home.classList.add('hidden');
    views[initialHash].classList.remove('hidden');
    currentViewId = initialHash;
  }
});
