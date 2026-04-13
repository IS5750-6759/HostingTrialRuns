import { useContext } from "react"
import { VideosContext } from "../../store/VideosContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentVideoIndex } from "../../store/playlist";


const VideoPLaylist = () => {
    // const { videos, setCurrentVideoIndex,currentVideoIndex } = useContext(VideosContext);
    const dispatch = useDispatch()
    const videos = useSelector(state=>state.playlists.videos)
    const currentVideoIndex = useSelector(state=>state.playlists.currentVideoIndex)
    
    return (
        <div>
            {videos.map((video,index) => (
                <div key={video.id} onClick={() => dispatch(setCurrentVideoIndex(index))} style={index===currentVideoIndex?{fontWeight:"bold"}:{}}>
                    <p>{video.title}</p>
                </div>
            ))}
        </div>
    )
}

export default VideoPLaylist