import React from 'react';

const Song = ({currentSong, isPlaying}) => {
    const {cover, name, artist} = currentSong;

    return (
        <div className="song-container">
            <img
                className="rotation"
                src={cover}
                alt={name}
                style={{animationPlayState: `${isPlaying ? 'running' : 'paused'}`}}
            />
            <h2>{name}</h2>
            <h3>{artist}</h3> 
        </div>
    )
}

export default Song;