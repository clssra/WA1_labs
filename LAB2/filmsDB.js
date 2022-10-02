"use strict";

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('./films.db', (err) => {
    if(err)
        throw err;
});


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

function printLine(film){
    console.log(`ID: ${film.id}, Title: ${film.title}, Favourite: ${film.favorites}, Date: ${film.date ? film.date.format('DD/MM/YYYY') : undefined}, Rating: ${film.rating ? film.rating : undefined}`);
}

function FilmLibrary(){

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(x => new Film(x.id, x.title, x.favorites, x.date, x.rating)));
            });
        });
    }

}

async function main(){
    let myLibrary = new FilmLibrary();
    const myFilms = await myLibrary.getAll();
    console.log(myFilms);
}

main();