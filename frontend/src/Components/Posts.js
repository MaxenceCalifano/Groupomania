import React from "react";
import Post from './post';



import { useState, useEffect } from "react";

export default function Posts(props) {

    const [posts, setPosts] = useState([]);

    useEffect( () => {
     // const userUUID = jwt.verify(req.cookies.access_token, "token");

      fetch("http://localhost:3000/api/", { 
        method: "GET",
        /* withCredentials: "true",
        mode: 'no-cors', */
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
  
              setPosts(value.posts)
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