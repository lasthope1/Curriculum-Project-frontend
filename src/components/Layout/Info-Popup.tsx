// import React ,{Component} from 'react';
import Question from './question';
import '../../styles/Popup.css';


export default function Popup(props : any) {
    let value : string = "";
    
    function saveClicked() {
        props.parentCallback(value);
        props.setTrigger(false);
    }
    
    function handleCallback(chileValue : string) {
        value = chileValue;
        console.log(`Chosen ${value}`);
    }

    return (props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                <nav className="nav-question"> <h3 className="question">Question</h3> </nav>

                <Question parentCallback={handleCallback}/>
                <form>
                    <button className="save-btn" onClick={saveClicked}>save</button>
                    <button className="cancel-btn" onClick={()=> props.setTrigger(false)}>cancel</button>
                </form>
            </div>
        </div>
    :null;
}