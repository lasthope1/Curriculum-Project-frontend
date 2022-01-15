import {useState} from 'react';
//import '../../styles/Dropdown.css'

const Dropdown_btn = (props: {children: JSX.Element}) => {
    const[open, setOpen] = useState(false);

    return (
        <div className="dropdown-btn">
            <button className="icon-btn" onClick={() => setOpen(!open)}>
                Dropdown
            </button>

            {open && props.children}
        </div>
    )
}

export default Dropdown_btn;

