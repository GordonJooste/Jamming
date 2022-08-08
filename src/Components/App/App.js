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
    }

  addTrack(track){
    let currentTracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    currentTracks.push(track);
    this.setState({playlistTracks: currentTracks});

  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          < SearchBar/>
           <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>  
      </div>
  );
  }
}

export default App;
