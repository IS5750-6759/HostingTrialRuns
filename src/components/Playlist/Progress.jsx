import { useContext } from "react";
import { useSelector } from "react-redux";
// import { VideosContext } from "../../store/VideosContext";




const Progress = () => {
//       const {watchPercent } = useContext(VideosContext);
const watchPercent = useSelector(state=>state.video.watchPercent)
    
  return (
         <progress value={watchPercent} max={100}/>
  )
}

export default Progress
