document.addEventListener('DOMContentLoaded', function() {
    const myItem = document.querySelector('.pop-up'); // Use querySelector to get a single element

    setTimeout(() => {
      myItem.style.display = 'block';
    }, 1000); // 1000 milliseconds = 1 seconds
});


function removeShape() {
 const shape = document.getElementsByClassName("x");
 shape.remove();
}