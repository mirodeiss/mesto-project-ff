
// функция like 
export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}
// удаление карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}
// Функция создания карточки

export function createCard(cardValue, cardClickDeleteHandler, likeCard, openImageCard) {
    // Темплейт карточки
    const cardTemplate = document.querySelector('#card-template');

    // Клонируем содержимое этого темплейта
    const templateContent = cardTemplate.content.cloneNode(true).querySelector('.places__item');

    // Содержимое темплейта
    templateContent.querySelector('.card__image').src = cardValue.link;
    templateContent.querySelector('.card__image').alt = cardValue.name;
    templateContent.querySelector('.card__title').textContent = cardValue.name;

    const deleteButton = templateContent.querySelector('.card__delete-button');
    const likeButton = templateContent.querySelector('.card__like-button');
    const imageItem = templateContent.querySelector('.card__image')

    //  слушатель на кнопку удаления
    deleteButton.addEventListener('click', () => {
          cardClickDeleteHandler({id: cardValue._id, node: templateContent})
        });
      
    // слушатель на кнопку лайка
    likeButton.addEventListener('click', (event) => {
        const clickedLikeButton = event.currentTarget;
        likeCard(clickedLikeButton);
    });

    // открытие фото 
    imageItem.addEventListener('click', () => {
        openImageCard(cardValue)
    })

    return templateContent;


}