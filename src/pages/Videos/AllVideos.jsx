import { Delete, Edit } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, {Fragment} from 'react'
import { Link, useLoaderData } from 'react-router'

const AllVideos = () => {
    const videos = useLoaderData();
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



                    {videos.map(vid =><Fragment key={vid.id}>
                        <Grid size={3} >
                            {vid.title}
                        </Grid>
                        <Grid size={3} >
                            <Link to={vid.id}>View</Link>
                        </Grid>
                        <Grid size={3}>
                            <Link to={`edit/${vid.id}`}> 
                            <Edit/>
                            </Link>
                        </Grid>
                        <Grid size={3} >
                            <Link to={`delete/${vid.id}`}><Delete/></Link>
                        </Grid>
                        </Fragment>
                    )}
          </Grid>
        </>
    )
}

export default AllVideos

export const loader = async () => {
    const { data } = await axios.get("http://localhost:3000/videos");

    return data;
}
