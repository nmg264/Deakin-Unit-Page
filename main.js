document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;

  var themeToggle = document.querySelector('.theme-toggle');
  var savedTheme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(isDark) {
    body.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  themeToggle.addEventListener('click', function () {
    var isDark = !body.classList.contains('dark');
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  var picker = document.querySelector('.trimester-picker');
  var pickerButtons = picker.querySelectorAll('button');
  var trimesterRows = document.querySelectorAll('[data-trimester]');

  function showTrimester(value) {
    pickerButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.value === value));
    });
    trimesterRows.forEach(function (row) {
      row.hidden = value !== 'all' && row.dataset.trimester !== value;
    });
  }

  picker.hidden = false;
  pickerButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showTrimester(button.dataset.value);
    });
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sectionHeadings = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  var clickLockUntil = 0;

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  function highlightCurrentSection() {
    if (Date.now() < clickLockUntil) {
      return;
    }
    var current = sectionHeadings[0];
    sectionHeadings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= window.innerHeight / 2) {
        current = heading;
      }
    });
    setActiveLink(current.id);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      clickLockUntil = Date.now() + 1200;
      setActiveLink(link.getAttribute('href').slice(1));
    });
  });

  highlightCurrentSection();
  window.addEventListener('scroll', highlightCurrentSection);

  document.querySelector('.print-button').addEventListener('click', function () {
    window.print();
  });

  var backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
