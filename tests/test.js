console.log('begin testing...\n...\n...\n...\n...\n...');
//==============================================================================
//
try {
  console.log('instantiating topic object...');
  var Topic = require('../controllers/topic');
  var topicTest = new Topic('cars');
  console.log(topicTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//
try {
  console.log('adding children...');
  topicTest.addChild('utility', 'performance');
  topicTest.addChild('performance', 'engine');
  topicTest.addChild('engine', 'top speed');
  topicTest.addChild('engine', 'acceleration');
  topicTest.addChild('engine', 'X Factor');
  topicTest.addChild('performance', 'durability');
  topicTest.addChild('durability', 'horsepower');
  topicTest.addChild('durability', 'MPG');
  topicTest.addChild('utility', 'comfort');
  topicTest.addChild('comfort', 'heated seats');
  topicTest.addChild('comfort', 'color');
  console.log(topicTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//
try {
  console.log('instantiating alternative object...');
  var Alternative = require('../controllers/alternative');
  var alternativeTest = new Alternative(topicTest,
                                        'honda civic',
                                        5000.00);
  console.log(alternativeTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//
try {
  console.log('setting weights...');
  topicTest.setWeights();
  console.log(topicTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//
try {
  console.log('setting values...');
  alternativeTest.setValues();
  console.log(alternativeTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
//==============================================================================
//
try {
  console.log('calculating utility...');
  alternativeTest.calcUtility();
  console.log(alternativeTest);
}
catch (err) {
  console.log('something went wrong. ' + err);
}
