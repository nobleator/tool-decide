
//==============================================================================

try {
  var Alternative = require('../controllers/alternative');
  var altTest = new Alternative('honda civic');
  var attTest = ['color', 'horsepower', 'gas mileage'];
  altTest.setAttributes(attTest);
  altTest.setWeights();
  console.log(altTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}

//==============================================================================
