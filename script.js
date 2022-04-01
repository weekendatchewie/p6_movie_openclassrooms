/*** URL MOVIES ***/
const urlBestMovie = "http://localhost:8000/api/v1/titles/68646";
const urlBestScoreMovies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=7";
const urlMarvelMovies = "http://localhost:8000/api/v1/titles/?company_contains=Marvel&sort_by=-imdb_score&sort_by=-votes&page_size=7";
const urlStarWarsMovies = "http://localhost:8000/api/v1/titles/?company_contains=Lucasfilm&sort_by=-imdb_score&sort_by=-votes&page_size=7";
const urlTarantinoMovies = "http://localhost:8000/api/v1/titles/?writer_contains=Tarantino&sort_by=-imdb_score&sort_by=-votes&page_size=7";

/*** Main movie DOM ELEMENTS ***/
const titleMainMovie = document.getElementById("title-main-movie");
const imgMainMovie = document.getElementById("img-main-movie");
const resumeMainMovie = document.getElementById("resume-main-movie");
const modalTitleMainMovie = document.getElementById("modal-title-main-movie");
const modalResumeMainMovie = document.getElementById("modal-resume-main-movie");
const modalGenresMainMovie = document.getElementById("modal-genres-main-movie");
const modalRatedMainMovie = document.getElementById("modal-rated-main-movie");
const modalImdbMainMovie = document.getElementById("modal-imdb-main-movie");
const modalCountriesMainMovie = document.getElementById("modal-countries-main-movie");
const modalBoxOfficeMainMovie = document.getElementById("modal-box-office-main-movie");
const modalDirectorMainMovie = document.getElementById("modal-director-main-movie");
const modalYearMainMovie = document.getElementById("modal-year-main-movie");
const modalDurationMainMovie = document.getElementById("modal-duration-main-movie");
const modalActorsMainMovie = document.getElementById("modal-actors-main-movie");

const modalMainMovie = document.getElementById('modal-main-movie');
const btnModalMainMovie = document.getElementById('btn-info-main-movie');
const btnCloseModalMainMovie = document.getElementById('btn-close-modal-main-movie');

/*** Categories movies DOM ELEMENTS ***/
const imgMovie = document.getElementById("img-movie");
const modalTitleMovie = document.getElementById("modal-title-movie");
const modalResumeMovie = document.getElementById("modal-resume-movie");
const modalGenresMovie = document.getElementById("modal-genres-movie");
const modalRatedMovie = document.getElementById("modal-rated-movie");
const modalImdbMovie = document.getElementById("modal-imdb-movie");
const modalCountriesMovie = document.getElementById("modal-countries-movie");
const modalBoxOfficeMovie = document.getElementById("modal-box-office-movie");
const modalDirectorMovie = document.getElementById("modal-director-movie");
const modalYearMovie = document.getElementById("modal-year-movie");
const modalDurationMovie = document.getElementById("modal-duration-movie");
const modalActorsMovie = document.getElementById("modal-actors-movie");

const wrapperBestScoreMovies = document.getElementById('wrapper-best-score-movies');
const wrapperMarvelMovies = document.getElementById('wrapper-marvel-movies');
const wrapperStarWarsMovies = document.getElementById('wrapper-starwars-movies');
const wrapperTarantinoMovies = document.getElementById('wrapper-tarantino-movies');

const modal = document.getElementById("modal-movie")

btnModalMainMovie.onclick = () => modalMainMovie.style.display = 'block'
btnCloseModalMainMovie.onclick = () => modalMainMovie.style.display = 'none'

window.onclick = function(event) {
    if (event.target === modalMainMovie) {
        modalMainMovie.style.display = "none";
    }
}

function closeModal() {
    const btnCloseModal = document.getElementById("btn-close-modal-movie")
    btnCloseModal.onclick = () => {
        modal.style.display = "none";
        imgMovie.src = '';
        modalTitleMovie.innerHTML = null;
        modalResumeMovie.innerHTML = null;
        modalGenresMovie.innerHTML = null;
        modalRatedMovie.innerHTML = null;
        modalImdbMovie.innerHTML = null;
        modalCountriesMovie.innerHTML = null;
        modalBoxOfficeMovie.innerHTML = null;
        modalDirectorMovie.innerHTML = null;
        modalYearMovie.innerHTML = null;
        modalDurationMovie.innerHTML = null;
        modalActorsMovie.innerHTML = null;
    }
}

function getInfoMovieModal(data) {
    let link = document.getElementById(data.idLink)
    link.onclick = () => {
        modal.style.display = "block"
        imgMovie.src = data.image
        modalTitleMovie.innerHTML = data.title;
        modalResumeMovie.innerHTML = data.long_description;
        modalGenresMovie.innerHTML += data.genres.join(", ");
        modalRatedMovie.innerHTML += data.rated;
        modalImdbMovie.innerHTML += data.imdb_score;
        modalCountriesMovie.innerHTML += data.countries.join(", ");
        modalBoxOfficeMovie.innerHTML += data.worldwide_gross_income.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        modalDirectorMovie.innerHTML += data.directors.join(", ");
        modalYearMovie.innerHTML = data.year;
        modalDurationMovie.innerHTML = `${data.duration} min`;
        modalActorsMovie.innerHTML += data.actors.join(", ");
        }
    closeModal()
}

function getBestMovie() {
    fetch(urlBestMovie)
        .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
        .then(function(value) {
            titleMainMovie.innerHTML = value.original_title;
            imgMainMovie.src = value.image_url;
            resumeMainMovie.innerHTML = value.description;
            modalTitleMainMovie.innerHTML = value.original_title;
            modalResumeMainMovie.innerHTML = value.long_description;
            modalGenresMainMovie.innerHTML += value.genres.join(", ");
            modalRatedMainMovie.innerHTML += value.rated;
            modalImdbMainMovie.innerHTML += value.imdb_score;
            modalCountriesMainMovie.innerHTML += value.countries.join(", ");
            modalBoxOfficeMainMovie.innerHTML += value.worldwide_gross_income.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            modalDirectorMainMovie.innerHTML += value.directors.join(", ");
            modalYearMainMovie.innerHTML = value.year;
            modalDurationMainMovie.innerHTML = `${value.duration} min`;
            modalActorsMainMovie.innerHTML += value.actors.join(", ");
        })
        .catch( error => {
            console.log(error)
        });
}

async function getMovies(urlMovies, arrMovies, wrapper, infosModal) {

    await fetch(urlMovies)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            for(let movie of value.results) {
                arrMovies.push(movie.url)
            }

        })
        .then(async function() {
            for(let movieUrl of arrMovies) {
                await fetch(movieUrl)
                    .then(function (res) {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then(function (value) {
                        wrapper.innerHTML +=
                            `<div class="carousel-slide">
                                <div class="card-movie">
                                    <div class="bloc-card-movie-img">
                                        <img class="card-img-movie" src="${value.image_url}" id="link-to-info-movie-${value.id}" alt="">
                                    </div>
                                </div>
                            </div>`

                        infosModal.push(
                            {
                                'idLink': 'link-to-info-movie-' + value.id,
                                'image': value.image_url, 'url': value.url,
                                'title': value.original_title,
                                'long_description': value.long_description,
                                'genres': value.genres,
                                'rated': value.rated,
                                'imdb_score': value.imdb_score,
                                'countries': value.countries,
                                'worldwide_gross_income': value.worldwide_gross_income,
                                'directors': value.directors,
                                'year': value.year,
                                'duration': value.duration,
                                'actors': value.actors,
                            })

                    })
                    .catch( error => {
                        console.log(error)
                    });
            }

        })
        .catch( error => {
            console.log(error)
        });
    for(let data of infosModal) {
        getInfoMovieModal(data)
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    try {

        let bestScoreMovies = []
        let marvelMovies = []
        let starWarsMovies = []
        let tarantinoMovies = []

        const infosModalBestScoreMovies = []
        const infosModalMarvelMovies = []
        const infosModalStarWarsMovies = []
        const infosModalTarantinoMovies = []

        await getBestMovie()
        await getMovies(urlTarantinoMovies, tarantinoMovies, wrapperTarantinoMovies, infosModalTarantinoMovies)
        await getMovies(urlBestScoreMovies, bestScoreMovies, wrapperBestScoreMovies, infosModalBestScoreMovies)
        await getMovies(urlMarvelMovies, marvelMovies, wrapperMarvelMovies, infosModalMarvelMovies)
        await getMovies(urlStarWarsMovies, starWarsMovies, wrapperStarWarsMovies, infosModalStarWarsMovies)

    }
    catch(err) {
        console.log(err);
    }
})

