
import { useState, useEffect } from "react"
import axios from "axios"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "http://i.imgflip.com/1bij.jpg"
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
                    Get a new meme image 🖼
                </button>
                <button onClick={testing}>TEST</button>
                <button onClick={addMemeToList}>Add to Collection</button>
            </div>
            <div className="meme">
                <img src={memeImages?.data?.memes[count].url} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>

