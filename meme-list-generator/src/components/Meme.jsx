import React, { useState, useEffect } from "react"
import axios from "axios"
import MemeList from "./MemeList"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "https://i.imgflip.com/345v97.jpg"
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
    
    console.log(meme)

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

   

    // function countMemes() {
    //     setCount(prevCount => prevCount + 1)
        
    // }

   
    function addMemeToList() {
        return(
            setMemeList(prevState => [...prevState, meme])
        )
        
    }
    

    const savedMemes = memeList.map(info =>(
        <MemeList
            info = {info}
            key = {info.url}

        />
    ))


    // function testing() {
    //     console.log(arrOfMemes)
    // }

    // const memeListElement = arrOfMemes.map(data => <MemeList data={data}/>)
    
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
            {<div className="meme-list">{savedMemes}</div>}
        </main>
    )
}
