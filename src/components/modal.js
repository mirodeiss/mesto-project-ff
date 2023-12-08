// modal.js

export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened', 'popup_is-animated');
}

export function closePopup(popupElement) {
    // Убираем класс, отвечающий за открытие попапа

    popupElement.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', handleEscPress);
}

//закрытие escape
export function handleEscPress(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}
export function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
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

