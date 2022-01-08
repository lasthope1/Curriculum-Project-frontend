import React, {useState} from 'react';
import styled from 'styled-components';

import Question from './question';
import Popup from './Info-Popup';

const NavigationWrapper = styled.nav`
    background: #9A3CF6;
    display: flex;
    padding: 10px 32px;
    align-items: center;
    justify-content: space-between;
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
    var EduPlan : string = "Normal Plan";
    
    function setEduPlan(plan : string) {
        (plan === "normal") ? EduPlan = "Normal Plan"
        : EduPlan = "Co-operative Plan";
        console.log(plan);
        console.log(`Saved for ${EduPlan}`);
    }
    
    return (
        <NavigationWrapper className='navbar'>
            <PlanButton onClick={() => setButtonPopup(true) }>{EduPlan}</PlanButton>
            <div>
                <i className='GPA'>student'gpa | </i>
                <i className='circle' >account_circle</i>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} parentCallback={setEduPlan}/>
        </NavigationWrapper>
    )
}