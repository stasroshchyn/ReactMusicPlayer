import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

const Player = ({audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setSongs}) => {
    //Functions
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (time) => {
        return Math.floor(time/60) + ':' + ('0' + Math.floor(time%60)).slice(-2);
    }

    const dragHandler = (e) => {
        setSongInfo({...songInfo, currentTime: e.target.value});
        audioRef.current.currentTime = e.target.value;
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);

        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } else {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[(songs.length - 1)]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }

        if (isPlaying) audioRef.current.play();
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map(song => {
            if (song.id === nextPrev.id) {
                return {...song, active: true};
            } else {
                return {...song, active: false};
            }
        });
        setSongs(newSongs);
    }

    //Variables
    const {currentTime, duration, animationPercentage} = songInfo;

    //Styles
    const trackAnim = {
        transform: `translateX(${animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(currentTime)}</p>
                <div
                    className="track"
                    style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}
                >
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        type="range"
                    />
                    <div
                        style={trackAnim}
                        className="animate-track"
                    ></div>
                </div>
                <p>{duration ? getTime(duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                    onClick={() => skipTrackHandler("skip-back")}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                    onClick={() => skipTrackHandler("skip-forward")}
                />
            </div>
        </div>
    )
}

export default Player;