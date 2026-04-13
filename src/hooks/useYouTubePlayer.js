import { useRef,useEffect,useState } from "react";

const useYouTubePlayer = (videoId,onStateChange=(event)=>{})=>{
    const [playerReady, setPlayerReady] = useState(false);
    const playerRef = useRef();
    const containerRef = useRef();
  // When the page loads create the callback function so that the YouTube API can create the video.
  useEffect(() => {
    function createPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        // subscribe to specific events
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: onStateChange,
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => playerRef.current?.destroy();
  }, []);

  return {playerRef,containerRef,playerReady}
}

export default useYouTubePlayer