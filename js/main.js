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
var BUNGALO_ROOMS_COUNT = 1;
var FLAT_ROOMS_COUNT = 2;
var HOUSE_ROOMS_COUNT = 3;
var PALACE_ROOMS_COUNT = 100;
var BUNGALO_GUESTS_CAPACITY = 1;
var FLAT_GUESTS_CAPACITY = 2;
var HOUSE_GUESTS_CAPACITY = 3;
var PALACE_GUESTS_CAPACITY = 0;
var ENTER_KEY_CODE = 13;

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

var generateData = function (count) {
  var dataArray = [];

  for (var i = 0; i < count; i++) {
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

var isAppActive = false;
var mapElement = document.querySelector('.map');
var adFormElement = document.querySelector('.ad-form');
var mapFiltersElement = document.querySelector('.map__filters');
var adFormFieldsets = adFormElement.querySelectorAll('fieldset');
var mainMapPinElement = document.querySelector('.map__pin--main');
var addressInputElement = document.querySelector('#address');
var roomNumberSelectElement = document.querySelector('#room_number');
var capacitySelectElement = document.querySelector('#capacity');

var activateApp = function () {
  isAppActive = true;
  setMainMapPinAddress();
  mapElement.classList.remove('map--faded');

  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('ad-form--disabled');
  renderMapPinElements(generateMapPinElements(generateData(8)));

  adFormFieldsets.forEach(function (adFormFieldsetsItem) {
    adFormFieldsetsItem.disabled = false;
  });
};

var deactivateApp = function () {
  isAppActive = false;
  setMainMapPinAddress();
  mapElement.classList.add('map--faded');
  adFormElement.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('ad-form--disabled');

  adFormFieldsets.forEach(function (adFormFieldsetsItem) {
    adFormFieldsetsItem.disabled = true;
  });
};

var setMainMapPinAddress = function () {
  var mainMapPinPosition;
  if (isAppActive) {
    mainMapPinPosition = Math.round((mainMapPinElement.offsetLeft + PIN_WIDTH / 2)) + ', ' + (Math.round(mainMapPinElement.offsetTop) + PIN_HEIGHT);
  } else {
    mainMapPinPosition = Math.round(mainMapPinElement.offsetLeft) + ', ' + Math.round(mainMapPinElement.offsetTop);
  }
  addressInputElement.value = mainMapPinPosition;
};

document.addEventListener('DOMContentLoaded', function () {
  deactivateApp();
});

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

var getFeatureElementAsString = function (featureClass) {
  return '<li class="popup__feature popup__feature--' + featureClass + '"></li>';
};

var getPopupPhotoElementAsString = function (photoSource) {
  return '<img class="popup__photo" src="' + photoSource + '" width="' + POPUP_PHOTO_WIDTH + '" height="' + POPUP_PHOTO_HEIGHT + '" alt="Фотография жилья">';
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
  popupFeaturesElement.insertAdjacentHTML('afterbegin', ad.offer.features.map(getFeatureElementAsString).join(' '));

  popupPhotosElement.innerHTML = '';
  popupPhotosElement.insertAdjacentHTML('afterbegin', ad.offer.photos.map(getPopupPhotoElementAsString).join(' '));

  return cardCloneElement;
};

var mapFiltersContainerElement = document.querySelector('.map__filters-container');
var cardElement = generateCardElement(generateData(1)[0]);
mapElement.insertBefore(cardElement, mapFiltersContainerElement);

mainMapPinElement.addEventListener('mousedown', function () {
  if (isAppActive === false) {
    activateApp();
  }
});

mainMapPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE && isAppActive === false) {
    activateApp();
  }
});

var checkForRoomTypeComplianceForGuests = function () {
  var roomNumberCount = parseInt(roomNumberSelectElement.value, 10);
  var capacity = parseInt(capacitySelectElement.value, 10);

  if (roomNumberCount === BUNGALO_ROOMS_COUNT && capacity !== BUNGALO_GUESTS_CAPACITY) {
    capacitySelectElement.setCustomValidity('1 room = 1 guest');
  } else if (roomNumberCount === FLAT_ROOMS_COUNT && (capacity === PALACE_GUESTS_CAPACITY && capacity > FLAT_GUESTS_CAPACITY)) {
    capacitySelectElement.setCustomValidity('2 rooms = < 2 guests');
  } else if (roomNumberCount === HOUSE_ROOMS_COUNT && (capacity === PALACE_GUESTS_CAPACITY && capacity > HOUSE_GUESTS_CAPACITY)) {
    capacitySelectElement.setCustomValidity('3 rooms = < 3 guests');
  } else if (roomNumberCount === PALACE_ROOMS_COUNT && capacity !== PALACE_GUESTS_CAPACITY) {
    capacitySelectElement.setCustomValidity('No guests allowed');
  } else {
    capacitySelectElement.setCustomValidity('');
  }
};

roomNumberSelectElement.addEventListener('change', function () {
  checkForRoomTypeComplianceForGuests();
});

capacitySelectElement.addEventListener('change', function () {
  checkForRoomTypeComplianceForGuests();
});
