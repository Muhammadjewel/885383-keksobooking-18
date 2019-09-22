'use strict';

var DATA_LENGTH = 8;
var RANDOM_TEXT = 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Заголовок меня залетают, безорфографичный взобравшись рот большой но по всей сбить правилами жаренные вершину домах осталось единственное образ диких всеми гор своего за продолжил своих рыбными свой подпоясал скатился пунктуация.';

var getRandomText = function (text, wordCount) {
  var splittedText = text.split(' ');
  var startingPoint = Math.floor(Math.random() * (splittedText.length - wordCount));
  return splittedText.splice(startingPoint, wordCount).join(' ');
};

var generateData = function () {
  var dataArray = [];
  for (var i = 0; i < DATA_LENGTH; i++) {
    dataArray.push({
      'offer': {
        'title': getRandomText(RANDOM_TEXT, 4)
      }
    });
  }
  return dataArray;
};

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

activateMap();
