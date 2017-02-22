
//==============================================================================
//Test topic.js
try {
  console.log('Test 1');
  var Topic = require('../controllers/topic');
  var topTest = new Topic('cars');
  console.log(topTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}

//==============================================================================
//Test alternative.js
try {
  console.log('Test 2');
  var Alternative = require('../controllers/alternative');
  var topTest = new Topic('cars');
  var altTest = new Alternative('honda civic', topTest);
  console.log(altTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//Test attribute.js
try {
  console.log('Test 3');
  var Attribute = require('../controllers/attribute');
  var att1 = new Attribute('performance', 'cars');
  var att11 = new Attribute('horsepower', att1);
  var att12 = new Attribute('gas mileage', att1);
  att1.addChild(att11);
  att1.addChild(att12);
  att1.setWeight();
  console.log(att1);
  console.log(att11);
  console.log(att12);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//Test topic.js and alternative.js together
try {
  /*console.log('Test 4');
  var Topic = require('../controllers/topic');
  var topTest = new Topic('cars');
  var Alternative = require('../controllers/alternative');
  var altTest = new Alternative('honda civic', topTest);
  topTest.addAlternative(altTest);
  topTest.addAttribute('performance');
  topTest.addAttribute('style');
  topTest.setWeights();
  console.log(topTest);
  console.log(altTest);*/
}
catch (err) {
  console.log('something went wrong. ' + err);
}

//==============================================================================
