var slides = ['slide1','slide2','slide3'];
var userNums = {};
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
function updateGraph() {
// clear graph
// using number of keys in userNums as a counter, iterate through
// slides creating tree graph of userNums values
// e.g. for slide in slides {create block for usernums[slide]}

// for now, update graph just creates a div of usernums
var node = document.createElement("span");
var textNode = document.createTextNode(currentSlide+' = '+userNums[currentSlide]);
node.appendChild(textNode);
document.rightSide.appendChild(node);
}

function storeNum() {
  // Stores user input into dictionary userNums
  userNums[currentSlide] = document.getElementById(currentSlide + "input").value;
  nextSlide();
  updateGraph(); //TODO create function to rebuild graph each time a number is added
  //alert(userNums[currentSlide]);
}
