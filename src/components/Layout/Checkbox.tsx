
import {useState} from 'react';
import '../../styles/Checkbox.css';

const filterCheckbox: object = {
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
    activeFilter: []
}

function onFilterChange(filter: string){
    const {filterLists, activeFilter}: any = filterCheckbox;
    if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        filterCheckbox.setState({ activeFilter: newFilter });
      } else {
        filterCheckbox.assign({ activeFilter: [...activeFilter, filter] });
      }
}

function CompletedCheckbox(param: {Callback: (isChecked: boolean)=>void}) {
    const [checkCom, setCheckCom] = useState(true);

    function isCheckCom(){

        setCheckCom(!checkCom)

        if (!checkCom){
            param.Callback(true)
        }else{
            param.Callback(false)
        }
    }

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={checkCom} onChange={isCheckCom}/>
            <a className='Completed'>Completed</a>
        </label>
    )
}

function InprocessCheckbox(param: {Callback: (isChecked: boolean)=>void}){
    const [checkInP, setCheckInP] = useState(true);

    function isCheckCom(){
        setCheckInP(!checkInP)
        if (!checkInP){
            param.Callback(true)
        }else{
            param.Callback(false)
        }
    }

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={checkInP} onChange={isCheckCom}/> 
            <a className='In-process'>In process</a>
        </label>
    )
}

function PendingCheckbox(param: {Callback: (isChecked: boolean)=>void}){
    const [checkPend, setCheckPend] = useState(true);

    function isCheckPend(){
        setCheckPend(!checkPend)
        if (!checkPend){
            param.Callback(true)
        }else{
            param.Callback(false)
        }
    }

    return (
        <label className='Checkbox-item'>
            <input type='checkbox' checked={checkPend} onChange={isCheckPend}/> 
            <a className='Pending'>Pending</a>
        </label>
    )
}

export default function Checkbox(param: {Callback: (isChecked: boolean) => void}) {

  return (
    <>
        <div className='Checkbox'>
            <CompletedCheckbox Callback={param.Callback}/>
            <InprocessCheckbox Callback={param.Callback}/>
            <PendingCheckbox Callback={param.Callback}/>
        </div>
    </>
  );
}
