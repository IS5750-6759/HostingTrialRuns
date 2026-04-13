import axios from 'axios';
import React, {Fragment} from 'react'
import { useLoaderData,Link } from 'react-router'
import { Grid,Typography } from '@mui/material';
import { Edit,Delete } from '@mui/icons-material';

const ViewAll = () => {
    const playlistData = useLoaderData();
  return (
    <>
    
            <Grid container spacing={2}>

                        <Grid size={3}>
                            <Typography variant='h4'>

                            Name
                            </Typography>
                            </Grid>
                        <Grid size={3}>
                            <Typography variant='h4'>
                                
                            View
                            </Typography>
                            </Grid>
                        <Grid size={3}>
                            <Typography variant='h4'>
                                
                            Edit
                            </Typography>
                            </Grid>
                        <Grid size={3}>
                            <Typography variant='h4'>
                                
                            Delete
                            </Typography>
                            </Grid>



                    {playlistData.map(playlist =><Fragment key={playlist.id}>
                        <Grid size={3} >
                            <Link to={`watch/${playlist.id}`}>
                            {playlist.title}
                            </Link>
                        </Grid>
                        <Grid size={3} >
                            <Link to={playlist.id}>View</Link>
                        </Grid>
                        <Grid size={3}>
                            <Link to={`edit/${playlist.id}`}> 
                            <Edit/>
                            </Link>
                        </Grid>
                        <Grid size={3} >
                            <Link to={`delete/${playlist.id}`}><Delete/></Link>
                        </Grid>
                        </Fragment>
                    )}
          </Grid>
        </>
  )
}

export default ViewAll

export const loader = async ()=>{
    const {data} = await axios.get("http://localhost:3000/playlists");
    return data
}