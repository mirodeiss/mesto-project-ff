// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки
function createCard(cardValue) {
    // Темплейт карточки
    const cardTemplate = document.querySelector('#card-template')
    // клонируем содержимое этого темплейта 
    const teplateContent = cardTemplate.content.cloneNode(true).querySelector('.places__item');
    // содержимое темплейта
    teplateContent.querySelector('.card__image').src = cardValue.link
    teplateContent.querySelector('.card__image').alt = cardValue.name
    teplateContent.querySelector('.card__title').textContent = cardValue.name

    cardsContainer.append(teplateContent)
    return teplateContent
}
// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item)
    deleteCard(cardElement)
})
