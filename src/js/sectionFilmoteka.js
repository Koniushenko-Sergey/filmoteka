import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import localStorageApi from './localStoragе';

import { fetchGetMovieById } from './getContent';
import modalFilmCardTpl from '../partials/templates/modalFilmCard.hbs';

// import * as parseApiData from './parseApiData';
import { getGenres, checkPoster, trimYear } from './parseApiData';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);
let currentItem = null;

// const body = document.querySelector('body');
refs.modalWatchedBtn.addEventListener('click', addFilmInterface);
// console.log(refs.modalWatchedBtn);

export const onFilmClick = e => {
  // body.style.overflow = 'hidden';

  const targetCard = e.target.parentNode.parentNode;
  // console.dir(e.target);
  // console.log('currentTarget: ', e.currentTarget);
  // console.log('Target: ', e.target);
  const targetCardId = targetCard.dataset.id;
  if (targetCard.className === 'film') {
    // проверка на клик (нужно тестить. может нужно менять)
    // 1 тут получить id фильма
    instance.show(() => {
      // берет данные по фильмам из временного хранилища и парсит их в переменную
      const currentArray = JSON.parse(localStorage.getItem('tempQuery'));
      // находит объект по айди, проверка на наличие фильма в временном хранилище
      currentItem = currentArray.find(currentItem => currentItem.id === Number(targetCardId));

      if (currentItem !== undefined) {
        renderFilmCard(currentItem);
        return;
      }

      fetchGetMovieById(targetCardId).then(data => {
        const genre_ids = data.genres.map(genre => genre.id);

        currentItem = {
          backdrop_path: data['backdrop_path'],
          id: data['id'],
          original_title: data['original_title'],
          overview: data['overview'],
          popularity: data['popularity'],
          poster_path: checkPoster(data['poster_path'], data['backdrop_path']),
          release_date: data['release_date'],
          title: data['title'],
          vote_average: data['vote_average'],
          vote_count: data['vote_count'],
          genres: getGenres(genre_ids),
          year: trimYear(data['release_date']),
        };
        renderFilmCard(currentItem);
        return;
      });

    });

    // обработка клика по esc
    loadEscListner(instance);

    refs.modalFilmCloseBtn.addEventListener('click', e => {
      e.preventDefault;
      onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
    });
  }
};

const onFilmCloseClick = () => {
  // body.style.overflow = '';

  instance.close();
};

function addFilmInterface() {
  // добавляет в 'watched';

  localStorageApi.addMovie('watched', currentItem);
}

function renderFilmCard(filmCard) {
  refs.modalCard.innerHTML = modalFilmCardTpl(filmCard);
}
