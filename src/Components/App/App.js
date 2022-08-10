import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			searchResults: [],
      playlistName: "any string",
      playlistTracks: []  
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }

  addTrack(track){
    let currentTracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    currentTracks.push(track);
    this.setState({playlistTracks: currentTracks});

  }

  removeTrack(track){
    let currentTracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      //remove track
      let index = currentTracks.indexOf(track);
      currentTracks.splice(index,1);
      this.setState({playlistTracks: currentTracks});
    }
    else{
      return;
    }
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then( ()=> {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      })
    });
  }

  search(term){
    Spotify.search(term).then( result => {
      this.setState({searchResults: result})
    });
    
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          < SearchBar onSearch = {this.search}/>
           <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd ={this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange={this.updatePlaylistName} onSave = {this.savePlaylist}/>
          </div>
        </div>  
      </div>
  );
  }
}

export default App;
