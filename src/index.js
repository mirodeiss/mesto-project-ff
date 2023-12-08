import './index.css';

import { initialCards } from './components/cards';
import { deleteCard } from './components/card';
import { createCard } from './components/card';
import { openModal } from './components/modal';
import { closePopup } from './components/modal';
import { handleEscPress } from './components/modal';
import { handleOverlayClose } from './components/modal';
import { openImageCard } from './components/modal';
import { likeCard } from './components/card';

// @DOM узлы

const cardsContainer = document.querySelector('.places__list');
const editPopupButton = document.querySelector('.profile__edit-button');
const newItemPopupButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupElements = document.querySelectorAll('.popup')
const nameField = document.querySelector('.profile__title');
const jobField = document.querySelector('.profile__description');
const newItemPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit')
const editProfileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];






// функция создания новой карточки 
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const newCardNameInput = document.querySelector('.popup__input_type_card-name');
    const newCardLinkInput = document.querySelector('.popup__input_type_url');

    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value
    }
    const cardElement = createCard(newCard, deleteCard, likeCard, openImageCard);
    renderCard(cardElement);
    closePopup(newItemPopup);

    newCardNameInput.value = '';
    newCardLinkInput.value = '';
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

// функция редактирование профиля
function handleFormSubmit(evt) {
    evt.preventDefault();

    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;

    nameField.textContent = nameInputValue;
    jobField.textContent = jobInputValue;

    // close popup
    closePopup(editPopup)
}

editProfileForm.addEventListener('submit', handleFormSubmit);

// попап редактирования
editPopupButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup_type_edit')
    openModal(editPopup);
    document.addEventListener('keydown', handleEscPress);

    // значения инпутов при открытие попапа

    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
});
//   попап добавления
newItemPopupButton.addEventListener('click', function () {
    openModal(newItemPopup);
});

popupElements.forEach((popup) => {
    popup.addEventListener('click', handleOverlayClose);
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



