// public/js/index.js
//==============================================================================
//


var attIDArray = ['L1','L2','L3','R1','R2','R3'];
var inputIDArray = ['att1','att1','att2','att2','att3','att3'];

function chooseSlide(evt, num) {
  var slideNum = parseInt(num);
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  // if slide3 is clicked, update slider text
  if (slideNum == 3) {
    for (i = 0; i < attIDArray.length; i++) {
      if (document.getElementById(inputIDArray[i]).value != ''){
        document.getElementById(attIDArray[i]).innerHTML = document.getElementById(inputIDArray[i]).value;
      }
    }
  }
  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById('slide'+ slideNum).style.display = 'block';
  evt.currentTarget.className += ' active';
}
// Get the element with id="slide1" and click on it
document.getElementById('defaultSlide').click();
//nextSlide function
function updateGraph() {
// clear graph
// using number of keys in userNums as a counter, iterate through
// slides creating tree graph of userNums values
// e.g. for slide in slides {create block for usernums[slide]}
//TODO: D3js
}

function storeNum() {
  // Stores user input
}
