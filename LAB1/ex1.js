"use strict";

const dayjs = require('dayjs');

/**
 * constructor
 * @param {number} id - mandatory
 * @param {string} title - mandatory
 * @param {boolean} favorites - optional, default = false
 * @param {date} date - when watched optional
 * @param {number} rating - 1 to 5 optional
 */

function Film(id, title, favorites, date, rating){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ? dayjs(date) : undefined;
    this.rating = rating ? rating : undefined;
}

function FilmLibrary(){
    this.films = [];

    this.addNewFilm = (film) => {
        if(this.films.map(f => f.id).some(f => f.id == film.id))
            console.log("Film alredy in the library");
        else
            this.films.push(film);
    }
}

const films = [
    new Film(1, "Pulp Fiction", true, "2022-03-10", 5),
    new Film(2, "21 Grams", true, '2022-03-17', 4),
    new Film(3, 'Star Wars', false),
    new Film(4, 'Matrix', false),
    new Film(5, 'Shrek', false, '2022-03-21', 3)
]
const myLibrary = new FilmLibrary();

for(let film of films)
    myLibrary.addNewFilm(film);

console.log(myLibrary);