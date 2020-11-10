import React from 'react';

const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying, songs, setSongs}) => {
    const {cover, name, artist, active, id} = song;

    const songSelectHandler = async () => {
        
        await setCurrentSong(song);

        const newSongs = songs.map(song => {
            if (song.id === id) {
                return {...song, active: true};
            } else {
                return {...song, active: false};
            }
        });
        setSongs(newSongs);

        if (isPlaying) audioRef.current.play();     
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${active ? "library-song_active" : ""}`}>
            <img src={cover} alt ={name}></img>
            <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
            </div>
        </div>
    )
};


export default LibrarySong;