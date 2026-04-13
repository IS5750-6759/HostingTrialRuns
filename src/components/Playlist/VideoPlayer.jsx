import { useContext, useRef, useEffect } from "react";
import { VideosContext } from "../../store/VideosContext";
import { useState } from "react";
import useYouTubePlayer from "../../hooks/useYouTubePlayer";
import useVideoProgress from "../../hooks/useVideoProgress";
import useLoadNextVideo from "../../hooks/useLoadNextVideo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moveToNextVideo } from "../../store/playlist";
import { setWatchPercent } from "../../store/video";

export default function YouTubePlayer() {
  // const {
  //   videos,
  //   currentVideoIndex,
  //   setCurrentVideoIndex,
  //   setWatchPercent: setProgress,
  // } = useContext(VideosContext);

  const videos = useSelector(state=>state.playlists.videos)
  const currentVideoIndex = useSelector(state=>state.playlists.currentVideoIndex)
  const dispatch = useDispatch();
  
  const onVideoEnd = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      // If the video has ended either increment the video or start the playlist over
      // setCurrentVideoIndex((prev) => {
      //   return (prev + 1) % videos.length;
      // });
      dispatch(moveToNextVideo())
    }
  };
  // Grab the current video id from the url
  const videoId = videos[currentVideoIndex].youtubeUrl.split("/").pop();
  // Initialize the video player
  const { playerRef, containerRef, playerReady } = useYouTubePlayer(
    videoId,
    onVideoEnd,
  );
  // Subscribe to progress updates.
  useVideoProgress(videoId, playerReady, playerRef, (elapsed, total) =>
    // setProgress((Number(elapsed) / Number(total)) * 100),
    dispatch(setWatchPercent((Number(elapsed) / Number(total)) * 100))
  );
  // Load next video on success
  useLoadNextVideo(playerRef, playerReady, videoId);

  // User controls
  const play = () => {
    playerRef.current.playVideo();
  };
  const pause = () => playerRef.current.pauseVideo();
  const restart = () => playerRef.current.seekTo(0);
  const speedUp = () => {
    const currentSpeed = playerRef.current.getPlaybackRate();
    playerRef.current.setPlaybackRate(currentSpeed + 0.25);
  };

  return (
    <div>
      <div ref={containerRef}></div>
      {playerReady && (
        <>
          <button onClick={speedUp}>{">>"}</button>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
          <button onClick={restart}>Restart</button>
        </>
      )}
    </div>
  );
}
