
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

const cardsLen = sliderCards.length;
const firstCard = sliderCards[0];
const lastCard = sliderCards[cardsLen - 1];

const firstClone = lastCard.cloneNode(true);
const lastClone = firstCard.cloneNode(true);

sliderTrack.prepend(firstClone);
sliderTrack.append(lastClone);

const sliderControls = document.querySelector('.slider-controls');
const controlsArray = document.querySelectorAll('.slider-control');
let currSlide = 1;

function updateControl(slide) {
  for (let i = 0; i < cardsLen; i++) {
    controlsArray[i].classList.remove('control-active');
  }

  let realIndex = slide - 1;
  if (realIndex < 0) {
    realIndex = cardsLen - 1;
  }

  if (realIndex >= cardsLen) {
    realIndex = 0;
  }

  controlsArray[realIndex].classList.add('control-active');

}

function slideTo(i) {
  currSlide = i;
  sliderTrack.style.transition = 'transform 0.5s ease';
  sliderTrack.style.transform = `translateX(-${sliderWindow.offsetWidth * currSlide}px)`;
  updateControl(i);
}

function jumpTo(i) {
  currSlide = i;
  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = `translateX(-${sliderWindow.offsetWidth * currSlide}px)`;
  void sliderTrack.offsetHeight;
  updateControl(i);
}

leftArrow.addEventListener('click', () => {
  slideTo(currSlide - 1);
});

rightArrow.addEventListener('click', () => {
  slideTo(currSlide + 1);
});

sliderTrack.addEventListener('transitionend', () => {
  if (currSlide == cardsLen + 1) {
    jumpTo(1);
  }
  if (currSlide == 0) {
    jumpTo(cardsLen);
  }

});

jumpTo(1);

sliderControls.addEventListener('click', (evt) => {
  for (let i = 0; i < cardsLen; i++) {
    if (evt.target == controlsArray[i]) {
      slideTo(i+1);
      break; 
    }
  }
});


const card = sliderCards[0];
const cs = getComputedStyle(card);
console.log({
  width: cs.width,
  padding: cs.padding,
  border: cs.border,
  boxSizing: cs.boxSizing,
  minWidth: cs.minWidth,
  maxWidth: cs.maxWidth,
  flex: cs.flex,
  flexBasis: cs.flexBasis,
  offsetWidth: card.offsetWidth,
  scrollWidth: card.scrollWidth,
});

// Дети
[...card.children].forEach((child, i) => {
  const c = getComputedStyle(child);
  console.log(`[${i}] ${child.tagName}.${child.className}:`, {
    width: c.width,
    padding: c.padding,
    margin: c.margin,
    offsetWidth: child.offsetWidth,
    scrollWidth: child.scrollWidth,
  });
});