export function toggleActiveLikeClass(likeButton, isLiked){
    if(isLiked){
        likeButton.classList.add('card__like-button_is-active');
    }else{
        likeButton.classList.remove('card__like-button_is-active');
    }
}

// функция like 
export function updateLikeStatus(cardElement,likes, isLiked) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounterText = cardElement.querySelector('.card__like-counter');
    toggleActiveLikeClass(likeButton, isLiked)
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
    updateLikeStatus(templateContent,cardValue.likes, isLiked)

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
        const isLiked = likeButton.classList.contains('card__like-button_is-active')
        cardLikekHandler({id:cardValue._id, isLiked, node: templateContent})
    });

    // открытие фото 
    imageItem.addEventListener('click', () => {
        openImageCard(cardValue)
    })

    return templateContent;


}