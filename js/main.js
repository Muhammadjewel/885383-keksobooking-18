'use strict';

var MOCK_DATA = {
  'count': 8,
  'randomText': 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Собрал великий составитель запятой переулка имеет осталось lorem коварных, рыбными свою? Страна залетают ее то несколько путь lorem точках он меня если приставка ipsum напоивший, страну над жизни выйти коварный домах оксмокс вскоре коварных, запятых. Вскоре lorem повстречался но буквенных обеспечивает, деревни своего эта напоивший вершину ему она продолжил возвращайся вопроса, переулка имени за буквоград, последний правилами. Подзаголовок, предупредила, ты! Речью если власти вопроса домах грустный запятых букв! Выйти, вскоре, дороге! Даль гор, первую взгляд себя скатился повстречался строчка всеми мир. Буквенных свой дал, но меня единственное. Ручеек своих lorem деревни великий вершину использовало лучше, грустный заголовок инициал семантика домах напоивший все необходимыми рукопись продолжил но семь продолжил грамматики меня? Коварный, это дорогу которое однажды. Осталось путь своих силуэт текста выйти заглавных дороге, толку предупредила пор. Точках наш, строчка вопрос.',
  'maxWordsInTitle': 5,
  'price': {
    'min': 3000,
    'max': 15000
  },
  'rooms': {
    'min': 1,
    'max': 8
  },
  'maxGuests': 12,
  'maxWordsInDescription': 35
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
        'title': getRandomText(MOCK_DATA.randomText, MOCK_DATA.maxWordsInTitle),
        'address': locationX + ', ' + locationY,
        'price': getRandomIntInclusive(MOCK_DATA.price.min, MOCK_DATA.price.max),
        'rooms': getRandomIntInclusive(MOCK_DATA.rooms.min, MOCK_DATA.rooms.max),
        'guests': getRandomIntInclusive(0, MOCK_DATA.maxGuests),
        'description': getRandomText(MOCK_DATA.randomText, MOCK_DATA.maxWordsInDescription)
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
