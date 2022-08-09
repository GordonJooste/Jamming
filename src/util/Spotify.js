
let token;
const clientID = '53780a1d650349acb65417b07d886afc';
const redirectURL = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if(token){
            return token;
        }
        
        const token = window.location.href.match(/access_token=([^&]*)/);
        const expire = window.location.href.match(/expires_in=([^&]*)/);
        if(token && expire){
            window.setTimeout(() => token = '', expire * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        }
    }
};

export default Spotify;