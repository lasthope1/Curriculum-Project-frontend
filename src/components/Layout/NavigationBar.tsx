import {useState} from 'react';
import styled from 'styled-components';
import Popup from './Info-Popup';

const NavigationWrapper = styled.nav`
    background: #9A3CF6;
    height: var(--nav-size)
    display: flex;
    padding: 10px 32px;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
`;

const PlanButton = styled.button`
    background-color: white;
    width: 100px;
    margin: 0;
    outline: none;
    cursor: pointer;
    border: none;
`;

export default function NavigationBar(){

    const [buttonPopup, setButtonPopup] = useState(false);
    const [EduPlan, setEduPlan] = useState("Normal Plan");
    var planState : string = setPlanState(EduPlan);

    function setPlanState(planSelected: string): string {
        if(planSelected === "Normal Plan"){
            return "Normal Plan"
        }else{
            return "Cooperative Plan"
        }
    }
    
    return (
        <NavigationWrapper className='navbar'>
            <PlanButton onClick={() => setButtonPopup(true) }>{EduPlan}</PlanButton>
            {/* <div>
                <i className='GPA'>student'gpa | </i>
                <i className='circle' >account_circle</i>
            </div> */}
            <Popup 
                trigger={buttonPopup} 
                setTrigger={setButtonPopup} 
                parentCallback={setEduPlan}
                handleState={planState}
            />
        </NavigationWrapper>
    )
}