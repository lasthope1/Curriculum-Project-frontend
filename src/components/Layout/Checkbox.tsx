
import {useState}  from 'react';
import '../../styles/Checkbox.css';

type FiltersOption = {
    filterLists: object[]
    activeFilter: string[]
}

const filterCheckbox: FiltersOption = {
    filterLists: [
        {
            id: '1',
            name: 'Completed',
            value: 'COMPLETED'
        },
        {
            id: '2',
            name: 'In process',
            value: 'INPROCESS'
        },
        {
            id: '3',
            name: 'Pending',
            value: 'PENDING'
        }
    ],
    activeFilter: ['Completed', 'InProcess', 'Pending']
}

function CompletedCheckbox(param: { isChecked: boolean, onChange: (filter: string ,activeFilterList: string[]) => void }){ 

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={param.isChecked} 
                onChange={() => param.onChange('Completed',filterCheckbox.activeFilter)}/>
            <span className='Completed'>Completed</span>
        </label>
    )
}

function InProcessCheckbox(param: { isChecked: boolean, onChange: (filter: string ,activeFilterList: string[]) => void }){

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={param.isChecked}
                onChange={() => param.onChange('InProcess', filterCheckbox.activeFilter)}/> 
            <span className='In-process'>In process</span>
        </label>
    )
}

function PendingCheckbox(param: { isChecked: boolean, onChange:(filter: string ,activeFilterList: string[]) => void}){

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={param.isChecked} 
                onChange={() => param.onChange('Pending', filterCheckbox.activeFilter)}/> 
            <span className='Pending'>Pending</span>
        </label>
    )
}

export default function Checkbox(param: {Callback: (activeFilterList: string[]) => void}) {

    const [checkCom, toggleCom] = useState(true);
    const [checkInP, toggleInP] = useState(true);
    const [checkPend, togglePend] = useState(true);
    
    function onFilterChange(filter: string, filterList: string[]){
        if (filterList.includes(filter)) {
            const filterIndex: number = filterList.indexOf(filter);
            filterCheckbox.activeFilter.splice(filterIndex, 1);
        } else {
            filterCheckbox.activeFilter = [...filterList, filter];
        }
        
        if (filter === 'Completed'){
            toggleCom(filterCheckbox.activeFilter.includes(filter));
        }else if(filter === 'InProcess'){
            toggleInP(filterCheckbox.activeFilter.includes(filter));
        }else{
            togglePend(filterCheckbox.activeFilter.includes(filter));
        }

        param.Callback(filterCheckbox.activeFilter);
    }
    
  return (
    <>
        <div className='Checkbox'>
            <CompletedCheckbox isChecked={checkCom} onChange={onFilterChange}/>
            <InProcessCheckbox isChecked={checkInP} onChange={onFilterChange}/>
            <PendingCheckbox isChecked={checkPend} onChange={onFilterChange}/>
        </div>
    </>
  );
}
