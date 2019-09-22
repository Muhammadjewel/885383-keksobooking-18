'use strict';

var MOCK_DATA = {
  'count': 8,
  'randomText': 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Заголовок меня залетают, безорфографичный взобравшись рот большой но по всей сбить правилами жаренные вершину домах осталось единственное образ диких всеми гор своего за продолжил своих рыбными свой подпоясал скатился пунктуация.'
};

var MAP_CANVAS_WIDTH = 600;
var MAP_CANVAS_TOP_Y = 130;
var MAP_CANVAS_BOTTOM_Y = 630;

var getRandomText = function (text, wordCount) {
  var splittedText = text.split(' ');
  var startingPoint = Math.floor(Math.random() * (splittedText.length - wordCount));
  return splittedText.splice(startingPoint, wordCount).join(' ');
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateData = function () {
  var dataArray = [];
  for (var i = 0; i < MOCK_DATA.count; i++) {
    var locationX = getRandomIntInclusive(0, MAP_CANVAS_WIDTH);
    var locationY = getRandomIntInclusive(MAP_CANVAS_TOP_Y, MAP_CANVAS_BOTTOM_Y);
    var newDataObject = {
      'offer': {
        'title': getRandomText(MOCK_DATA.randomText, 4),
        'address': locationX + ', ' + locationY
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    dataArray.push(newDataObject);
  }
  return dataArray;
};

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

activateMap();
