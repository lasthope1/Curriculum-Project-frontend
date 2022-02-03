// import React ,{Component} from 'react';
import Question from './question';
import '../../styles/Popup.css';


export default function 
    Popup(props : {
                    setTrigger: (btnPopup: boolean) => void, 
                    parentCallback: (planSelected: string) => void, 
                    toggle: boolean, handleState: string
                }
        )
{

    var value : string = props.handleState;
    
    function saveClicked() {
        props.parentCallback(value);    
        props.setTrigger(false);
    }
    
    const handleCallback = (chileValue: string):string => value = chileValue; 

    return (props.toggle) ? 
        <div className="popup-bg">
            <div className="popup-box">
                <nav className="nav-question"> 
                    <h3 className="question">Question</h3> 
                </nav>
                <Question 
                    parentCallback={handleCallback} 
                    handleState={props.handleState}
                />
                <button className="save-btn" onClick={saveClicked}>save</button>
                <button className="cancel-btn" onClick={()=> props.setTrigger(false)}>cancel</button>
            </div>
        </div>
    :null;
}