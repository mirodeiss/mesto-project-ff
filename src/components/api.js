// данные для переиспользования - адрес сервера / токен
const config = {
    url: `https://nomoreparties.co/v1/cohort-magistr-2`,
    headers: {'Content-type': 'application/json',
    'Authorization': '485cc8b5-4513-41c7-a9ed-1bc0b758c6d8'},

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

// добавление карточек на сайт
export function addCard(dataBody) {
    return request('cards', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    });
}



