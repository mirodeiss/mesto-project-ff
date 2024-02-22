
// функция like 
export function updateLikeStatus(cardElement,userId, likes) {
    const isLiked = likes?.some(user => user._id === userId)
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounterText = cardElement.querySelector('.card__like-counter');
    if(isLiked){
        likeButton.classList.add('card__like-button_is-active');
    }else{
        likeButton.classList.remove('card__like-button_is-active');
    }
    likeCounterText.textContent = likes.length;
}
// удаление карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}
// Функция создания карточки

export function createCard(cardValue, cardClickDeleteHandler, cardLikekHandler, openImageCard, userId) {

    const isLiked = cardValue.likes?.some(user => user._id === userId)


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

    // like 
      updateLikeStatus(templateContent, userId, cardValue.likes)

    if(userId !== cardValue.owner._id){
       deleteButton.remove()
    } else {
        //  слушатель на кнопку удаления
    deleteButton.addEventListener('click', () => {
        cardClickDeleteHandler({id: cardValue._id, node: templateContent})
      });
    }
      
    // слушатель на кнопку лайка
    likeButton.addEventListener('click', () => {
        cardLikekHandler({id:cardValue._id, likes: cardValue.likes, node: templateContent})
    });

    // открытие фото 
    imageItem.addEventListener('click', () => {
        openImageCard(cardValue)
    })

    return templateContent;


}