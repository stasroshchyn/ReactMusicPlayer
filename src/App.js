import React, {useState, useRef} from 'react';

import './styles/app.scss';

import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';

import data from './data';

function App() {
	//Hooks
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
        currentTime: 0,
		duration: 0,
		animationPercentage: 0
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	const audioRef = useRef(null);

	//Functions
	const timeUpdateHandler = (e) => {
        const current = e.target.currentTime,
			  duration = e.target.duration,
			  roundedCurrent = Math.round(current),
			  roundedDuration = Math.round(duration),
			  animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
        setSongInfo({currentTime: current, duration, animationPercentage});
    }

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex(song => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	}

	//Variables
	const {audio} = currentSong;

	return (
		<div className="App">
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>
			<Song
				currentSong={currentSong}
				isPlaying={isPlaying}
			/>
			<Player
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				songs={songs}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
                onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={songEndHandler}
                ref={audioRef}
                src={audio}
            ></audio>
		</div>
	);
}

export default App;
