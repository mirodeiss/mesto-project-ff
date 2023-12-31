import '../index.css';

import { initialCards } from './cards';
import { deleteCard } from './card';
import { createCard } from './card';
import { openModal } from './modal';
import { closePopup } from './modal';
import { handleOverlayClose } from './modal';
import { likeCard } from './card';

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
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__caption')



// функция создания новой карточки 
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value
    }
    const cardElement = createCard(newCard, deleteCard, likeCard, openImageCard);
    renderCard(cardElement);
    closePopup(newItemPopup);

    evt.target.reset();
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

// функция редактирование профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;

    nameField.textContent = nameInputValue;
    jobField.textContent = jobInputValue;

    // close popup
    closePopup(editPopup)
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// функция открытия картинки 
function openImageCard(data) {
    imagePopupPhoto.src = data.link;
    imagePopupPhoto.alt = data.name;
    imageDescription.textContent = data.name;

    openModal(imagePopup)
}


// попап редактирования
editPopupButton.addEventListener('click', function () {
    openModal(editPopup);

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



