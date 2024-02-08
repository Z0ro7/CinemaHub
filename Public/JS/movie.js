const id = location.search.split()[0]?.split('?')?.[1]

async function movieSelected(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzMWY4Yjc0OTc2ODdjNTBlNGM5NjU0N2Q1ZjJlMSIsInN1YiI6IjY1YjIzOGYzMjg2NmZhMDE2MmUzYTJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.40I583sC_neSeUiJWOfn_b6m_bDPMOKnrGZkWCQt4zU'
        }
      };
    let moviesPop = await fetch('https://api.themoviedb.org/3/movie/'+id+'?language=fr-FR', options).catch(err => console.error(err)).catch(err => console.error(err));
    if(!moviesPop){
        return
    }
    let jsonData = await moviesPop.json()
    return jsonData;
};

async function displayMovieSelected(id){
    let moviesInfos = await movieSelected(id)
    let movieHTML = document.createElement('div')
    movieHTML.innerHTML = `
    <h2>${moviesInfos.title}</h2>
    <img src=https://image.tmdb.org/t/p/w500${moviesInfos.poster_path} alt="poster du film"/>
    <p>${moviesInfos.overview}</p>
    `
    let filmAffiche = document.getElementById('infoFilm')
    filmAffiche.appendChild(movieHTML)
}
displayMovieSelected(id)

async function comments(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzMWY4Yjc0OTc2ODdjNTBlNGM5NjU0N2Q1ZjJlMSIsInN1YiI6IjY1YjIzOGYzMjg2NmZhMDE2MmUzYTJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.40I583sC_neSeUiJWOfn_b6m_bDPMOKnrGZkWCQt4zU'
        }
    };
    let commentsView = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options).catch(err => console.error(err))
    if(!commentsView){
        return
    }
    let jsonDataCom = commentsView.json()
    return jsonDataCom;
};

async function displayCommentsMovies(id){
    let commentsInfos = await comments(id)
    commentsInfos.results.forEach((element) => {
        let commentsHTML = document.createElement('div')
        commentsHTML.innerHTML = `
        <h2>${element.author}</h2>
        <p>${element.content}</p>
        `
        let commentsAffiche = document.getElementById('commentairesFilm')
        commentsAffiche.appendChild(commentsHTML)
    });
}
displayCommentsMovies(id)