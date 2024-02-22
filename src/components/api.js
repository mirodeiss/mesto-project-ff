// данные для переиспользования - адрес сервера / токен
const config = {
    url: `https://nomoreparties.co/v1/cohort-magistr-2`,
    headers: {
        'Content-type': 'application/json',
        'Authorization': '485cc8b5-4513-41c7-a9ed-1bc0b758c6d8'
    },

}

// проверка все ли ок или не ок
function onResponse(res) {
    return res.ok
        ? res.json()
        : res.json().then(err => Promise.reject(err))
}



// функция запроса
async function request(endpoint, options = {}) {
    const res = await fetch(`${config.url}/${endpoint}`, {
        method: 'GET',
        headers: config.headers,
        ...options,
    });
    return onResponse(res);
}

// функция получения карточек с сервера
export function getAllCards() {
    return request('cards');
}

// добавление карточки на сайт
export function addCard(dataBody) {
    return request('cards', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    });
}

// информация о пользователе 
export function getUserInfo() {
    return request('users/me')
}


// // редактирование аватара
export function edditProfile(dataBody) {
    return request('users/me', {
        method: 'PATCH',
        body: JSON.stringify(dataBody),
    });
}
// // редактирование аватара
export function edditAvatar(avatar) {
    return request('users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({avatar: avatar}),
    });
}

// // лайк
export function changeLikeStatus(cardId, isLike) {
    return request(`cards/${cardId}/likes`, {
        method: isLike ? 'DELETE' : 'PUT' ,
    });
}
// удаление карточки
export function deleteCard(cardId) {
    return request(`cards/${cardId}`, {
        method: 'DELETE',
    });
}




