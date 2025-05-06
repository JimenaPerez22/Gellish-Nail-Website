const elements = [
  document.querySelector('.gallery-squish'),
  document.querySelector('.home-squish'),
  document.querySelector('.contact-squish'),
  document.querySelector('.policy-squish')
];

const targetPages = [
  'gallery.html',
  'home.html',
  'contact.html',
  'policy.html'
];

elements.forEach((element, index) => {
  element.addEventListener('click', () => {
    // Start squish animation
    element.classList.add('squish-animate');

    // Change the text immediately or during animation
    element.textContent = 'Open';

    element.addEventListener('animationend', () => {
      element.classList.remove('squish-animate');

      // Redirect after animation ends
      window.location.href = targetPages[index]; // Redirect to corresponding page
    }, { once: true });
  });
});