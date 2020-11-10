import React from 'react';

import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'library_active' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                <LibrarySong
                    setCurrentSong={setCurrentSong}
                    song={song}
                    songs={songs}
                    key={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                />))}
            </div>
        </div>
    );
}

export default Library;