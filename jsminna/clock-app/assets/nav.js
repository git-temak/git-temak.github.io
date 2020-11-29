const menuToggle = () => {
    const nav = document.querySelector('.navbar');
    const navToggle = document.querySelector('nav');
    const navs = document.querySelectorAll('.navbarItems');
    navs.forEach(nav => nav.classList.toggle('navbarToggleShow'));
    nav.style.background = 'rgba(0,0,0,0.5)';

    if (!navToggle.classList.contains('navbarToggleShow')) {
    	nav.style.background = '';
    }
}
  
document.querySelector('.navbarToggle').addEventListener('click', menuToggle);