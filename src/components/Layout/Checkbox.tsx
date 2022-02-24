
import {useState}  from 'react';
import '../../styles/Checkbox.css';

type FiltersOption = {
    filterLists: object[]
    activeFilter: string[]
}

const filterCheckbox: FiltersOption = {
    filterLists: [
        {
            name: 'Completed',
            value: 'COMPLETED'
        },
        {
            name: 'In process',
            value: 'INPROCESS'
        },
        {
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
            <a className='Completed'>Completed</a>
        </label>
    )
}

function InProcessCheckbox(param: { isChecked: boolean, onChange: (filter: string ,activeFilterList: string[]) => void }){

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={param.isChecked}
                onChange={() => param.onChange('InProcess', filterCheckbox.activeFilter)}/> 
            <a className='In-process'>In process</a>
        </label>
    )
}

function PendingCheckbox(param: { isChecked: boolean, onChange:(filter: string ,activeFilterList: string[]) => void}){

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={param.isChecked} 
                onChange={() => param.onChange('Pending', filterCheckbox.activeFilter)}/> 
            <a className='Pending'>Pending</a>
        </label>
    )
}

export default function Checkbox(param: {Callback: (activeFilterList: string[]) => void}) {

    param.Callback(filterCheckbox.activeFilter);

    const [checkCom, toggleCom] = useState(true);
    const [checkInP, toggleInP] = useState(true);
    const [checkPend, togglePend] = useState(true);
    
    function onFilterChange(filter: string, filterList: string[]){
        //console.log(filterList)
        if (filterList.includes(filter)) {
            const filterIndex = filterList.indexOf(filter);
            //console.log(filterIndex)
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
