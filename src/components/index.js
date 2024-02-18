import '../index.css';


import { deleteCard } from './card';
import { createCard } from './card';
import { openModal } from './modal';
import { closePopup } from './modal';
import { handleOverlayClose } from './modal';
import { likeCard } from './card';

import { enableValidation } from './validation';
import { clearValidation } from './validation';

import { clearInputValue } from './modal';

import * as api from './api.js'


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
const editPopup = document.querySelector('.popup_type_edit');
const edditAvatarButton = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const editProfileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__caption')

const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


async function loadUserInfo() {
    try {
      const userInfo = await api.getUserInfo();
      
      // свойства name, about и avatar в соответствующих элементах шапки страницы
      nameField.textContent = userInfo.name;
      jobField.textContent = userInfo.about;
  
      const avatarElement = document.querySelector('.profile__image');
      avatarElement.src = userInfo.avatar;
    } catch (error) {
      console.log('Ошибка при загрузке информации о пользователе:', error);
    }
  }
  
  // Вызываем функцию загрузки информации о пользователе при загрузке страницы
  loadUserInfo();
  


// функция создания новой карточки
async function handleNewCardSubmit(evt) {
    evt.preventDefault();

    try {
        const dataBody = {
            name: newCardNameInput.value,
            link: newCardLinkInput.value
        };
        const newCard = await api.addCard(dataBody);
        const cardElement = createCard(newCard, deleteCard, likeCard, openImageCard);
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
  
    try {
      const jobInputValue = jobInput.value;
      const nameInputValue = nameInput.value;
  
      // Отправляем запрос на редактирование профиля
      await api.edditProfile({
        name: nameInputValue,
        about: jobInputValue
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
edditAvatarButton.addEventListener('click', ()=>{
    openModal(avatarPopup)
})



// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

// Вывести первоначальные карточки на страницу

async function renderinitialCards(){
    try {
        const dataCards = await  api.getAllCards();
        dataCards.forEach((item) => {
            const cardElement = createCard(item, deleteCard, likeCard, openImageCard);
            renderCard(cardElement);
        }); 
    } catch (error) {
        console.log(error)
    }
    
}
renderinitialCards();

// validation
enableValidation(configForm); 
