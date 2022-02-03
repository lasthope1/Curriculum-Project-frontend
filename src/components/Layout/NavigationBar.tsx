import {useState} from 'react';
import styled from 'styled-components';
import Popup from './Info-Popup';

const NavigationWrapper = styled.nav`
    background: #674B91;
    position: fixed;
    width: 100%;
    height: var(--nav-size)
    display: flex;
    padding: 10px 32px;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    
    top: 0px;
    left: 0px;
`;

const PlanButton = styled.button`
    background-color: white;
    width: 100px;
    margin: 0;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding : 8px;
    background: rgb(186,174,210);
    background: linear-gradient(45deg, rgba(186,174,210,1) 0%, rgba(163,186,218,1) 100%);
`;

export default function NavigationBar(){

    const [Popup_btn, setPopup_btn] = useState(false);
    const [EduPlan, setEduPlan] = useState("Normal Plan");
    const planState : string = setPlanState(EduPlan);

    function setPlanState(planSelected: string): string {
        if(planSelected === "Normal Plan"){
            return "Normal Plan"
        }else{
            return "Cooperative Plan"
        }
    }
    
    return (
        <NavigationWrapper className='navbar'>
            <PlanButton onClick={() => setPopup_btn(true) }>{EduPlan}</PlanButton>
            {/* <div>
                <i className='GPA'>student'gpa | </i>
                <i className='circle' >account_circle</i>
            </div> */}
            <Popup 
                toggle={Popup_btn} 
                setTrigger={setPopup_btn} 
                parentCallback={setEduPlan}
                handleState={planState}
            />
        </NavigationWrapper>
    )
}