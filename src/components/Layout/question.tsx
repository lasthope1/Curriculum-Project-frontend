import { Fragment, useState } from 'react';

const RadioBtn = (props: {name: string, onChange: () => void, value: boolean} ) => {
    return (
        <label>
             <input type="radio" onChange={props.onChange} checked={props.value}/>
        </label>
    )
}

export default function Question(props: {parentCallback: (planSelected: string) => void, handleState: string}){
    const [value, setValue] = useState(props.handleState);

    function handleNorChange(): void {
        setValue("Normal Plan");
        props.parentCallback("Normal Plan");
    };

    function handleCoopChange(): void {
        setValue("Cooperative Plan")
        props.parentCallback("Cooperative Plan"); 
    };

    return (
         <Fragment>
             <p>What is your Education Plan ?</p>
             <form method='post'>
                <RadioBtn 
                    name="Normal Plan"
                    value={value === "Normal Plan"} 
                    onChange={handleNorChange}/>
                <label>Normal Plan<br/></label> 
                <RadioBtn 
                    name="Cooperative Plan"
                    value={value === "Cooperative Plan"} 
                    onChange={handleCoopChange}/>
                <label>Cooperative Plan<br/></label>
             </form>
         </Fragment>
    );
}


