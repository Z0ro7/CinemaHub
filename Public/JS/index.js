
async function moviePopular(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzMWY4Yjc0OTc2ODdjNTBlNGM5NjU0N2Q1ZjJlMSIsInN1YiI6IjY1YjIzOGYzMjg2NmZhMDE2MmUzYTJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.40I583sC_neSeUiJWOfn_b6m_bDPMOKnrGZkWCQt4zU'
        }
      };
    let moviesPop = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options).catch(err => console.error(err)).catch(err => console.error(err));
    if(!moviesPop){
        return
    }
    let jsonData = await moviesPop.json()
    return jsonData;
};
async function displayMoviePopular(){
    let moviesList = await moviePopular()
    for (let i = 0; i < moviesList.results.lenght; i++){
        let movieHTML = document.createElement('li')
        movieHTML.innerHTML = ``
    }
}
