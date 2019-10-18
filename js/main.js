'use strict';

var MOCK_DATA = {
  'count': 8,
  'announcementTitles': [
    'Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'
  ],
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
  'descriptionTexts': ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
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

var getRandomText = function (textsArray, arrayIndex) {
  return textsArray[arrayIndex];
};

function getRandomNumber(min, max) {
  var minValue = Math.ceil(min);
  var maxValue = Math.floor(max);

  return Math.floor(Math.random() * (maxValue - minValue + 1));
}

var getAvatarPath = function (suffixNumber) {
  return 'img/avatars/user0' + suffixNumber + '.png';
};

var generateData = function () {
  var dataArray = [];

  for (var i = 0; i < MOCK_DATA.count; i++) {
    var locationX = getRandomNumber(0, MAP_CANVAS_WIDTH - PIN_WIDTH / 2);
    var locationY = getRandomNumber(MAP_CANVAS_TOP_Y + PIN_HEIGHT, MAP_CANVAS_BOTTOM_Y);

    var newDataObject = {
      'author': {
        'avatar': getAvatarPath(i + 1)
      },
      'offer': {
        'title': getRandomText(MOCK_DATA.announcementTitles, i),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(MOCK_DATA.price.min, MOCK_DATA.price.max),
        'type': MOCK_DATA.type[getRandomNumber(0, MOCK_DATA.type.length)],
        'rooms': getRandomNumber(MOCK_DATA.rooms.min, MOCK_DATA.rooms.max),
        'guests': getRandomNumber(0, MOCK_DATA.maxGuests),
        'checkin': MOCK_DATA.checkin[getRandomNumber(0, MOCK_DATA.checkin.length)],
        'checkout': MOCK_DATA.checkout[getRandomNumber(0, MOCK_DATA.checkout.length)],
        'features': MOCK_DATA.features.slice(0, getRandomNumber(1, MOCK_DATA.features.length)),
        'description': getRandomText(MOCK_DATA.descriptionTexts, i),
        'photos': MOCK_DATA.photos.slice(0, getRandomNumber(1, MOCK_DATA.photos.length))
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

var generateMapPinElements = function (pinObjectsArray) {
  var pinElements = [];
  var pinTemplate = document.querySelector('#pin');

  for (var i = 0; i < pinObjectsArray.length; i++) {
    var pinClone = document.importNode(pinTemplate.content, true);
    var pinButton = pinClone.querySelector('button');
    var pinImage = pinClone.querySelector('img');

    pinButton.style.left = pinObjectsArray[i].location.x + 'px';
    pinButton.style.top = pinObjectsArray[i].location.y + 'px';

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

activateMap();
renderMapPinElements(generateMapPinElements(generateData()));
