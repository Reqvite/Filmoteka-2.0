import { refs } from "../refs";

refs.headerNavbar.addEventListener('click', handleNavbarClick)

function ckechUserLanguage() {
    if (localStorage.getItem('language') === 'uk-ua') {
        refs.languageBtnText.textContent = 'Uk';
        refs.languageListItem.textContent = 'English'
    }
    if (localStorage.getItem('language') === 'en-Us') {
        refs.languageListItem.textContent = 'Ukraine'
        refs.languageBtnText.textContent = 'En'
    }
}

ckechUserLanguage()

function handleNavbarClick(e) {
    refs.languageBtn.addEventListener('mouseleave', checkMouseLeave)
    refs.languageList.addEventListener('click', handleLanguageList)

    if (e.target.closest('li').classList.contains('navbar__item-language')) {
        refs.languageList.classList.toggle('active')
    }
 
}


function checkMouseLeave(e) {
     if (e.target.nodeName) {
         refs.languageList.classList.toggle('active')
         refs.languageBtn.removeEventListener('mouseleave', checkMouseLeave)
        }
}

function handleLanguageList(e) {
    if (e.target.textContent === 'Ukraine') {
        localStorage.setItem('language', 'uk-ua');
        window.location.href = '/';
    } 
    if(e.target.textContent === 'English') {
        localStorage.setItem('language', 'en-Us');
        window.location.href = '/';
    }
}
