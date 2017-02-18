var slides = ['slide1','slide2','slide3'];
var currentSlide = 'slide1';
//nextSlide function
function nextSlide() {
  if ((slides.indexOf(currentSlide)+1) < slides.length) {
    document.getElementById(currentSlide).style.display="none";
    currentSlide = slides[slides.indexOf(currentSlide)+1];
    document.getElementById(currentSlide).style.display="block";
  } else {
    alert("End of slides");
  }
}
//previousSlide function
function previousSlide() {
  if ((slides.indexOf(currentSlide)) > 0) {
    document.getElementById(currentSlide).style.display="none";
    currentSlide = slides[slides.indexOf(currentSlide)-1];
    document.getElementById(currentSlide).style.display="block";
  } else {
    // If no previous slide available, Ask user if they want to return to nobleguy.me
    if (confirm("Are you sure you want to abandon progress and return to www.nobleguy.me?")) {
      window.location.href = "http://www.nobleguy.me";
    }

  }
}
function drawGraph() {


}
