import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			searchResults: [
				{ name: "name1", artist: "artist1", album: "album1", id: 1 },
				{ name: "name2", artist: "artist2", album: "album2", id: 2 },
				{ name: "name3", artist: "artist3", album: "album3", id: 3 },
			],
      playlistName: "any string",
      playlistTracks: [
        { name: "name6", artist: "artist6", album: "album6", id: 6 },
				{ name: "name7", artist: "artist7", album: "album7", id: 7 },
				{ name: "name8", artist: "artist8", album: "album8", id: 8 },
      ]  
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
  }

  search(term){
    console.log(term);
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
