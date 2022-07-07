import React from "react";
import Post from './post';
import NewPost from './NewPost';

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import '../css/posts.css'


export default function Posts(props) {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const getAllPosts = () => {
      fetch("https://mc-groupomania.herokuapp.com/api/posts", { 
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
              } else { // User is not loggedin, we redirect to login page
                localStorage.clear();
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
          <NewPost getAllPosts={getAllPosts}/>
          </div>
          {posts.map( (post, key) => {
            return (<Post key={key} post={post} username={props.username} getAllPosts={getAllPosts}/>)  
          })}  
      </div>
    );
}