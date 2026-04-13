import React from 'react'
import { NavLink, useRouteLoaderData } from 'react-router'
import { Grid } from '@mui/material'
export const Navbar = () => {
    const user = useRouteLoaderData("root");

    return (
        <Grid container spacing={2}>

            <Grid size={3}>
                <NavLink to={"/"} end>Home</NavLink>
            </Grid>

            <Grid size={3}>

                <NavLink to={"/video"}>Videos</NavLink>
            </Grid>

            <Grid size={3}>

                <NavLink to={"/playlist"}>Playlists</NavLink>
            </Grid>

{!user && 
            <Grid size={3}>

                <NavLink to={"/login"}>Log In</NavLink>
            </Grid>
}

{user && 
            <Grid size={3}>

                <NavLink to={"/logout"}>Log Out</NavLink>
            </Grid>
}



        </Grid>
    )
}
