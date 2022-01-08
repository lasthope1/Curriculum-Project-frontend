import { Fragment, useState } from 'react';

const RadioBtn = (props: any ) => {
    return (
        <label>
             <input type="radio" onChange={props.onChange} checked={props.value}/>
        </label>
    )
}

export default function Question({parentCallback}: any){
    const [value, setValue] = useState("normal");

    const handleNorChange = () => {
        setValue("normal");
        parentCallback("normal");
    };

    const handleCoopChange = () => {
        setValue("co-op");
        parentCallback("co-op");
    };

    return (
         <Fragment>
             <p>What is your Education Plan ?</p>
             <form method='post'>
                {/* <RadioBtn label="normal" value={value === "normal"} onChange={handleNorChange}/>Normal Plan<br/>
                <RadioBtn label="co-op" value={value === "co-op"} onChange={handleCoopChange}/>Co-operative Plan<br/> */}
                <input type="radio" value="1"name="pet"/>dog
                <input type="radio" value="2"name="pet"/>cat
                <input type="radio" value="3"name="pet"/>bird
             </form>
         </Fragment>
    );
}


