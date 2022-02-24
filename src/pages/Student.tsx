import {useState} from 'react';
import CatNode from '../components/Data/CatNode';
import Checkbox from '../components/Layout/Checkbox';
import NavigationBar from '../components/Layout/NavigationBar';

export default function Student() {
  const [Selected, setSelected] = useState(['']); 
  var mode: string[] = ['Completed', 'InProcess', 'Pending'];
  
  function checkboxCallback(modeSelected: string[]): void{
    setSelected(modeSelected)
    //showMode(modeSelected)
  }

  // async function showMode(modeSelected: string[]){
  //   mode = await modeSelected
  // }
  
  return (
    <>
      <Checkbox Callback={checkboxCallback}/>
      <CatNode parentRef={[]} modeSelected={Selected}/>
      <NavigationBar/>
    </>
  )
}

