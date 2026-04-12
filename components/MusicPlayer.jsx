"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "global-music-player-state";

const songs = [
  {
    id: 1,
    title: "C418 - Subwoofer Lullaby",
    artist: "C418",
    src: "/music/01-subwoofer-lullaby.mp3",
    color: "#e94560",
  },
  {
    id: 2,
    title: "C418 - Living Mice",
    artist: "C418",
    src: "/music/02-living-mice.mp3",
    color: "#0f3460",
  },
  {
    id: 3,
    title: "C418 - Clark",
    artist: "C418",
    src: "/music/03-clark.mp3",
    color: "#533483",
  },
  // {
  //   id: 4,
  //   title: "Lena Raine - Chrysopoeia (Slowed & Reverb)",
  //   artist: "Slowed & RE:versal",
  //   src: "/music/04-chrysopoeia.mp3",
  //   color: "#16213e",
  // },
  // {
  //   id: 5,
  //   title: "C418 - Oxygene",
  //   artist: "C418",
  //   src: "/music/05-oxygene.mp3",
  //   color: "#ff7f50",
  // },
  // {
  //   id: 6,
  //   title: "C418 - Wet Hands",
  //   artist: "C418",
  //   src: "/music/06-wet-hands.mp3",
  //   color: "#31a2ac",
  // },
  // {
  //   id: 7,
  //   title: "C418 - Key",
  //   artist: "C418",
  //   src: "/music/07-key.mp3",
  //   color: "#224870",
  // },
  // {
  //   id: 8,
  //   title: "C418 - Moog City 2",
  //   artist: "C418",
  //   src: "/music/08-moog-city-2.mp3",
  //   color: "#7d53de",
  // },
  // {
  //   id: 9,
  //   title: "C418 - Danny",
  //   artist: "C418",
  //   src: "/music/09-danny.mp3",
  //   color: "#a11f43",
  // },
  // {
  //   id: 10,
  //   title: "Minecraft Theme Music 1 Of 3 OST",
  //   artist: "c0rvus",
  //   src: "/music/10-minecraft-theme.mp3",
  //   color: "#f27d42",
  // },
];

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState("");

  const audioRef = useRef(null);
  const progressTrackRef = useRef(null);
  const initializedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const skipNextIndexEffectRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) return;

    const audio = new Audio();
    audio.preload = "metadata";
    audio.loop = true;
    audioRef.current = audio;

    let savedState = null;
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (
            typeof parsed.songIndex === "number" &&
            typeof parsed.currentTime === "number" &&
            typeof parsed.isPlaying === "boolean"
          ) {
            savedState = parsed;
          }
        } catch {
          savedState = null;
        }
      }
    }

    const initialIndex = savedState
      ? Math.min(Math.max(savedState.songIndex, 0), songs.length - 1)
      : 0;
    const initialTime = savedState ? Math.max(savedState.currentTime, 0) : 0;
    const shouldAutoplay = savedState ? savedState.isPlaying : false;

    activeIndexRef.current = initialIndex;
    skipNextIndexEffectRef.current = true;
    setCurrentIndex(initialIndex);
    setCurrentTime(initialTime);
    setIsPlaying(shouldAutoplay);

    const saveSnapshot = () => {
      if (typeof window === "undefined") return;
      const payload = {
        songIndex: activeIndexRef.current,
        currentTime: audio.currentTime || 0,
        isPlaying: isPlayingRef.current,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      saveSnapshot();
    };

    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      if (initialTime > 0) {
        const maxTime = Number.isFinite(audio.duration) ? audio.duration : initialTime;
        audio.currentTime = Math.min(initialTime, maxTime);
      }
      setCurrentTime(audio.currentTime || 0);
      setLoadError("");

      if (shouldAutoplay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    const onError = () => {
      setLoadError(`Missing file: ${songs[activeIndexRef.current].src}`);
      setIsPlaying(false);
    };

    const onBeforeUnload = () => {
      saveSnapshot();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", onBeforeUnload);
    }

    audio.src = songs[initialIndex].src;
    audio.load();
    initializedRef.current = true;

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);

      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", onBeforeUnload);
      }

      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!initializedRef.current || !audioRef.current) return;

    if (skipNextIndexEffectRef.current) {
      skipNextIndexEffectRef.current = false;
      return;
    }

    const audio = audioRef.current;
    audio.pause();
    audio.src = songs[currentIndex].src;
    audio.currentTime = 0;
    audio.load();

    setCurrentTime(0);
    setDuration(0);
    setLoadError("");

    if (isPlayingRef.current) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setLoadError("");
    } catch {
      setIsPlaying(false);
    }
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const onSeek = (event) => {
    const audio = audioRef.current;
    const bar = progressTrackRef.current;
    if (!audio || !bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const seekTime = ratio * duration;

    audio.currentTime = seekTime;
    setCurrentTime(seekTime);

    if (typeof window !== "undefined") {
      const payload = {
        songIndex: activeIndexRef.current,
        currentTime: seekTime,
        isPlaying: isPlayingRef.current,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentSong = songs[currentIndex];

  return (
    <>
      <div className={`playerPopup ${isOpen ? "open" : ""}`}>
        <div className="headerRow">
          <div className="thumbnail" style={{ background: currentSong.color }} />
          <div className="songMeta">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>

        <div ref={progressTrackRef} className="progressTrack" onClick={onSeek}>
          <div className="progressFill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="timeRow">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {loadError ? <p className="errorText">{loadError}</p> : null}

        <div className="controls">
          <button type="button" onClick={playPrev} aria-label="Previous song">
            Prev
          </button>
          <button type="button" className="playButton" onClick={togglePlayPause} aria-label="Play or pause">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={playNext} aria-label="Next song">
            Next
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`floatingButton ${isPlaying ? "spinning" : ""}`}
        aria-label="Toggle music player"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="vinylCenter" />
      </button>

      <style jsx>{`
        .floatingButton {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #2c2c54 0%, #1a1a2e 70%);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: transform 0.2s ease;
        }

        .floatingButton:hover {
          transform: scale(1.05);
        }

        .floatingButton::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 2px solid #e94560;
          opacity: 0.8;
        }

        .floatingButton.spinning {
          animation: spin 2.5s linear infinite;
        }

        .vinylCenter {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e94560;
        }

        .playerPopup {
          position: fixed;
          right: 24px;
          bottom: 92px;
          z-index: 9998;
          width: 280px;
          background: #1a1a2e;
          color: #ffffff;
          border: 1px solid rgba(233, 69, 96, 0.4);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(12px) scale(0.96);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.24s ease, transform 0.24s ease;
        }

        .playerPopup.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .headerRow {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          flex: 0 0 auto;
          box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.1);
        }

        .songMeta h4 {
          margin: 0;
          font-size: 1rem;
          line-height: 1.3;
        }

        .songMeta p {
          margin: 4px 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.9rem;
        }

        .progressTrack {
          margin-top: 14px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          cursor: pointer;
          overflow: hidden;
        }

        .progressFill {
          height: 100%;
          background: #e94560;
          border-radius: inherit;
          transition: width 0.1s linear;
        }

        .timeRow {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.78);
        }

        .errorText {
          margin-top: 8px;
          color: #ff9aa8;
          font-size: 0.72rem;
          word-break: break-word;
        }

        .controls {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .controls button {
          flex: 1;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #16213e;
          color: #ffffff;
          border-radius: 10px;
          padding: 8px 6px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .controls button:hover {
          border-color: #e94560;
          background: #0f3460;
        }

        .controls .playButton {
          background: #e94560;
          border-color: #e94560;
        }

        .controls .playButton:hover {
          background: #d23854;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .playerPopup {
            right: 12px;
            width: calc(100vw - 24px);
          }

          .floatingButton {
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>
    </>
  );
}
