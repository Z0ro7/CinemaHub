
async function movieSearched(search){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzMWY4Yjc0OTc2ODdjNTBlNGM5NjU0N2Q1ZjJlMSIsInN1YiI6IjY1YjIzOGYzMjg2NmZhMDE2MmUzYTJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.40I583sC_neSeUiJWOfn_b6m_bDPMOKnrGZkWCQt4zU'
        }
      };
    let movieSearch = await fetch('https://api.themoviedb.org/3/search/movie?query='+search+'&include_adult=true&language=fr-FR&page=1', options).catch(err => console.error(err)).catch(err => console.error(err));
    if(!movieSearch){
        return
    }
    let jsonData = await movieSearch.json()
    return jsonData;
};

async function displayMovieSearched(search){
    let moviesList = await movieSearched(search)
    const refresh = document.getElementById('filmSearch')
    refresh.innerHTML = ''
    let results = moviesList.results
    for (let i = 0; i < results.length; i++) {
        let movieHTML = document.createElement('div')
        movieHTML.innerHTML = `
        <h2>${results[i].title}</h2>
        <img src=https://image.tmdb.org/t/p/w500${results[i].poster_path} alt="poster du film"/>
        <p>${results[i].release_date}<p>
        `
        movieHTML.addEventListener('click',function() {
            window.location.href=`movie.html?${results[i].id}`;
        })
        refresh.appendChild(movieHTML)
    }
}
displayMovieSearched()

const userSearch = document.getElementById('searchBarre')
userSearch.addEventListener('input', () => displayMovieSearched(userSearch.value))