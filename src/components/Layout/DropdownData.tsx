import {useState} from 'react';
import '../../styles/Dropdown.css'

const Dropdown_btn = (props: {children: JSX.Element, onChange: boolean}) => {
    const[open, setOpen] = useState(false);

    const tagClick = (isBtnClicked: boolean, isLabelClicked: boolean) => {
        if(isBtnClicked || isLabelClicked){
            setOpen(true);
        }else{
            setOpen(false);
        }
    }

    return (
        <div className="dropdown-btn">
            <i className="gg-play-button" onClick={() => setOpen(!open)} />
            <div className="dropdown-box">
                {open && props.children}
            </div>
        </div>
    )
}

export default Dropdown_btn;

