import './TrackList.css';
import Track from '../Track/Track';
import React from 'react';

class TrackList extends React.Component {


  render(){
    
    return (
      <div className="TrackList">
          {this.props.tracks.map( track => {return <Track track={track} key ={track.id} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval}/> })}
          
      </div>
    );
    }
}

export default TrackList;

//{this.props.tracks.map(this.call())}
//{this.props.tracks.map( track => {return <Track track={track} key ={track.id}/> })}
//{name: 'track example', artist: 'artist example', album: 'album example', id: 1}