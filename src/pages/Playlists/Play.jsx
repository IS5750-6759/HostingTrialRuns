import VideoPlaylist from "../../components/Playlist/VideoPlaylist";
import VideoPlayer from "../../components/Playlist/VideoPlayer";
import Progress from "../../components/Playlist/Progress";
import { useSelector } from "react-redux";

const Play = () => {
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);
  return (
    <>
      {!loading && !error && (
        <>
          <VideoPlayer />
          <Progress />
          <VideoPlaylist />
        </>
      )}
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
    </>
  );
};

export default Play;
