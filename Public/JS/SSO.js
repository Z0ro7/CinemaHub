const ssoTmdbReadApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzMWY4Yjc0OTc2ODdjNTBlNGM5NjU0N2Q1ZjJlMSIsInN1YiI6IjY1YjIzOGYzMjg2NmZhMDE2MmUzYTJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.40I583sC_neSeUiJWOfn_b6m_bDPMOKnrGZkWCQt4zU'

// verifie si un token est dans le lien d'accÃ¨s, stocke le token et reload la page 
window.onload = async () => {
    if (!location.search.includes('request_token=')) {
        return
    }

    let token = location.search.split('request_token=')[1]?.split('&')?.[0]

    if(token) {
        getNewSession(token)
        .then(sessionData => {
            sessionStorage.setItem('tmdbSessionId', sessionData.session_id)
            sessionStorage.setItem('tmdbSessionToken', token)
            location.href = 'http://127.0.0.1:5500/Public/index.html' //reload dans la barre de navigation
        })
        .catch(err => {
            console.error(err);
            location.href = 'http://127.0.0.1:5500/Public/index.html'
        })
    }

    if (sessionStorage.getItem('tmdbSessionId')) {
        hideConnect()
    }
}



// Cette fonction verifie qu'un token existe et redirige l'utilisateur vers le lien tmdb pour valider le token
async function redirectUserToSSO() {
    let tokenData = await getNewTMDBToken()
    if (!tokenData.success) {
        return alert('Une erreur est survenue et je ne peux pas vous identifier')
    }
    location.href = `https://www.themoviedb.org/authenticate/${tokenData.request_token}?redirect_to=http://127.0.0.1:5500/Public/index.html`
}

// Cette fonction fait une requete a tmdb pour obtenir  un token vierge a faire valider par le user

async function getNewTMDBToken() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ssoTmdbReadApiKey}`
        }
    };

    let tokenRequest = await fetch('https://api.themoviedb.org/3/authentication/token/new', options).catch(err => console.error('error:' + err));
    if (!tokenRequest) {
        return
    }

    let tokenData = await tokenRequest.json()

    return tokenData;
}


async function getNewSession(token) {
    const options = {
        method: 'POST', 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${ssoTmdbReadApiKey}`
        },
        body: JSON.stringify({request_token: token})
    };

    let sessionRequest = await fetch('https://api.themoviedb.org/3/authentication/session/new', options).catch(err => console.error('error:' + err));
    if (!sessionRequest) {
        return
    }

    let sessionData = await sessionRequest.json()

    return sessionData
}
let redirButton = document.getElementById('buttonConnect');
redirButton.addEventListener('click', () => redirectUserToSSO());

function deleteSession() {
    sessionStorage.removeItem('tmdbSessionId')
    sessionStorage.removeItem('tmdbSessionToken')
    document.getElementById('buttonConnect').style.display='block';
    document.getElementById('buttonDeconnect').style.display='none';    
}

function hideConnect() {
    document.getElementById('buttonConnect').style.display='none';
    document.getElementById('buttonDeconnect').style.display='block';   

}