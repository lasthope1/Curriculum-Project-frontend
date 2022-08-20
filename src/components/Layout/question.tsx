import React, { useState } from 'react';
import {useQuery} from '@apollo/client';
import {StudentQuestion_QUERY} from '../queryGraphQL/queryQuestion';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Question(props: {parentCallback: (planSelected: string) => void, handleState: string}){
    const [value, setValue] = useState(props.handleState);
    const {loading, error, data} = useQuery(StudentQuestion_QUERY);

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>fail to fetch, Sorry...</div> 
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setValue((event.target as HTMLInputElement).value);
        props.parentCallback((event.target as HTMLInputElement).value)
    };

    return (
         <FormControl>
             <FormLabel>{data.question.question}</FormLabel>
             <RadioGroup
                name='Plan'
                defaultValue="female"
                value={value}
                onChange={handleChange} 
             >
                {
                    data.question.choice.map((choice: String, index: number) => (
                        <FormControlLabel key={index.toString()} value={choice} control={<Radio />} label={choice} />
                    ))
                }
             </RadioGroup>
         </FormControl>
    );
}


