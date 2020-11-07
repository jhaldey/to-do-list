//card;
const card = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.places-list');

const newForm = document.querySelector('.popup__form');


// buttons;
const newCardButton = document.querySelector('.user-info__button');
const deleteButton = document.querySelector('.place-card__delete-icon'); //inactive
const likeButton = document.querySelector('.place-card__like-icon'); //inactive
const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.user-info__edit-button');
const submitButton = document.querySelector('.popup__button'); // form button
const allSubmitButtons = document.querySelectorAll('.popup__button')

// popups;
const allPopups = document.querySelectorAll('.popup'); // inactive
const newCardPopup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_edit');
const imagePopup = document.querySelector('.image-popup');

// profile;
const userName = document.querySelector('.user-info__name');
const occupation = document.querySelector('.user-info__job');

// forms;
const editForm = document.querySelector('form[name="edit"]');
const allForms = document.querySelectorAll('.popup__form');


// functions 
// отрисовывает начальный пак с карточками;
function renderStartPack() {
    initialCards.forEach(function (item) {

      appendElement(cardsContainer, item);

    });
}

// отрисовывает карточку 
function createCard(item) {
  const element = card.cloneNode(true);

  /* REVIEW: Можно лучше:

  Вынести element.querySelector('.place-card__name') и element.querySelector('.place-card__image') в константы,
  назвать, например: cardElement и cardImage
  */
  
  element.querySelector('.place-card__name').innerText = item.name;
  element.querySelector('.place-card__image').style.backgroundImage = `url(${item.link})`;

  /* REVIEW: Можно лучше:
  
  До вставки в разметку добавлять слушатели событий, например:

  likeButton.addEventListener('click', likeCard);

  Также для клика клика по кнопке "delete" и открытия карточки
  */
  return element;
}

// добавляет ее;
function appendElement(placeToAdd, elementToAdd) {

  placeToAdd.appendChild(createCard(elementToAdd) );

}

// добавляет карту пользователя;
function addNewCard(event) {
  event.preventDefault();

  /* REVIEW: Можно лучше:

  Сразу создать объект с полями name и link и передать туда значения name.value и link.value, вместо того, чтобы
  создавать пустой объект и потом добавлять туда значения
  */
  const cardObj = {};
  const name = newForm.elements.name;
  const link = newForm.elements.link;

  cardObj.name = name.value;
  cardObj.link = link.value;

  appendElement(cardsContainer, cardObj);

  newForm.reset();
  toggleForm(newCardPopup);

}

// редактирует профиль;
function editProfile(event) {
  event.preventDefault();

  const name = editForm.elements.name;
  const about = editForm.elements.about;

  userName.innerText = name.value;
  occupation.innerText = about.value;

  toggleForm(editPopup);

}

// проверка input;
function inputHandler(event) {

  const name = event.currentTarget.elements.name;
  const link = event.currentTarget.elements.link;
  const about = event.currentTarget.elements.about;

  function deactivateButton() {
    allSubmitButtons.forEach(item => item.setAttribute('disabled', 'disabled'));
    allSubmitButtons.forEach(item => item.classList.add('popup__button_disabled') );
  }

  function activateButton() {
    allSubmitButtons.forEach( item => item.removeAttribute('disabled', 'disabled'));
    allSubmitButtons.forEach( item => item.classList.remove('popup__button_disabled') );
  }
  
  /* REVIEW: Можно лучше:
  
  Логика валидации для обоеих форм(редактирования профиля и добавляения новой карточки) схожа, можно поразмыслить на том,
  как реорганизовать данные функции избегая повторения кода
  */

  if ( event.target.closest(`form[name="new"]`) ) {

    if (name.value.length === 0 || link.value.length === 0) {
        deactivateButton();
      } else {
        activateButton();
      }

    } else 
    
    if ( event.target.closest(`form[name="edit"]`) ) {

      if (name.value.length === 0 || about.value.length === 0) {
        deactivateButton();
      } else {
        activateButton();
      }
    }
}

// открывает и закрывает формы;
function toggleForm(form) {
  form.classList.toggle('popup_is-opened');
}

// открывает фото;
function popupImage(event) {
  /* REVIEW: Можно лучше:

  Подумать над тем, как можно реализовать открытие большой картинки на мобильных разрешениях, отображая ее в корректном размере,
  т.е чтобы можно было видеть картинку полностью, а не только ее часть. Например вот так: https://imgur.com/a/ZhbFg9Y
  */
  const openImage = document.querySelector('.image-popup__open-image');

  if (event.target.classList.contains('place-card__image') ) {
    imagePopup.classList.toggle('image-popup_active');
    openImage.src = event.target.style.backgroundImage.slice(5, -2);
  }
}

// ставит лайк;
function likeCard(event) {
  if ( event.target.classList.contains('place-card__like-icon') ) {
      event.target.classList.toggle('place-card__like-icon_liked'); 
  }

}
// удаляет карточку;
function deleteCard(event) {
  if ( event.target.classList.contains('place-card__delete-icon') ) {
      event.target.closest('.place-card').remove();
  }
}


// listeners
closeButtons.forEach(item => item.addEventListener('click', function (event) {
  if (event.target.closest('.popup') ) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
  } else {
    event.target.closest('.image-popup').classList.remove('image-popup_active');
  }
}));

newCardButton.addEventListener('click', function() {
  toggleForm(newCardPopup);
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);
});

editButton.addEventListener('click', function() {
  toggleForm(editPopup);

  const name = editForm.elements.name;
  const about = editForm.elements.about;

  name.value = userName.innerText;
  about.value = occupation.innerText;
});

// cardsContainer.addEventListener('click', popupImage);

cardsContainer.addEventListener('click', popupImage);




cardsContainer.addEventListener('click', likeCard);
cardsContainer.addEventListener('click', deleteCard);
allForms.forEach(item => item.addEventListener('input', inputHandler));

newForm.addEventListener('submit', addNewCard);
editForm.addEventListener('submit', editProfile);

renderStartPack();

/* REVIEW: 

В целом по работе:

Все замечания были исправлены, отлично! Работа принята.

Можно лучше: 1) Выносить элементы в константы, где это возможно
2) До вставки в разметку добавлять слушатели событий
3) Сразу создать объект с полями name и link и передать туда значения name.value и link.value, вместо того, чтобы
создавать пустой объект и потом добавлять туда значения (метод addNewCard)
4) Избегать повторения в коде, где возможно 
5) Использовать стрелочные функции (ES6)
6) Реализовать закрытие попапов по клику на Escape/по клику вне попапа
7) Подумать над тем, как можно реализовать открытие большой картинки на мобильных разрешениях, отображая ее в корректном размере
*/
