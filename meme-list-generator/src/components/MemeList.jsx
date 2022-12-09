import React from "react"

export default function MemeList(props) {

    console.log(props.data)
    return (
        <div className="meme">
            <img
                src={props.data.url}
                className="meme-image"
            />
            <h2 className="meme-text top">{props.data.topText}</h2>
            <h2 className="meme-text bottom">{props.data.bottomText}</h2>
        </div>
    )
}