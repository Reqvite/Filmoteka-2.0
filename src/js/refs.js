export const refs = {
    body: document.querySelector('body'),

    //header
    headerNavbar: document.querySelector('.navbar__list'),
    watchListBtn: document.querySelector('.navbar__item-watchlist'),
    signInBtn: document.querySelector('.navbar__item-sign-in'),
    accountBtn: document.querySelector('.navbar__item-account'),
    searchForm: document.querySelector('.header__form'),
    

    languageBtn: document.querySelector('.navbar__item-language'),
    languageBtnText: document.querySelector('.navbar__btn-language'),
    languageList: document.querySelector('.language-list'),
    languageListItem:document.querySelector('.language-list__item'),

    //main section
    mainContainer: document.querySelector('main'),

    sliderWrapper: document.querySelector('.slider-main'),
    mainSliderList: document.querySelector('.swiper-wrapper'),
    popularFilmList: document.querySelector('.popular-list'),

    titleMain: document.querySelector('.popular-box__title'),
    
    //modal
    backdropModal: document.querySelector('.backdrop'),
    modal: document.querySelector('.modal-content'),

    //pagination
    paginationList: document.querySelector('.pagination-list'),
    paginationArrowBackward: document.querySelector('.pagination-list__arrow-backward'),



    //registration
    registrationForm: document.querySelector('.registration-form'),
    clickRegistrationBtn: document.querySelector('.registration-box__link-registration'),
    nameInput: document.querySelector('.registration-form__name-label'),
    notRegisteredText: document.querySelector('.registration-box__not-registered'),
    forgotPasswordLink : document.querySelector('.registration-form__forgot-password'),
    submitBtn: document.querySelector('.registration-form__submit-btn'),
    logOutBtn: document.querySelector('.navbar__item-log-out'),
    registationModal: document.querySelector('.registration-backdrop'),
}