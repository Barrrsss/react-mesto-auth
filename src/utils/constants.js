//конфиг валидации
export const validationConfig = {
    formSelector: '.popup__fields',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__field_invalid',
    inputErrorClass: 'popup__field-error',
    buttonInvalidClass: 'popup__button_inactive',
};

//идентификация для Api

const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-19/',
    headers: {
        authorization: '34fdcd7c-5eb8-4424-b9a2-100499773e16',
        'Content-Type': 'application/json',
    }
}
export default options;