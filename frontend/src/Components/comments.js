import React from "react";

import Comment from "./comment";

import "../css/comments.css";

export default function Comments(props){

    return (
        <div>

            {
                props.isFolded ? ""
                         :
                         props.comments.map((comment, key) => {
                            return <Comment postId={props.postId}
                                            getAllComments={props.getAllComments}
                                            key={key}
                                            comment={comment}
                                            username={props.username}
                                            />
                        })
            }

</div>
    )
}

