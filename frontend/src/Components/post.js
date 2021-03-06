import React from "react";
import '../css/post.css';

import Avatar from "./avatar";
import PostModale from "./postModale";
import Comments from "./comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons'


import { useState, useEffect } from "react";
import OptionsControl from "./optionsControl";

export default function Post(props) {
    const [isInEditMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.post.title);
    const [text, setText] = useState(props.post.text);
    const [numberOfLikes, SetNumberOfLikes] = useState(0);
    const [comments, setComments] = useState([]); // All comments
    const [isFolded, setIsFolded] = useState(true);
    const [comment, setComment] = useState();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [image, setImage] = useState({preview:"", data:""});
    const [caption, setCaption] = useState(props.post.caption);


    const getFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data:  e.target.files[0],
        }
        setImage(img);
    }

    const toogleEditMode = () => {
        setEditMode(!isInEditMode)
    }

    const deletePost = () => {
        fetch("https://mc-groupomania.herokuapp.com/api/posts", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: props.post.postID,
            }),
        }).then(() => props.getAllPosts())
    }
    
    let formData = new FormData();
    formData.append('id', props.post.postID);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('caption', caption);
    formData.append('image', image.data);

    const modifyPost = () => {
        fetch("https://mc-groupomania.herokuapp.com/api/posts", {
            method: "PUT",
            credentials: "include",
            //headers: { "Content-Type": "application/json" },
            body: formData,
        })
            .then(() => {
                props.getAllPosts()
                setEditMode();
            })

    }
    const likeUnlike = () => {
        fetch(`https://mc-groupomania.herokuapp.com/api/likes/${props.post.postID}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.post.postID,
            }),
        })
            .then(getNumberOfLikes)
    }

    const getNumberOfLikes = () => {
        fetch(`https://mc-groupomania.herokuapp.com/api/likes/${props.post.postID}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(likes => SetNumberOfLikes(likes.numberOfLikes));
    }
    //Comments

    const getAllComments = () => {
        fetch(`https://mc-groupomania.herokuapp.com/api/comments/${props.post.postID}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                credentials: "include",
            },
        })
            .then(res => res.json())
            .then(value => {
                if (value.comments !== undefined) {
                    setComments(value.comments)

                } else {
                    console.log("aucun commentaires");
                }
            }
            )
            .catch((err) => console.log(err))
    }

    const postComment = () => {
        fetch(`https://mc-groupomania.herokuapp.com/api/comments/${props.post.postID}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.post.postID,
                text: comment,
            }),
        })
            .then(() => {
                getAllComments();
                setShowCommentInput(!showCommentInput);
                setIsFolded(false);
            })
    }
    let commentText = "";
    if (comments.length < 2) {
        commentText = " commentaire";
    } else {
        commentText = " commentaires";
    }
    useEffect(() => {
        getNumberOfLikes();
        getAllComments();
        //getUserAvatar();
    },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [])

        if(isInEditMode) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
    
        }
    return (
        <div>
            <div className="post">
                <div>
                    {
                        isInEditMode ? //Modify post is open 
                            <div>
                                <div className="modale_background_overlay" style={{"top": "auto", "marginTop": "-1200px"}}></div>
                                <PostModale style={{"margin-top": "30px"}}
                                            getFile={getFile} 
                                            toogleEditMode={toogleEditMode} 
                                            image={image} 
                                            setTitle={setTitle} 
                                            text={props.post.text} 
                                            title={props.post.title} 
                                            caption={props.post.caption} 
                                            setText={setText} 
                                            post={modifyPost} 
                                            setCaption={setCaption}
                                            actionText="Modifier le post" />
                            </div>
                            :""}
                    <div>
                        <div className="postHeader">
                            <div className="postOwner">
                                <Avatar avatar={props.post.avatarURL} altText={`avatar de ${props.post.username}`}/>
                                <p>{props.post.username}</p>
                            </div>
                            {props.username === props.post.username || localStorage.getItem("privilege") === "1" ?
                            
                                <OptionsControl modify={toogleEditMode} delete={deletePost}/>
                                : ""
                            }
                        </div>
                        <hr />

                        <div className="postContent">
                            <h3>{props.post.title}</h3>
                            <p>{props.post.text}</p>
                            {props.post.mediaUrl != null ?
                            <img className="postImage" alt={props.post.caption} src={`http://localhost:3001/images/${props.post.mediaUrl}`}></img>
                            :""
                        }
                            <div className="socialDetails">
                                <span className="numberOfLikes">
                                    <span className="numberOfLikes--circle">
                                        <FontAwesomeIcon className="numberOfLikes--thumb" icon={faThumbsUp} />
                                    </span>
                                    {numberOfLikes}
                                </span>
                                <button className="comments" onClick={() => setIsFolded(!isFolded)}>
                                    <p>{comments.length}{commentText}</p></button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div >
                <hr />
                <div className="socialActions">

                    <button className="socialActions--button" onClick={likeUnlike}>
                        <FontAwesomeIcon className="socialActions--icons" icon={faThumbsUp} />
                        <span>J'aime</span>
                    </button>

                    <button className="socialActions--button" onClick={() => setShowCommentInput(!showCommentInput)}>
                        <FontAwesomeIcon className="socialActions--icons" icon={faMessage} />
                        <span>Commenter</span>
                    </button>
                </div>
            </div>
            {
                showCommentInput ?
                    <div className="commentInput" >
                        <input placeholder="??crire un commentaire" type={"text"} onChange={(e) => setComment(e.target.value)} />
                        <button className="commentInput--button" onClick={postComment}>Valider</button>
                    </div>
                    : ""
            }
            <Comments username={props.username} postId={props.post.id} isFolded={isFolded} comment={comment} comments={comments} getAllComments={getAllComments} />
        </div>
    );
}