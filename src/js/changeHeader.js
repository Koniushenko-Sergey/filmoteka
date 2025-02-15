import home from '../partials/templates/home.hbs';
import myLibrary from '../partials/templates/myLibrary.hbs';
import { addClass, removeClass } from './classWork';
import { loadListnersForHome, removeListnersForHome, loadListnersForMyLibrary, removeListnersForMyLibrary } from "./onLoad"
import { getRefs } from './refs';



export const changeHeader = (pageName, target) => {
    target.innerHTML = home() + myLibrary(); //добавляю контент, чтоб получить отсутствующие рефы
    const refs = getRefs();

    if (pageName === 'HOME') {
        removeListnersForMyLibrary(refs)
        removeListnersForHome(refs);
        target.innerHTML = home(); //меняю шапку
        
        const newRefs = getRefs();
        loadListnersForHome(newRefs);
        addClass(newRefs.headerContainer, 'home');
        addClass(newRefs.headerNav.children[0].children[0], 'current');
        removeClass(newRefs.headerContainer, 'my-library');
        removeClass(newRefs.headerNav.children[1].children[0], 'current');
    };
    
    if (pageName === 'MY LIBRARY') {
        removeListnersForHome(refs);
        target.innerHTML = myLibrary(); //меняю шапку
        
        const newRefs = getRefs();
        loadListnersForMyLibrary(newRefs);
        addClass(newRefs.headerContainer, 'my-library');
        addClass(newRefs.headerNav.children[1].children[0], 'current');
        removeClass(newRefs.headerContainer, 'home');
        removeClass(newRefs.headerNav.children[0].children[0], 'current');
    };
    console.log('Переключаем шапку на ' + pageName);
}