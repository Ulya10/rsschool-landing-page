
const switcher = document.querySelector('.theme-switcher');
const root = document.documentElement;
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const hamburger = document.querySelector('.hamburger');
const sliderCards = document.querySelectorAll('.slider-card');
const sliderTrack = document.querySelector('.slider-track');
const sliderWindow = document.querySelector('.slider-card-wrapper');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const nav = document.querySelector('.nav');

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

function openMenu() {
  hamburger.classList.add('active');
  nav.classList.add('active');
  document.documentElement.classList.add('no-scroll');
}

function closeMenu() {
  hamburger.classList.remove('active');
  nav.classList.remove('active');
  document.documentElement.classList.remove('no-scroll');
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

nav.addEventListener('click', () => {
  if (!nav.classList.contains('active')) {
    return;
  } else {
    closeMenu();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key = 'escape' && nav.classList.contains('active')) {
    closeMenu();
  }
});

const catalogList = document.querySelector(".catalog-list");
const tabs = document.querySelector(".catalog-btns");
const tabArray = document.querySelectorAll(".catalog-btn");
let activeCategory = 0;

function getProducts(category) {
  return products.filter(item => item.category === category);
}

tabs.addEventListener('click', (evt) => {
  tabArray.forEach(item => {
    item.classList.remove('active');
  });

  const currTab = evt.target.closest('.catalog-btn');

  if (!currTab) {
    return;
  }
currTab.classList.add('active');
  const category = currTab.dataset.category;
  const cardsData = getProducts(category);
  catalogList.textContent = '';
  cardsData.forEach((item, i) => {
    renderCard(item, i, category);
  });
});

const initData = getProducts('coffee');
initData.forEach((item, i) => {
    renderCard(item, i, 'coffee');
});

function renderCard(product, i, category) {
  const card = document.createElement('li');
  card.classList.add('catalog-item');
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('card-image');
  const image = document.createElement('img');
  image.src = `img/${category}-${i+1}.jpg`;
  const catalogContent = document.createElement('div');
  catalogContent.classList.add('catalog-content');
  const header = document.createElement('h3');
  header.textContent = product.name;
  const descr = document.createElement('div');
  descr.classList.add('descr');
  descr.textContent = product.description;
  const price = document.createElement('div');
  price.classList.add('price');
  price.textContent = `${product.price}$`;
  catalogContent.append(header, descr, price);
  card.append(image, catalogContent);
  catalogList.append(card);
}

