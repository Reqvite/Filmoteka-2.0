import { refs } from "../refs";



refs.mainContainer.addEventListener('click', e => {
   
    if (!e.target?.closest('li')?.hasAttribute('data-name')) {
        return;
    } else {
        if (e.target.closest('li').dataset.name === 'actor') {
            console.log('renderactor')
        }
        if (e.target.closest('li').dataset.name === 'film') {
            console.log('renderfilm')
        }
    }
})