import { useState } from "react";
import trollFace from "../images/troll-face.png"

export default function Header () {
    return (
        <div className="header-container">
            <img 
                src={trollFace}
                className="header-photo"
            />

        <h1>Meme Generator</h1>
        <h3>React Course - Project 3</h3>

        </div>
    )
}