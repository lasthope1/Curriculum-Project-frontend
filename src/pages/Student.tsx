import {useState, useEffect, createContext, Fragment} from 'react';
// import CatNode from '../components/Data/CatNode';
import Checkbox from '../components/Layout/Checkbox';
import NavigationBar from '../components/Layout/NavigationBar';
import styled from 'styled-components';

import SubDashboard from '../components/Layout/DashboardSub';
import TreeView from '../components/Layout/TreeView';


const ContainerFragment = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start; 

`
export interface ModeInf {
  modeSelected: string[]
}

const defaultState: ModeInf = {
  modeSelected: []      // Start Mode selected list by empty array []
}

export const ModeContext = createContext<ModeInf>(defaultState);

export default function Student(){
  const [Selected, setSelected] = useState(Array<string>('Completed', 'InProcess', 'Pending'));
  
  function checkboxCallback(modeSelected: string[]){
    setSelected([...modeSelected])
  }

  useEffect(() => {
    console.log(`Mode is selected = ${Selected}`)
  },[Selected]);

  return (
    <>
      <Checkbox Callback={(modeFilter:string[]) => checkboxCallback(modeFilter)}/>
      <ContainerFragment>
        <ModeContext.Provider value={{modeSelected: Selected}}>
          <TreeView/>
        </ModeContext.Provider>
        <SubDashboard/>
      </ContainerFragment>
      <NavigationBar/>
    </>
  )
}


