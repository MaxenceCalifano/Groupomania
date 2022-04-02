import React from "react";
import Post from './post';
import NewPost from './NewPost';
import Profile from "./profile";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import '../css/posts.css'

export default function Posts(props) {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const getAllPosts = () => {
      fetch("http://localhost:3000/api/posts", { 
        method: "GET",
        credentials: "include",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
            credentials: "include",
        },
    })    
          .then( res => res.json())
          .then(value => {
              if(value.posts !== undefined) {
                setPosts(value.posts)

              } else {
                navigate("/login/signIn");
              }
            } 
          )
          .catch((err) => console.log(err))
    }
    useEffect( () => getAllPosts(), 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [])
    return (
        <div className="posts">
          <div className="profileAndNewPost" >
          <Profile/>
          <NewPost getAllPosts={getAllPosts}/>
          </div>

          {posts.map( (post, key) => {
            return (<Post key={key} post={post} username={props.username} getAllPosts={getAllPosts}/>)  
          })}  
      </div>
    );
}