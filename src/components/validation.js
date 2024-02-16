// функция ошибки
function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}
// функция удаления ошибки
function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}
// проверка ввода
function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

    if (isInputValid) {
        hideError(inputElement, errorElement, config);
    } else {
        showError(inputElement, errorElement, config);
    }
}
// функция актиной кнопки
function toggleButtonState(buttonElement, isActive, config) {
    if (isActive) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = 'disabled';
    }
}
// слушатель принимающий валидацию
function setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    [...inputList].forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        });
    });

    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}
// функция валидации
export function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);

    [...formsList].forEach(function (formElement) {
        setEventListener(formElement, config);
        
        clearValidation(formElement, config);
    });
}
// функция очистки ошибок
export function clearValidation(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach(function (inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        hideError(inputElement, errorElement, config);
    });

    toggleButtonState(submitButtonElement, false, config);
}
