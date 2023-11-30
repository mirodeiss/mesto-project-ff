// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardValue, deleteCard,likeCard,likeCard) {
    // Темплейт карточки
    const cardTemplate = document.querySelector('#card-template');

    // Клонируем содержимое этого темплейта
    const templateContent = cardTemplate.content.cloneNode(true).querySelector('.places__item');

    // Содержимое темплейта
    templateContent.querySelector('.card__image').src = cardValue.link;
    templateContent.querySelector('.card__image').alt = cardValue.name;
    templateContent.querySelector('.card__title').textContent = cardValue.name;

    //  слушатель на кнопку удаления
    const deleteButton = templateContent.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCard(templateContent);
    })
    
    return templateContent;

    
}


// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

// Вывести первоначальные карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
    renderCard(cardElement);
});



// task 2 

// функция открытие попапа 
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
}

// событие открытия попапа 
const editPopupButton = document.querySelector('.profile__edit-button')
const newItemPopupButton = document.querySelector('.profile__add-button')
const imageItem = document.querySelector('.card__image')


// попап редактирования
editPopupButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup_type_edit')
    openModal(editPopup);
});
//   попап добавления
newItemPopupButton.addEventListener('click', function () {
    const newItemPopup = document.querySelector('.popup_type_new-card')
    openModal(newItemPopup);
});


imageItem.addEventListener('click',function () {
    const imageItemPopup = document.querySelector('.popup_type_image')
    openModal(imageItemPopup)
}) 



// функция like 

function likeCard (evt){
    evt.target.classList.contains('card__like-button');
  
    if (evt.target.classList.contains('card__like-button')) {
      // Добавляет или удаляет класс в зависимости от его наличия
      evt.target.classList.toggle('card__like-button_is-active');
    }
  }

  // обработчик
  cardsContainer.addEventListener('click', function(element){
    likeCard(element)
  })
