
let token;
const clientID = '53780a1d650349acb65417b07d886afc';
const redirectURL = "http://localhost:3000/";

const Spotify = {
    search(param){
        const accessToken= Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=${param}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then( jsonResponse => {
                if(!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map( track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            });
    },

    savePlaylist(name, URIArray){
        if(!name){
            return;
        }
        if(!URIArray){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userID;
        fetch(`https://api.spotify.com/v1/me`, {headers: headers}
        ).then(response => response.json
        ).then( jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers, // this line is important, if this content-type is not set it wont work
                body: JSON.stringify({name: name})
            }).then( response => response.json
            ).then( jsonResponse => {
                let playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: URIArray})
                });
            }) ;
        });
        
    },

    getAccessToken(){
        if(token){
            return token;
        }
        
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(tokenMatch && expireMatch){
            token = tokenMatch[1];
            let expire = Number(expireMatch[1]);
            window.setTimeout(() => token = '', expire * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        }
    }
};

export default Spotify;

// /v1/search?type=TRACK
// https://api.spotify.com/v1/search?type=TRACK