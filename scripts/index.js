// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardValue, deleteCard) {
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
    });

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
