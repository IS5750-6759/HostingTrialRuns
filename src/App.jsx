import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router";
import "./App.css";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import axios from "axios";
import supabase from "./utils/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeData } from "./store/action";
import useYouTubeInit from "./hooks/useYouTubeInit";


const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    Component: DefaultLayout,
    loader: async () => {
      const token = await supabase.auth.getUser();
      return token.data.user;
    },
    children: [
      { index: true, Component: Home },
      {
        path: "login",
        lazy: async () => {
          {
            return await import("./pages/Auth/SignInWithGoogle");
          }
        },
      },
      {
        path: "logout",
        loader: async () => {
          await supabase.auth.signOut();
          return redirect("/");
        },
      },
      {
        path: "playlist",
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("./pages/Playlists/ViewAll");
              return { Component: module.default, loader: module.loader };
            },
          },
          { path: ":id", element: <h1>View Specific Playlist</h1> },
          { path: "create/:id", element: <h1>Create new playlist</h1> },
          { path: "edit/:id", element: <h1>Edit specific playlist</h1> },
          { path: "delete/:id", element: <h1>Delete specific playlist</h1> },
          {
            path: "watch/:id",
            lazy: async () => {
              const {default:Component} = await import("./pages/Playlists/Play");
              return {Component}
            },
          },
        ],
      },
      {
        path: "video",
        children: [
          { index: true, 
            
            lazy:async ()=>{
              const module = await import("./pages/Videos/AllVideos");
              return {Component:module.default,loader:module.loader}
            }
            
             },
          { path: ":id", element: <h1>View Specific Video</h1> },
          { path: "create/:id", element: <h1>Create new Video</h1> },
          {
            path: "edit/:id",

            lazy:async ()=>{
              const module = await import("./pages/Videos/Edit");
              return {Component:module.default,...module}
            }
          },
          {
            path: "delete/:id",
            loader: async ({ params }) => {
              try {
                await axios.delete("http://144.24.55.88:3000/videos/" + params.id);
              } catch (e) {
                console.log(e);
              }
              return redirect("/video");
            },
          },
          { path: "watch/:id", element: <h1>Watch a specific Video</h1> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeData("http://144.24.55.88:3000/videos"));
  }, [dispatch]);

  useYouTubeInit();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
