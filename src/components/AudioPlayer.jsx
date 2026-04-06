import React, { useRef, useState } from "react";
import { trackEvent, currentPage } from "../analytics/analytics";
import "./AudioPlayer.css";

const fmt = (s) => {
	if (!s || isNaN(s)) return "0:00";
	const m = Math.floor(s / 60);
	const sec = Math.floor(s % 60);
	return `${m}:${sec.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ src, title, description }) => {
	const audioRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const toggle = () => {
		if (playing) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
			trackEvent("action", { action_name: "audio_play", page_name: currentPage, track: title || "unknown" });
		}
		setPlaying((p) => !p);
	};

	const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
	const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
	const handleEnded = () => {
		setPlaying(false);
		setCurrentTime(0);
	};

	const handleSeek = (e) => {
		if (!duration) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
		audioRef.current.currentTime = fraction * duration;
		setCurrentTime(fraction * duration);
	};

	const progress = duration ? currentTime / duration : 0;

	return (
		<div className="audio-player">
			<audio
				ref={audioRef}
				src={src}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
			/>
			{title && <p className="audio-player-title">{title}</p>}
			{description && <p className="audio-player-description">{description}</p>}
			<div className="audio-player-controls">
				<button
					className={`audio-player-btn ${playing ? "playing" : ""}`}
					onClick={toggle}
					aria-label={playing ? "Pause" : "Play"}>
					{playing ? "⏸" : "▶"}
				</button>
				<div className="audio-player-progress" onClick={handleSeek} role="progressbar">
					<div className="audio-player-bar">
						<div className="audio-player-fill" style={{ width: `${progress * 100}%` }} />
						<div className="audio-player-thumb" style={{ left: `${progress * 100}%` }} />
					</div>
				</div>
				<span className="audio-player-time">
					{fmt(currentTime)}
					{duration ? ` / ${fmt(duration)}` : ""}
				</span>
			</div>
		</div>
	);
};

export default AudioPlayer;
