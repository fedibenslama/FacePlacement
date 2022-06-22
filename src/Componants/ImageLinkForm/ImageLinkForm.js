import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onImageSubmit}) =>{
    return(
        <div>
            <p className="f3 ">
                {"This App Will Detect Faces In Your Pics"}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="pa2 f4 w-70 center" type='tex' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onImageSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm