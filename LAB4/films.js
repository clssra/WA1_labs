"use strict";

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
    this.films = [];

    this.addNewFilm = (film) => {
        if(this.films.map(f => f.id).some(f => f.id == film.id))
            console.log("Film alredy in the library");
        else
            this.films.push(film);
    }

    this.sortByDate = () => {
        this.films.sort((a,b) => {
            if(a.date == undefined || a.date.isAfter(b.date)){
                return 1;
            } else if(a.date.isBefore(b.date))
                return -1;
            else
                return 0;
        });
    }

    this.deleteFilm = (id) => {
        const newlist = this.films.filter((x) => x.id != id);
        this.films = newlist;
    }

    this.resetWatchedFilms = () => {
        this.films.forEach((x) => x.date = undefined);
    }

    this.print = () => {
        for(let film of this.films)
            printLine(film);
        console.log('\n');
    }

    this.getRated = (rating) => {
        console.log(`***** Films filtered, only the rated ones *****`);
        const rated = this.films.filter(x => x.rating >= rating);
        if(rated.length == 0)
            console.log('No film');
        else
            for(let film of rated)
                printLine(film);
            console.log('\n');
    }

    

}

// const films = [
//     new Film(1, "Pulp Fiction", true, "2022-03-10", 5),
//     new Film(2, "21 Grams", true, '2022-03-17', 4),
//     new Film(3, 'Star Wars', false),
//     new Film(4, 'Matrix', false),
//     new Film(5, 'Shrek', false, '2022-03-21', 3)
// ]
// const myLibrary = new FilmLibrary();

// for(let film of films)
//     myLibrary.addNewFilm(film);

// myLibrary.print();
// myLibrary.sortByDate();
// myLibrary.deleteFilm(3);
// myLibrary.print();
// myLibrary.resetWatchedFilms();
// myLibrary.print();
// myLibrary.getRated(2);