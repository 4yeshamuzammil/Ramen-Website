/*=============== SHOW & CLOSE MENU ===============*/
/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Hide menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*=============== CHANGE HEADER STYLES ===============*/
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let currentSectionId = '';
  let currentTheme = 'olive'; // Fallback default
  
  // 1. Get the exact height of your header dynamically
  const headerHeight = header.offsetHeight;
  
  // ==========================================
  // 🛠️ TWEAK THIS NUMBER TO FIX YOUR TIMING: 
  // 0 = Changes exactly when the section touches the header
  // 50 = Changes 50px BEFORE it touches the header
  // ==========================================
  const triggerBuffer = 21.5; 

  // 2. Find which section is hitting the header
  sections.forEach(section => {
    // This gets the exact distance from the top of the screen right now
    const distanceToTop = section.getBoundingClientRect().top;
    
    // If the top of the section passes the bottom of the header
    if (distanceToTop <= headerHeight + triggerBuffer) {
      currentSectionId = section.getAttribute('id');
      currentTheme = section.getAttribute('data-header-theme') || 'olive';
    }
  });

  // 3. The "Bottom of Page" Fail-safe
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
    const lastSection = sections[sections.length - 1];
    currentSectionId = lastSection.getAttribute('id');
    currentTheme = lastSection.getAttribute('data-header-theme') || 'olive';
  }

  // 4. Swap the Header Theme
  if (currentTheme === 'cream') {
    header.classList.remove('header-olive');
    header.classList.add('header-cream');
  } else {
    header.classList.remove('header-cream');
    header.classList.add('header-olive');
  }

  // 5. Update the "Active" Link
  if (currentSectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
});


/*=============== MENU COLOR CHANGE (FIXED) ===============*/
const changeNavbarColor = () => {
    const header = document.getElementById('header');
    const menuSection = document.getElementById('menu');
    
    if (menuSection) {
        // Find where the green menu starts and ends
        const menuTop = menuSection.offsetTop - 100; // Trigger slightly before it hits the top
        const menuBottom = menuTop + menuSection.offsetHeight;
        const scrollPosition = window.scrollY;

        // If your screen is currently between the top and bottom of the menu
        if (scrollPosition >= menuTop && scrollPosition <= menuBottom) {
            header.classList.add('menu-active');
        } else {
            header.classList.remove('menu-active');
        }
    }
}

/*=============== RUN BOTH FUNCTIONS ON SCROLL ===============*/
window.addEventListener('scroll', () => {
    scrollHeader();      // Makes header visible/sticky
    changeNavbarColor(); // Changes colors to white/black for the menu
});


/*=============== SWIPER MENU ===============*/

const swiperTabs = new Swiper('.menu__tabs', {
  slidesPerView: 'auto'
})

const swiperMenu = new Swiper('.menu__content', {
  /* 1. This is the magic line that snaps the container to the cards */
  autoHeight: true, 

  /* 2. I changed loop to false. 
     Looping with different heights can cause "glitches" where the 
     bottom of the page jumps. False is much smoother for this design. */
  loop: false, 

  thumbs: {
    swiper: swiperTabs,
  }
})


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // Add the .show-scroll class if the bottom scroll of the viewport is greater than 350//
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if(!link) return

      link.classList.toggle('active', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1500,
    delay: 300,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // reset: true, // Animations repeat
})

sr.reveal('.home__title', {origin: 'top'})
sr.reveal('.home__description', {delay: 600, origin: 'top'})
sr.reveal('.home__container .home__data .button', {delay: 900, distance: '50px', origin: 'bottom'})
sr.reveal('.home__blob', {delay: 900, distance: '100px'})
sr.reveal('.home__images img', {delay: 1200, distance: 0, interval: 200, scale: 0})
sr.reveal('.home__data img', {delay: 1500, distance: 0, interval: 200, scale: 0})
sr.reveal('.home__text', {delay: 2100, distance: '120px'})


sr.reveal('.about__data .section__title')
sr.reveal('.about__data .section__subtitle', {delay: 600})
sr.reveal('.about__description', {delay: 900})
sr.reveal('.about__data .button', {delay: 1200, distance: 0, scale: 0})
sr.reveal('.about__blob', {delay: 1200, origin: 'left'})
sr.reveal('.about__img', {delay: 1500, origin: 'right'})
sr.reveal('.about__data img', {delay: 1800, distance: 0, interval: 200, scale: 0})
sr.reveal('.about__text', {delay: 2100})

sr.reveal('.menu__button', {interval: 100})
sr.reveal('.menu__content', {delay: 600})
sr.reveal('.menu__text-1', {delay: 900, origin: 'top'})
sr.reveal('.menu__text-2', {delay: 1200})

sr.reveal('.new__data .section__title')
sr.reveal('.new__data .section__subtitle', {delay: 600})
sr.reveal(' .section__description', {delay: 900})
sr.reveal('.new__blob', {delay: 900, origin: 'right'})
sr.reveal('.new__images img', {delay: 1200, distance: 0, interval: 200, scale: 0})
sr.reveal('.new__data img', {delay: 1500, distance: 0, interval: 200, scale: 0})
sr.reveal('.new__text-1', {delay: 2100})
sr.reveal('.new__text-2', {delay: 2400})

sr.reveal('.contact__data', {interval: 100})
sr.reveal('.contact__newsletter', {delay: 600})
sr.reveal('.contact__text-1', {delay: 1200, origin: 'top'})
sr.reveal('.contact__text-2', {delay: 1500})

sr.reveal('.footer__container', {distance: '20px'})





