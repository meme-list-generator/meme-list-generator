import { useState } from "react";

export default function MemeList(props) {

    const [edit, setEdit]  = useState(true)
    function editHandler(){
        setEdit(prevEdit => !prevEdit)
    }
    

    return (
        
        <div className="meme">
            <img
                src={props.info.url}
                className="meme-image"
            />
            <h2 className="meme-text top">{props.info.topText}</h2>
            <h2 className="meme-text bottom">{props.info.bottomText}</h2>

            {!edit && 
                <input 
                    placeholder={props.info.topText}
                    type="text"
                />
            }

            {!edit && 
                <input 
                    placeholder={props.info.bottomText}
                    type="text"
                />
            }

            {edit && 
                <button
                    onClick={editHandler}
                >Edit</button>}

            {!edit &&
                <button
                    onClick={editHandler}
                >Save</button>}
                

            <button
                onClick={() => props.delete(props.info.id)}
            >Delete</button>
        </div>
    )
}