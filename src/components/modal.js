// modal.js

export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
}

export function closePopup(popupElement) {
    // Убираем класс, отвечающий за открытие попапа
    popupElement.forEach((item) => {
        item.classList.remove('popup_is-opened');
    })
    document.removeEventListener('keydown', handleEscPress);
}

//закрытие escape
export function handleEscPress(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}
function handleOverlayClose(evt) { 
    if (evt.target === evt.currentTarget) { 
      closeModal(evt.currentTarget); 
    } 
  }
export function openImageCard(data) {
    const imageItemPopup = document.querySelector('.popup_type_image');
    const imagePopupElement = imageItemPopup.querySelector('.popup__image');
    const imageDescription = imageItemPopup.querySelector('.popup__caption')
    imagePopupElement.src = data.link;
    imageDescription.textContent = data.name;
    openModal(imageItemPopup)
}

// Обработчик «отправки» формы
export function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const newCardNameInput = document.querySelector('.popup__input_type_card-name');
    const newCardLinkInput = document.querySelector('.popup__input_type_url');
    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value
    };
    const cardElement = createCard(newCard);
    renderCard(cardElement);
    closePopup(newItemPopup);
}
