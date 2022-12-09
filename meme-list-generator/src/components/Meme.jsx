
import { useState, useEffect } from "react"
import axios from "axios"
import MemeList from "./MemeList"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: ""
    })
    const [memeImages, setMemeImages] = useState([])
    const [count, setCount] = useState(0)
    const [arrOfMemes, setArrOfMemes] = useState([])
    
    function getMemeImages() {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                setMemeImages(res.data)
                console.log(res.data)
            })
    }

    useEffect(() => {
        getMemeImages()
    }, [count])

    function handleChange(e) {
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function countMemes() {
        setCount(prevCount => prevCount + 1)
        setMeme(prevMeme => ({
            ...prevMeme, 
            url: memeImages.data.memes[count].url
        }))
    }

    function addMemeToList() {
        setArrOfMemes(prevArrOfMemes => [...prevArrOfMemes, meme])
    }

    function testing() {
        console.log(arrOfMemes)
    }

    const memeListElement = arrOfMemes.map(data => <MemeList data={data}/>)
    
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
                    onClick={countMemes}
                >
                    Next image 🖼
                </button>
                <button onClick={testing}>TEST</button>
                <button 
                    className="form-button" 
                    onClick={addMemeToList}
                >
                    Add this meme to your collection
                </button>
            </div>
            <div className="meme">
                <img 
                    src={memeImages?.data?.memes[count].url} 
                    className="meme-image" 
                />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            <div className="meme-list">
                {memeListElement}
            </div>
        </main>
    )
}
