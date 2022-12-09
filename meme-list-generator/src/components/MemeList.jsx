import React from "react"

export default function MemeList(props) {

    return (
        <div className="meme">
            <img
                src={props.info.url}
                className="meme-image"
            />
            <h2 className="meme-text top">{props.info.topText}</h2>
            <h2 className="meme-text bottom">{props.info.bottomText}</h2>
        </div>
    )
}