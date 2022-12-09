import { useState } from "react";

export default function MemeLIst(props){
    return(
        <div>
            <img src={props.info.url}/>
            <h2>{props.info.topText}</h2>
            <h2>{props.info.bottomText}</h2>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}