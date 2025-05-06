const popup = document.querySelector('.pop-up'); // Use querySelector to get a single element
const background = document.querySelector('.darkBackground');
const lineWatcher = document.querySelector('.scroll-watcher');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const image = document.querySelector('.background1');




window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollY / maxScroll; // between 0 and 1

  // Define the scroll percentage ranges for the color transitions
  const fadeToBrownEnd = 0.15; // End of the fade from peach to brown
  const constantBrownEnd = 0.5; // End of the constant brown section

  if (scrollPercentage <= fadeToBrownEnd) {
      // Fade from peach (248, 232, 225) to brown (92, 58, 46)
      let factor = scrollPercentage / fadeToBrownEnd; // normalize between 0 and 1 for this range
      let r = Math.round(248 + (92 - 248) * factor);
      let g = Math.round(232 + (58 - 232) * factor);
      let b = Math.round(225 + (46 - 225) * factor);
      body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      // ... (scroll-watcher color logic - adjust ranges if needed)
      let linefactor = scrollPercentage / fadeToBrownEnd;
      let lc = Math.round(89 + (248 - 89) * linefactor);
      let ld = Math.round(55 + (232 - 55) * linefactor);
      let le = Math.round(43 + (225 - 43) * linefactor);
      lineWatcher.style.backgroundColor = `rgb(${lc}, ${ld}, ${le})`;

  } else if (scrollPercentage > fadeToBrownEnd && scrollPercentage < constantBrownEnd) {
      // Constant brown color in this range
      body.style.backgroundColor = `rgb(92, 58, 46)`;
      lineWatcher.style.backgroundColor = `rgb(248, 232, 225)`; // Keep scroll-watcher color constant too

  } else { // scrollPercentage >= constantBrownEnd
      // Fade back from brown (92, 58, 46) to peach (248, 232, 225)
      // Normalize the factor for this fade range (from constantBrownEnd to 1)
      let factor = (scrollPercentage - constantBrownEnd) / (1 - constantBrownEnd);
      let r = Math.round(92 + (248 - 92) * factor);
      let g = Math.round(58 + (232 - 58) * factor);
      let b = Math.round(46 + (225 - 46) * factor);
      body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      // ... (scroll-watcher color logic - adjust ranges if needed)
      let linefactor = (scrollPercentage - constantBrownEnd) / (1 - constantBrownEnd);
      let lc = Math.round(248 + (89 - 248) * linefactor);
      let ld = Math.round(232 + (55 - 232) * linefactor);
      let le = Math.round(225 + (43 - 225) * linefactor);
      lineWatcher.style.backgroundColor = `rgb(${lc}, ${ld}, ${le})`;
  }

  // ... (overlay color logic - keep this as it is)
  overlay.style.backgroundColor = `rgba(89, 55, 43, ${Math.min(scrollPercentage * 2, 1)})`;
});





 window.addEventListener('scroll', function() {
    // Get the scroll position
    let scrollPos = window.scrollY;
    let scrollOther = window.scrollY;
    // Select the pic1 element
    const part1 = document.querySelector('.part1');
    const part2 = document.querySelector('.part2');
    // Move the image to the left based on the scroll amount
    // Adjust the factor to control how fast it moves
    let translateX = -scrollPos * 0.2; // Change 0.5 to increase/decrease speed
    let translateOtherX = +scrollOther * 0.2;

    part1.style.transform = `translateX(${translateX}px)`;
    part2.style.transform = `translateX(${translateOtherX}px)`;
     });



document.addEventListener('DOMContentLoaded', function() {
    const otherInt = document.querySelector('.otherInt');

    function checkVisibility() {
        const rect = otherInt.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const delay = 100; // Delay in pixels, adjust this value as needed

        // Check if the element is within the viewport minus the delay
        if (rect.top <= windowHeight - delay && rect.bottom >= 0) {
            otherInt.classList.add('visible');
        } else {
            otherInt.classList.remove('visible'); // Remove the class if out of view
        }
    }

    // Run on scroll
    window.addEventListener('scroll', checkVisibility);

    // Run on page load
    checkVisibility();
});





























document.addEventListener('DOMContentLoaded', () => {
  // Your existing code for pop-up, background colors, etc. goes here

  const imagesContainers = document.querySelectorAll('.containNail > div'); // Select the div containers (c1, c2, c3, c4)
  const containNail = document.querySelector('.containNail');

  // Configuration for the unstacking effect
  const unstackScrollDistance = window.innerHeight * 1.5; // How much scroll distance needed to fully unstack
  const maxVerticalOffset = 370; // <--- INCREASE THIS VALUE (Example: changed from 300 to 500)

  window.addEventListener('scroll', () => {
      // Your existing scroll logic for background colors, part1/part2 movement, etc. goes here

      const scrollY = window.scrollY;
      const containNailRect = containNail.getBoundingClientRect();

      // Calculate the scroll position relative to the start of the unstacking section
      const unstackStartPoint = containNailRect.top + window.scrollY - window.innerHeight;

      // Calculate the scroll progress within the unstacking section
      const scrollProgress = Math.max(0, Math.min(1, (scrollY - unstackStartPoint) / unstackScrollDistance));

      // Apply the transformation to each image container based on scroll progress
      imagesContainers.forEach((container, index) => {
          let verticalOffset = 0; // Initialize offset to 0

          // Only apply the movement to images from the second one onwards (index > 0)
          if (index > 0) {
              const relativeIndex = index - 1;
              verticalOffset = scrollProgress * (maxVerticalOffset * (relativeIndex + 1));

              // Ensure the vertical offset doesn't exceed the max for the last image
              verticalOffset = Math.min(verticalOffset, maxVerticalOffset * (imagesContainers.length - 1));
          }

          // Apply the translation
          container.style.transform = `translateY(${verticalOffset}px)`;
          container.style.zIndex = imagesContainers.length - index;
      });
  });

  // Initial call to set the correct position on page load
  window.dispatchEvent(new Event('scroll'));
});
