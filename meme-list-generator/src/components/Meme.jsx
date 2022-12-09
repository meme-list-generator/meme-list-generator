import MemeLIst from "./MemeList"
import React, { useState, useEffect } from "react"


export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "http://i.imgflip.com/1bij.jpg"
    })
    const [memeImages, setMemeImages] = useState([])
    const [count, setCount] = useState(0)
    const [arrOfMemes, setArrOfMemes] = useState([])
    const [memeList, setMemeList] = useState([])

    React.useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => setArrOfMemes(res.data.data.memes))
    }, [])
    
    function getMemeImages() {
        const randomNumber = Math.floor(Math.random() * arrOfMemes.length)
        const imgUrl = arrOfMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            url: imgUrl
        }))
    }
    
    console.log(arrOfMemes.length)

    // useEffect(() => {
    //     getMemeImages()
    // }, [count])

    function handleChange(e) {
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    // function countMemes() {
    //     setCount(prevCount => prevCount + 1)
        
    // }

   
    function addMemeToList() {
        setMemeList(prevState => [...prevState, meme])
    }

    const savedMemes = memeList.map(info =>(
        <MemeLIst
            key = {info.url} 
            info = {info}
        />
    ))


    function testing() {
        console.log(arrOfMemes)
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top Text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form-button"
                    onClick={getMemeImages}
                >
                    Next image 🖼
                </button>
                {/* {<button onClick={testing}>TEST</button>} */}
                <button 
                    className="form-button" 
                    onClick={addMemeToList}
                >
                    Add this meme to your collection
                </button>
            </div>
            <div className="meme">
                <img 
                    src={meme.url} 
                    className="meme-image" 
                />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            <div className="meme-list">{savedMemes}</div>
        </main>
    )
}
