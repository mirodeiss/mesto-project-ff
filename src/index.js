import './index.css';

import { initialCards } from './components/cards';
import { createCard } from './components/card';
import { handleNewCardSubmit } from './components/modal';
import { deleteCard } from './components/card';
import { openModal } from './components/modal';
import { closePopup } from './components/modal';
import { handleEscPress } from './components/modal';
import { openImageCard } from './components/modal';
import { likeCard } from './components/card';

// @DOM узлы

const cardsContainer = document.querySelector('.places__list');
const editPopupButton = document.querySelector('.profile__edit-button');
const newItemPopupButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupElement = document.querySelectorAll('.popup')
const popupRemoveButton = document.querySelectorAll('.popup__close')
// const formElement = document.querySelector('.popup__form');
const nameField = document.querySelector('.profile__title');
const jobField = document.querySelector('.profile__description');
const newItemPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newItemPopup.querySelector('.popup__form');

newCardForm.addEventListener('submit', handleNewCardSubmit);

// попап редактирования
editPopupButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup_type_edit')
    openModal(editPopup);
    document.addEventListener('keydown', handleEscPress);
    // значения инпутов при открытие попапа

    nameInput.value = nameField.textContent;
    jobInput.value =  jobField.textContent;
});
//   попап добавления
newItemPopupButton.addEventListener('click', function () {
    openModal(newItemPopup);
});

popupRemoveButton.forEach((item) => {
    item.addEventListener('click', function () {
        closePopup([...popupElement]); // Преобразование NodeList в массив
    });
});

// @todo: Вывести карточки на страницу

function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

// Вывести первоначальные карточки на страницу

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, likeCard, openImageCard);
    renderCard(cardElement);
});



