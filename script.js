const switcher = document.querySelector('.theme-switcher');
const root = document.documentElement;
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

if (root.getAttribute('data-theme') === 'dark') {
  moon.classList.add('active');
  sun.classList.remove('active');
} else {
  sun.classList.add('active');
  moon.classList.remove('active');
}

switcher.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';

    if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        moon.classList.remove('active');
        sun.classList.add('active');
    } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moon.classList.add('active');
        sun.classList.remove('active');
    }
});