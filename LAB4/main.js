'use strict';

const emptyStar = '<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg> ';
const filledStar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg> ';


//film and filmLibrary

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
    this.favorite = favorites;
    this.date = date ? dayjs(date) : undefined;
    this.rating = rating ? rating : undefined;

    this.isFavorite = () => this.favorite ? true : false;
}

function FilmLibrary(){
    this.filmLibrary = [];

    
    this.addNewFilm = (film) => {
        if(this.filmLibrary.map(f => f.id).some(f => f.id == film.id))
            console.log("Film alredy in the library");
        else
            this.filmLibrary.push(film);
    }

    this.sortByDate = () => {
        this.filmLibrary.sort((a,b) => {
            if(a.date == undefined || a.date.isAfter(b.date)){
                return 1;
            } else if(a.date.isBefore(b.date))
                return -1;
            else
                return 0;
        });
    }

    this.deleteFilm = (id) => {
        const newlist = this.filmLibrary.filter((x) => x.id != id);
        this.filmLibrary = newlist;
    }

    this.resetWatchedFilms = () => {
        this.filmLibrary.forEach((x) => x.date = undefined);
    }

    this.print = () => {
        for(let film of this.filmLibrary)
            printLine(film);
        console.log('\n');
    }

    this.getRated = (rating) => {
        console.log(`***** Films filtered, only the rated ones *****`);
        const rated = this.filmLibrary.filter(x => x.rating >= rating);
        if(rated.length == 0)
            console.log('No film');
        else
            for(let film of rated)
                printLine(film);
            console.log('\n');
    }

}

function createFilmNode(films){

    const ul = document.querySelector('ul#main-content');
    ul.innerHTML = '';

    films.filmLibrary.forEach(film => {
        const li = document.createElement('li');
        li.id = "film" + film.id;
        li.className = 'list-group-item';
    
        // creating a higher <div>
        const externalDiv = document.createElement('div');
        externalDiv.className = 'd-flex w-100 justify-content-between';
    
        // creating a <p> for the title
        const titleP = document.createElement('p');
        titleP.className = 'text-start col-md-5 col-3';
        if(film.isFavorite()) 
            titleP.className += ' favorite ';
        titleP.innerText = film.title;
        externalDiv.appendChild(titleP);
    
        // creating a "inner" <span> for the checkbox and the 'Favorite' label
        const innerSpan = document.createElement('span');
        innerSpan.className = 'custom-control custom-checkbox col-md-1 col-3';
        innerSpan.style.whiteSpace = 'nowrap';
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = "check-f" + film.id;
        checkbox.className = 'custom-control-input';
        checkbox.checked = film.isFavorite();
        innerSpan.appendChild(checkbox);
    
        const descriptionLabel = document.createElement('label');
        descriptionLabel.className = 'custom-control-label'; 
        descriptionLabel.innerHTML = '&nbsp;Favorite';
        descriptionLabel.htmlFor = "check-f" + film.id;
        innerSpan.appendChild(descriptionLabel);
        externalDiv.appendChild(innerSpan);
    
        // creating a <small> element for the date
        const dateText = document.createElement('small');
        dateText.className = 'watch-date col-md-3 col-3';
        dateText.innerText = film.date ? film.date.format('MMMM D, YYYY') : '';
        externalDiv.appendChild(dateText);
    
        // creating a <span> for the rating stars
        const ratingSpan = document.createElement('span');
        ratingSpan.className = 'rating text-end col-md-3 col-3';
    
        for(let i=0; i<5; i++) {
            const star = (i < film.rating) ? filledStar : emptyStar;
            ratingSpan.insertAdjacentHTML("beforeend", star); 
        }
        externalDiv.appendChild(ratingSpan);
    
        // adding the external <div> to the <li> before returning it.
        li.appendChild(externalDiv);
        ul.appendChild(li);
    });

    
}

const films = new FilmLibrary();
films.addNewFilm(new Film(1, "Pulp Fiction", true, "2022-03-10", 5));
films.addNewFilm(new Film(2, "21 Grams", true, '2022-03-17', 4));
films.addNewFilm(new Film(3, 'Star Wars', false));
films.addNewFilm(new Film(4, 'Matrix', false));
films.addNewFilm(new Film(5, 'Shrek', false, '2022-03-21', 3));

createFilmNode(films);