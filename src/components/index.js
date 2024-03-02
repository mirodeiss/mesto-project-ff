// style css
import '../index.css';

// card and modal
import { deleteCard } from './card';
import { createCard } from './card';
import { openModal } from './modal';
import { closePopup } from './modal';
import { handleOverlayClose } from './modal';
import { updateLikeStatus } from './card';

// validation 
import { enableValidation } from './validation';
import { clearValidation } from './validation';
import { clearInputValue } from './modal';

// api 
import * as api from './api.js'


// @DOM 
const cardsContainer = document.querySelector('.places__list');
// buttons
const editPopupButton = document.querySelector('.profile__edit-button');
const newItemPopupButton = document.querySelector('.profile__add-button');
const changeAvatarButton = document.querySelector('.popup__button_avatar');

const deleteCardButton = document.querySelector('.popup_type_delete__button');
const saveButtonPopup = document.querySelector('.popup__button');
// input
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const newAvatarInput = document.getElementById('avatar-input');
// popup
const popupElements = document.querySelectorAll('.popup');
const newItemPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const deletePopup = document.querySelector('.popup_type_delete');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const showErrorPopup = document.querySelector('.popup_type_show_warning')
// profile info 
const nameField = document.querySelector('.profile__title');
const jobField = document.querySelector('.profile__description');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');
// form
const editProfileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const imageDescription = imagePopup.querySelector('.popup__caption');


// config settings 
const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// переменная для выбранной карточки
let selectedCard = null;
let userId = null;


// замена аватара профиля

async function handleFormAvatarSubmit(evt) {
    evt.preventDefault();
    try {
      changeAvatarButton.textContent = 'Сохранение...';
      const newAvatar = await api.edditAvatar(newAvatarInput.value);
      profileAvatar.style.backgroundImage = `url(${newAvatar.avatar})`;
      closePopup(avatarPopup);
    } catch (error) {
      console.log(error);
      
    } 
  }
  
  changeAvatarButton.addEventListener('click', handleFormAvatarSubmit);
  

// функция создания новой карточки
async function handleNewCardSubmit(evt) {
    evt.preventDefault();
    saveButtonPopup.textContent = 'Сохранение...';
    try {
        const dataBody = {
            name: newCardNameInput.value,
            link: newCardLinkInput.value
        };
        const newCard = await api.addCard(dataBody);
        const cardElement = createCard(newCard, cardClickDeleteHandler, buttonLikeClickHandler, openImageCard, userId);
        renderCard(cardElement);
        closePopup(newItemPopup);

        evt.target.reset();
    } catch (error) {
        console.log(error);
    }
}

newCardForm.addEventListener('submit', handleNewCardSubmit);


// функция редактирование профиля
async function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    saveButtonPopup.textContent = 'Сохранение...';
    try {
        const jobInputValue = jobInput.value;
        const nameInputValue = nameInput.value;


        // Отправляем запрос на редактирование профиля
        await api.edditProfile({
            name: nameInputValue,
            about: jobInputValue,

        });

        // Обновляем отображаемые данные на странице
        nameField.textContent = nameInputValue;
        jobField.textContent = jobInputValue;

        // Закрываем popup
        closePopup(editPopup);
    } catch (error) {
        console.error('Ошибка при редактировании профиля:', error);
    }
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


// функция открытия картинки 
function openImageCard(data) {
    imagePopupPhoto.src = data.link;
    imagePopupPhoto.alt = data.name;
    imageDescription.textContent = data.name;

    openModal(imagePopup)
}


// слушатель попап редактирования
editPopupButton.addEventListener('click', function () {

    openModal(editPopup);

    // значения инпутов при открытие попапа
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    // очистка ошибок
    clearValidation(editProfileForm, configForm);
});

//  слушатель попап добавления
newItemPopupButton.addEventListener('click', function () {
    // очистка значений если пользователь вышел и не сохранил
    clearInputValue(newCardNameInput, newCardLinkInput)
    // очистка ошибок
    clearValidation(newCardForm, configForm);

    openModal(newItemPopup);
});

popupElements.forEach((popup) => {
    popup.addEventListener('click', handleOverlayClose);
});

//слушатель редактирования аватара
profileAvatar.addEventListener('click', () => {
    openModal(avatarPopup)
})



// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}


const cardClickDeleteHandler = cardData => {
    selectedCard = cardData;
    openModal(deletePopup)
}


const buttonDeleteClickHandler = async () => {
    try {
        await api.deleteCard(selectedCard.id);
        deleteCard(selectedCard.node);
        closePopup(deletePopup)
    } catch (error) {
        closePopup(deletePopup)
        openModal(showErrorPopup)
    }
}

deleteCardButton.addEventListener('click', buttonDeleteClickHandler)


// like api 
const buttonLikeClickHandler = async ({ id: cardId, isLiked, node }) => {
    try {
        const newCard = await api.changeLikeStatus(cardId, isLiked)
        updateLikeStatus(node, newCard.likes, !isLiked);
    } catch (error) {
        console.log(error);
    }
}


// функция получение данных пользователя
async function loadUserInfo() {
    try {
        const userInfo = await api.getUserInfo();
        // класдем информацию о пользователе 
        userId = userInfo._id

        // свойства name, about и avatar в соответствующих элементах шапки страницы
        nameField.textContent = userInfo.name;
        jobField.textContent = userInfo.about;

        const avatarElement = document.querySelector('.profile__image');
        avatarElement.style.backgroundImage = `url(${userInfo.avatar})`;
    } catch (error) {
        console.log('Ошибка при загрузке информации о пользователе:', error);
    }
}


// Вывести первоначальные карточки на страницу
async function renderinitialCards() {
    try {
        const dataCards = await api.getAllCards();
        dataCards.forEach((item) => {
            const cardElement = createCard(item, cardClickDeleteHandler, buttonLikeClickHandler, openImageCard, userId);
            renderCard(cardElement);
        });
    } catch (error) {
        console.log(error)
    }

}


// Вызываем функцию загрузки информации о пользователе при загрузке страницы
loadUserInfo();
// рендер каточек вызов функции
renderinitialCards();

// validation
enableValidation(configForm); 
