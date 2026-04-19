"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "global-music-player-state";

const songs = [
  {
    id: 1,
    title: "C418 - Subwoofer Lullaby",
    artist: "C418",
    src: "/music/01-subwoofer-lullaby.mp3",
    colors: { primary: "#a1aeff", secondary: "#ffb176", light: "#b9c1fb" },
    bgImage: "url('/images/anime_bg_1.png')",
    globalBgImage: "url('/images/anime_scenery_1.png')",
  },
  {
    id: 2,
    title: "C418 - Living Mice",
    artist: "C418",
    src: "/music/02-living-mice.mp3",
    colors: { primary: "#e94560", secondary: "#ff9aa8", light: "#ffb176" },
    bgImage: "url('/images/anime_bg_2.png')",
    globalBgImage: "url('/images/anime_scenery_2.png')",
  },
  {
    id: 3,
    title: "C418 - Clark",
    artist: "C418",
    src: "/music/03-clark.mp3",
    colors: { primary: "#31a2ac", secondary: "#6df0ff", light: "#a3f3ff" },
    bgImage: "url('/images/anime_bg_3.png')",
    globalBgImage: "url('/images/anime_scenery_3.png')",
  },
  {
    id: 4,
    title: "C418 - Oxygene",
    artist: "C418",
    src: "/music/05-oxygene.mp3",
    colors: { primary: "#ff7f50", secondary: "#ffd676", light: "#ffcbbb" },
    bgImage: "url('/images/anime_bg_4.png')",
    globalBgImage: "url('/images/anime_scenery_4.png')",
  },
  {
    id: 5,
    title: "C418 - Wet Hands",
    artist: "C418",
    src: "/music/06-wet-hands.mp3",
    colors: { primary: "#7d53de", secondary: "#b088ff", light: "#cbb3ff" },
    bgImage: "url('/images/anime_bg_5.png')",
    globalBgImage: "url('/images/anime_scenery_5.png')",
  },
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

  const persistState = () => {
    if (typeof window === "undefined") return;
    if (!audioRef.current) return;
    const payload = {
      songIndex: activeIndexRef.current,
      currentTime: audioRef.current.currentTime || 0,
      isPlaying: isPlayingRef.current,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

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
    audio.loop = false;
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

    // On refresh/load, we want a random song that's different from the last one played
    const lastIndex = savedState ? savedState.songIndex : -1;
    let initialIndex;
    if (songs.length > 1) {
      initialIndex = Math.floor(Math.random() * songs.length);
      if (initialIndex === lastIndex) {
        initialIndex = (initialIndex + 1) % songs.length;
      }
    } else {
      initialIndex = 0;
    }

    const initialTime = 0;
    const shouldAutoplay = savedState ? savedState.isPlaying : true;


    activeIndexRef.current = initialIndex;
    skipNextIndexEffectRef.current = true;
    setCurrentIndex(initialIndex);
    setCurrentTime(initialTime);
    setIsPlaying(shouldAutoplay);

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      persistState();
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
          .catch(() => {
            setIsPlaying(false);

            const resumeOnInteraction = async () => {
              try {
                await audio.play();
                setIsPlaying(true);
                persistState();
              } catch {
                setIsPlaying(false);
              } finally {
                window.removeEventListener("click", resumeOnInteraction);
                window.removeEventListener("keydown", resumeOnInteraction);
                window.removeEventListener("touchstart", resumeOnInteraction);
              }
            };

            if (typeof window !== "undefined") {
              window.addEventListener("click", resumeOnInteraction, { once: true });
              window.addEventListener("keydown", resumeOnInteraction, { once: true });
              window.addEventListener("touchstart", resumeOnInteraction, { once: true });
            }
          });
      }
    };

    const onError = () => {
      setLoadError(`Missing file: ${songs[activeIndexRef.current].src}`);
      setIsPlaying(false);
    };

    const onEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    };

    const onBeforeUnload = () => {
      persistState();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

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
      audio.removeEventListener("ended", onEnded);

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

  useEffect(() => {
    if (typeof document !== "undefined") {
      const s = songs[currentIndex];

      // Trigger fade out
      document.documentElement.classList.add('is-changing');

      // Wait for fade out to complete before changing images
      const timer = setTimeout(() => {
        if (s && s.colors) {
          document.documentElement.style.setProperty("--accent-primary", s.colors.primary);
          document.documentElement.style.setProperty("--accent-secondary", s.colors.secondary);
          document.documentElement.style.setProperty("--accent-light", s.colors.light);
        }
        if (s && s.bgImage) {
          document.documentElement.style.setProperty("--hero-bg", s.bgImage);
        }
        if (s && s.globalBgImage) {
          document.documentElement.style.setProperty("--global-bg", s.globalBgImage);
        }

        // Trigger fade in
        document.documentElement.classList.remove('is-changing');
      }, 500); // Matches the 0.5s CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
      persistState();
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      isPlayingRef.current = true;
      setLoadError("");
      persistState();
    } catch {
      setIsPlaying(false);
      isPlayingRef.current = false;
      persistState();
    }
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    persistState();
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    persistState();
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
          <div className="thumbnail" style={{ background: currentSong.colors.primary }} />
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
          background: var(--panel-bg);
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
          border: 2px solid var(--accent-primary);
          opacity: 0.8;
          transition: border-color 0.5s ease;
        }

        .floatingButton.spinning {
          animation: spin 2.5s linear infinite;
        }

        .vinylCenter {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-primary);
          transition: background-color 0.5s ease;
        }

        .playerPopup {
          position: fixed;
          right: 24px;
          bottom: 92px;
          z-index: 9998;
          width: 280px;
          background: var(--panel-bg);
          color: #ffffff;
          border: 1px solid var(--accent-primary);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(12px) scale(0.96);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.24s ease, transform 0.24s ease, border-color 0.5s ease;
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
          transition: background-color 0.5s ease;
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
          background: var(--accent-primary);
          border-radius: inherit;
          transition: width 0.1s linear, background-color 0.5s ease;
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
          color: var(--accent-primary);
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
          background: transparent;
          color: #ffffff;
          border-radius: 10px;
          padding: 8px 6px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .controls button:hover {
          border-color: var(--accent-primary);
          background: rgba(255,255,255,0.1);
        }

        .controls .playButton {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .controls .playButton:hover {
          filter: brightness(1.2);
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
