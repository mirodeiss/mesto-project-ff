// modal.js

export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscPopup);
}

export function closePopup(popupElement) {
    // Убираем класс, отвечающий за открытие попапа

    popupElement.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeEscPopup);
}

//закрытие escape
export function closeEscPopup(e) { 
    if(e.key === 'Escape') { 
     const popup = document.querySelector('.popup_is-opened')
     closePopup(popup) 
    } 
   } 
export function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

// очистка значения
export function clearInputValue(inputs){
    inputs.value = ''
}
