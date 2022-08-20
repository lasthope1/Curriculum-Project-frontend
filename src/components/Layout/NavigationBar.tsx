import {useState} from 'react';
import styled from 'styled-components';
import Popup from './Info-Popup';

const NavigationWrapper = styled.nav`
    background: #674B91;
    position: fixed;
    width: 100%;
    height: var(--nav-size);
    display: flex;
    padding: 10px 32px;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    
    top: 0px;
    left: 0px;
`;

const Button = styled.button`
    background: transparent;
    display: box;
    width: 100%;
    height: 45px;
    margin: 5px;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding : 8px;
`;

export default function NavigationBar(){

    const [Popup_btn, setPopup_btn] = useState(false);
    const [EduPlan, setEduPlan] = useState("Normal Education Plan");
    // const planState : string = setPlanState(EduPlan);

    // function setPlanState(planSelected: string): string {
    //     if(planSelected === "Normal Education Plan"){
    //         return "Normal Education Plan"
    //     }else{
    //         return "Cooperative Education Plan"
    //     }
    // }
    
    return (
        <>
            <NavigationWrapper className='navbar'>
                <div>
                    <Button className='Plan-btn' onClick={() => setPopup_btn(true)}
                            style={
                                {
                                    background: "rgb(186,174,210)", 
                                    backgroundImage: "linear-gradient(45deg, rgba(186,174,210,1) 0%, rgba(163,186,218,1) 100%)"
                                }
                            }>
                        {EduPlan}
                    </Button>
                </div>
                <div>
                    <i className='GPA'>student'gpa | </i>
                    <i className='circle'>account_circle</i>
                </div>
            </NavigationWrapper>
            <Popup 
                toggle={Popup_btn} 
                setToggle={setPopup_btn} 
                parentCallback={setEduPlan}
                handleState={EduPlan}
            />
        </>
    )
}