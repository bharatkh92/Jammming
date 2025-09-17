function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function redirectToAuthCodeFlow(clientId, redirectURI) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectURI,
        scope: "user-read-private user-read-email playlist-modify-private",
        code_challenge_method: "S256",
        code_challenge: challenge, 
    });
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}



export async function spotifySearch(searchText) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchText)}&type=track`;
    const token = localStorage.getItem(spotify_access_token);
    const refresh_token = localStorage.getItem(spotify_refresh_token);
    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try{
        const response = await fetch(searchUrl, payload);
        
        if(response.status === 401 && refresh_token) {
            const url = `https://accounts.spotify.com/api/token`;
            const client_id = '66658c358a2d4036983a5e036dad9f41';
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token,
                    client_id: client_id
                })
            }

            const response = await fetch(url, payload);
            const result = await response.json();

            const new_spotify_access_token = result.access_token;
            const new_spotify_refresh_token = result.refresh_token;
            
            localStorage.setItem('spotify_access_token', new_spotify_access_token);
            localStorage.setItem('spotify_refresh_token', new_spotify_refresh_token);

            const searchResponse = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${new_spotify_access_token}`
                }
            })

            const searchResult = await searchResponse.json();
            return searchResult;
        }

        const result = await response.json();
        return result;
    } catch(e) {
        console.log(e);
    }
}








