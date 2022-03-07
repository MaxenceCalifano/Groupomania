import React from "react";
import Post from './post';

import { useNavigate } from "react-router";


import { useState, useEffect } from "react";

export default function Posts(props) {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect( () => {
     // const userUUID = jwt.verify(req.cookies.access_token, "token");

      fetch("http://localhost:3000/api/", { 
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
                navigate("/login");
              }
            } 
          )
          .catch((err) => console.log(err))
    }, [])
    return (
        <div>
        {posts.map( (post, key) => {
          return (<Post key={key} title={post.title} text={post.text} />)  
        })}  
      </div>
    );
}