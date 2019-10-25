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
var POPUP_PHOTO_WIDTH = 45;
var POPUP_PHOTO_HEIGHT = 40;

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
  var pinTemplateElement = document.querySelector('#pin');

  pinObjectsArray.forEach(function (pinObject) {
    var pinCloneElement = document.importNode(pinTemplateElement.content, true);
    var pinButtonElement = pinCloneElement.querySelector('button');
    var pinImageElement = pinCloneElement.querySelector('img');

    pinButtonElement.style.left = pinObject.location.x + 'px';
    pinButtonElement.style.top = pinObject.location.y + 'px';

    pinImageElement.src = pinObject.author.avatar;
    pinImageElement.alt = pinObject.offer.title;

    pinElements.push(pinCloneElement);
  });

  return pinElements;
};

var renderMapPinElements = function (pinElementsArray) {
  var mapPinsElement = document.querySelector('.map__pins');
  var pinsFragmentElement = document.createDocumentFragment();

  pinElementsArray.forEach(function (pinElement) {
    pinsFragmentElement.appendChild(pinElement);
  });

  mapPinsElement.appendChild(pinsFragmentElement);
};

var getOfferType = function (value) {
  switch (value) {
    case 'flat':
      var newValue = 'Квартира';
      break;
    case 'bungalo':
      newValue = 'Бунгало';
      break;
    case 'house':
      newValue = 'Дом';
      break;
    case 'palace':
      newValue = 'Дворец';
      break;
  }
  return newValue;
};

var generateCardElement = function (ad) {
  var cardTemplateElement = document.querySelector('#card');
  var cardCloneElement = document.importNode(cardTemplateElement.content, true);
  var popupFeaturesElement = cardCloneElement.querySelector('.popup__features');
  var popupPhotosElement = cardCloneElement.querySelector('.popup__photos');

  cardCloneElement.querySelector('.popup__avatar').src = ad.author.avatar;
  cardCloneElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardCloneElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardCloneElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardCloneElement.querySelector('.popup__type').textContent = getOfferType(ad.offer.type);
  cardCloneElement.querySelector('.popup__description ').textContent = ad.offer.description;
  cardCloneElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardCloneElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  popupFeaturesElement.innerHTML = '';
  for (var i = 0; i < ad.offer.features.length; i++) {
    var featuresItemElement = document.createElement('li');

    featuresItemElement.classList.add('popup__feature', 'popup__feature--' + ad.offer.features[i]);
    popupFeaturesElement.appendChild(featuresItemElement);
  }

  popupPhotosElement.innerHTML = '';
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var popupImageElement = document.createElement('img');

    popupImageElement.classList.add('popup__photo');
    popupImageElement.src = ad.offer.photos[j];
    popupImageElement.alt = ad.offer.title;
    popupImageElement.width = POPUP_PHOTO_WIDTH;
    popupImageElement.height = POPUP_PHOTO_HEIGHT;
    popupPhotosElement.appendChild(popupImageElement);
  }

  return cardCloneElement;
};

activateMap();

var generatedData = generateData();

renderMapPinElements(generateMapPinElements(generatedData));

var testCardElement = generateCardElement(generatedData[0]);
var mapElement = document.querySelector('.map');
var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

mapElement.insertBefore(testCardElement, mapFiltersContainerElement);
