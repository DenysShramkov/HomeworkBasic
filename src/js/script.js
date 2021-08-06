/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	/* document.querySelectorAll('.promo__adv > *').forEach(item => {
		item.remove();
	}); */

	const addBtn = document.querySelector('.add > button'),
		formAdd = document.querySelector('form.add'),
		input = document.querySelector('.adding__input'),
		checked = document.querySelector('#checkbox'),
		genreChange = document.querySelector('.promo__genre');

	const advDelete = () => {
		document.querySelector('.promo__adv').innerHTML = '';
	};

	advDelete();

	const changeElem = (elem, newContent) => {
		elem.innerHTML = newContent;
	};

	changeElem(genreChange, 'Драмма');
	
	const bgChange = document.querySelector('.promo__bg');

	//bgChange.style.cssText = `background-image: url('../img/bg.jpg')`;

	bgChange.style.backgroundImage = `url('../img/bg.jpg')`;

	/* for (let movie of movieDB.movies.sort()) { */

	function movieListForm() {
		let listElement = '';
		movieDB.movies.sort().forEach(function(movie, i){
			listElement += `<li class="promo__interactive-item">${1 + i} ${movie}<div class="delete"></div></li>`;
		});
		document.querySelector('.promo__interactive-list').innerHTML = listElement;
		deleteItem();
	}

	movieListForm();

	//addBtn.addEventListener('click', (e) => {
	//	вариант через препода, однако на нажатие реагирует вся кнопка

	formAdd.addEventListener('submit', (e) => {
		e.preventDefault();
		let val = input.value;
		if (val) { //empty string = false
			if (val.length >= 21) {
				val = val.slice(0, 22) + '...';
			}
			movieDB.movies.push(val);
			movieListForm();
		}
		if (checked.checked) {
			console.log('Добавляем фильм в избранное');
		}
		formAdd.reset();
	});

	/* document.querySelectorAll('.promo__interactive-item').forEach(item => {
		item.querySelector('.delete').addEventListener('click', (e) => {
			item.remove();
		});
		console.log(item);
	}); */

	function deleteItem() {
		document.querySelectorAll('.promo__interactive-item > .delete').forEach((item, i) => {
			item.addEventListener('click', (e) => {
				movieDB.movies.splice(i, 1);
				movieListForm(); //или вариант ниже
				//item.parentElement.remove(); однако не обновится нумерация
			});
		});
	}
	
	//как вариант после клика удалять родительский элемент и отдельно удалять элемент из базы
	//потенциальный баг - сброс ивента при добавление элемента в базу и перестройке списка

});






