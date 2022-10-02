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
    console.log(`ID: ${film.id}, Title: ${film.title}, Favourite: ${!film.favorites ? true : false}, Date: ${film.date ? film.date.format('DD/MM/YYYY') : undefined}, Rating: ${film.rating ? film.rating : undefined}`);
}

function printFilms(films){
    for(let film of films)
        printLine(film);
    console.log('\n');
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


    this.getFavorites = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * from films WHERE favorite=TRUE';
            db.all(sql, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(x => new Film(x.id, x.title, x.favorites, x.date, x.rating)));
            });
        });
    }

    this.getToday = () => {
        return new Promise((resolve, reject) => {
            const today = dayjs().format('YYYY-MM-DD');
            const sql = "SELECT * FROM films WHERE watchdate=?";
            db.all(sql, [today], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(x => new Film(x.id, x.title, x.favorites, x.date, x.rating)));
            })
        });
    }

    this.getBefore = (date) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchdate < ?";
            db.all(sql, [date], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(x => new Film(x.id, x.title, x.favorites, x.date, x.rating)));
            });
        });
    }

    this.getRating = (rating) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating >= ?";
            db.all(sql, [rating], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map(x => new Film(x.id, x.title, x.favorites, x.date, x.rating)));
            });
        });
    }

    this.getTitle = (title) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE title=?";
            db.all(sql, [title], (err, rows) => {
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
    printFilms(myFilms);

    const myFavorites = await myLibrary.getFavorites();
    if(myFavorites.lenght == 0)
        console.log('No favorites films\n');
    else
        printFilms(myFavorites);

    const watchedToday = await myLibrary.getToday();
    if(watchedToday.lenght == 0)
        console.log('No films watched today\n');
    else
        printFilms(watchedToday);

    const date = '2022-05-01';
    const watchedBefore = await myLibrary.getBefore(date);
    if(watchedBefore.lenght == 0)
        console.log('No film watched before: ' + date);
    else
        printFilms(watchedBefore);
    
    const rating = 3;
    const ratedMoreThan = await myLibrary.getRating(rating);
    if(ratedMoreThan.lenght == 0)
        console.log('No film rated more than: ' + rating);
    else
        printFilms(ratedMoreThan);
    
    const title = 'Matrix';
    const matchedTitle = await myLibrary.getTitle(title);
    if(matchedTitle.lenght == 0)
        console.log('No film matched title: ' + title);
    else
        printFilms(matchedTitle);
}

main();