'use strict';

var MOCK_DATA = {
  'count': 8,
  'randomText': 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Собрал великий составитель запятой переулка имеет осталось lorem коварных, рыбными свою? Страна залетают ее то несколько путь lorem точках он меня если приставка ipsum напоивший, страну над жизни выйти коварный домах оксмокс вскоре коварных, запятых. Вскоре lorem повстречался но буквенных обеспечивает, деревни своего эта напоивший вершину ему она продолжил возвращайся вопроса, переулка имени за буквоград, последний правилами. Подзаголовок, предупредила, ты! Речью если власти вопроса домах грустный запятых букв! Выйти, вскоре, дороге! Даль гор, первую взгляд себя скатился повстречался строчка всеми мир. Буквенных свой дал, но меня единственное. Ручеек своих lorem деревни великий вершину использовало лучше, грустный заголовок инициал семантика домах напоивший все необходимыми рукопись продолжил но семь продолжил грамматики меня? Коварный, это дорогу которое однажды. Осталось путь своих силуэт текста выйти заглавных дороге, толку предупредила пор. Точках наш, строчка вопрос.',
  'maxWordsInTitle': 5,
  'price': {
    'min': 3000,
    'max': 15000
  },
  'type': ['palace', 'flat', 'house', 'bungalo'],
  'rooms': {
    'min': 1,
    'max': 8
  },
  'maxGuests': 12,
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'maxWordsInDescription': 35,
  'photos': [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var MAP_CANVAS_WIDTH = 1200;
var MAP_CANVAS_TOP_Y = 130;
var MAP_CANVAS_BOTTOM_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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

var getAvatarPath = function (suffixNumber) {
  return 'img/avatars/user0' + suffixNumber + '.png';
};

var generateData = function () {
  var dataArray = [];
  for (var i = 0; i < MOCK_DATA.count; i++) {
    var locationX = getRandomIntInclusive(0, MAP_CANVAS_WIDTH - PIN_WIDTH / 2);
    var locationY = getRandomIntInclusive(MAP_CANVAS_TOP_Y + PIN_HEIGHT, MAP_CANVAS_BOTTOM_Y);

    var newDataObject = {
      'author': {
        'avatar': getAvatarPath(i + 1)
      },
      'offer': {
        'title': getRandomText(MOCK_DATA.randomText, MOCK_DATA.maxWordsInTitle),
        'address': locationX + ', ' + locationY,
        'price': getRandomIntInclusive(MOCK_DATA.price.min, MOCK_DATA.price.max),
        'type': MOCK_DATA.type[getRandomInt(0, MOCK_DATA.type.length)],
        'rooms': getRandomIntInclusive(MOCK_DATA.rooms.min, MOCK_DATA.rooms.max),
        'guests': getRandomIntInclusive(0, MOCK_DATA.maxGuests),
        'checkin': MOCK_DATA.checkin[getRandomInt(0, MOCK_DATA.checkin.length)],
        'checkout': MOCK_DATA.checkout[getRandomInt(0, MOCK_DATA.checkout.length)],
        'features': MOCK_DATA.features.slice(0, getRandomInt(1, MOCK_DATA.features.length)),
        'description': getRandomText(MOCK_DATA.randomText, MOCK_DATA.maxWordsInDescription),
        'photos': MOCK_DATA.photos.slice(0, getRandomInt(1, MOCK_DATA.photos.length))
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

var generateMapPinElements = function (pinObjectsArray) {
  var pinElements = [];
  var pinTemplate = document.querySelector('#pin');
  for (var i = 0; i < pinObjectsArray.length; i++) {
    var pinClone = document.importNode(pinTemplate.content, true);
    var pinButton = pinClone.querySelector('button');
    pinButton.style.left = pinObjectsArray[i].location.x + 'px';
    pinButton.style.top = pinObjectsArray[i].location.y + 'px';
    var pinImage = pinClone.querySelector('img');
    pinImage.src = pinObjectsArray[i].author.avatar;
    pinImage.alt = pinObjectsArray[i].offer.title;
    pinElements.push(pinClone);
  }
  return pinElements;
};

var renderMapPinElements = function (pinElementsArray) {
  var mapPinsWrapper = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < pinElementsArray.length; i++) {
    pinsFragment.appendChild(pinElementsArray[i]);
  }
  mapPinsWrapper.appendChild(pinsFragment);
};

renderMapPinElements(generateMapPinElements(generateData()));
