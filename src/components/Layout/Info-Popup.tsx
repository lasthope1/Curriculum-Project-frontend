
import Question from './question';
import '../../styles/Popup.css';
import {useMutation} from '@apollo/client';
import { StudentUpdateQuestion_MUTATION } from '../queryGraphQL/queryQuestion';


export default function 
    Popup(props : {
                    setToggle: (btnPopup: boolean) => void, 
                    parentCallback: (planSelected: string) => void, 
                    toggle: boolean, 
                    handleState: string
                }
        )
{
    const [saveQuestion, {data, loading, error}] = useMutation(StudentUpdateQuestion_MUTATION, {
        variables: {
            answer: (props.handleState === 'Normal Education Plan') ? 'normal' : 'coop'
        }
    })

    var value : string = props.handleState;
    
    function saveClicked() {
        props.parentCallback(value);    
        props.setToggle(false);
        //saveQuestion()
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
                <button className="cancel-btn" onClick={()=> props.setToggle(false)}>cancel</button>
            </div>
        </div>
    :null;
}