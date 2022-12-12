import { useState } from "react";

export default function MemeList(props) {

    const [isEditMode, setEdit]  = useState(false)
    
    function editHandler(){
        setEdit(prevEdit => !prevEdit)
    }

    function handleSave(){
        setEdit(false)
        props.edit(props.info.id, editMeme)
    }
    
    const [editMeme, setEditMeme] = useState({
        topText: props.info.topText,
        bottomText: props.info.bottomText
    })

    function memeInputHandler(e){
        const {name, value} = e.target
        setEditMeme(prevEditMeme => ({
            ...prevEditMeme,
            [name]: value
        }))
    }

    return (
        
        <div className="meme-container">
            <div className="meme"> 
                <img
                    src={props.info.url}
                    className="meme-image"
                />
                <h2 className="meme-text top">{props.info.topText}</h2>
                <h2 className="meme-text bottom">{props.info.bottomText}</h2>
            </div>
            <form className="form-list">
                {isEditMode && 
                    <input 
                        value={editMeme.topText}
                        type="text"
                        name="topText"
                        placeholder="edit top text"
                        className="edit-field top"
                        onChange={memeInputHandler}
                    />
                }

                {isEditMode && 
                    <input 
                        value={editMeme.bottomText}
                        type="text"
                        name="bottomText"
                        placeholder="edit bottom text"
                        className="edit-field bottom"
                        onChange={memeInputHandler}
                    />
                }

                {!isEditMode && 
                    <button
                        onClick={editHandler}
                        className="list-button edit"
                    >Edit</button>
                }

                {isEditMode &&
                    <button
                        onClick={handleSave}
                        className="list-button save"
                    >Save</button>
                }
                    
                <button
                    className="list-button delete"
                    onClick={() => props.delete(props.info.id)}
                >Delete</button>
            </form>
        </div>
    )
}