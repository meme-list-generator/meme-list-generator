import React, { useState, useEffect } from "react"
import axios from "axios"
import MemeList from "./MemeList"



export default function Meme() {

    const [count, setCount] = useState(0)

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "",
        id: "",
    })


    const [arrOfMemes, setArrOfMemes] = useState([])
    const [memeList, setMemeList] = useState([])



    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                setArrOfMemes(res.data.data.memes)
                setMeme(prevMeme => ({
                    ...prevMeme,
                    url: res.data.data.memes[0].url,
                    id: res.data.data.memes[0].id
                }))
            })
    }, [])

    function getMemeImages() {
        const randomNumber = Math.floor(Math.random() * arrOfMemes.length)
        const imgUrl = arrOfMemes[randomNumber].url
        const imgId = arrOfMemes[randomNumber].id
        setMeme(prevMeme => ({
            ...prevMeme,
            url: imgUrl,
            id: imgId
            
        }))

    }

    function handleChange(e) {
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function addMemeToList() {

        setMemeList(prevState => {

            if (prevState.find(item => item.id === meme.id)) {
                return [...prevState]
            } else {
                return [...prevState, meme]
            }
        })
    }

    const deleteBtn = id => {
        setMemeList(prevMemeList => {
            return prevMemeList.filter(meme => meme.id !== id)
        })
    }
    
    function updateMeme(id, editField){
        setMemeList(prevMemeList => {
            return prevMemeList.map(item => {
                if(item.id === id){
                    return {
                        ...item,
                        ...editField
                    }
                } 
                return item 
            })
        })
    }

    const savedMemes = memeList.map(info => (
        <MemeList
            info={info}
            key={info.id}
            delete = {deleteBtn}
            edit = {updateMeme}
        />
    ))

    return (
        <main>
            <div className="form-meme">
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
                    Next image ????
                </button>
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
