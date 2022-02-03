import React from 'react';
import CatNode from '../components/Data/CatNode';
import CourseList from '../components/Data/CourseList';
import Course from '../components/Data/Course';
import Checkbox from '../components/Layout/Checkbox'


export default function Student() {
  var Selected: string[][] = [];

  function checkboxCallback(modeSelected: boolean): void{
    let i: number = 0;
    while(modeSelected){
      Selected[i][1] = modeSelected;
      i++
    }
  }

  return (
    <>
      <Checkbox Callback={checkboxCallback}/>
      <CatNode parentRef={[]} Mode={}/>
    </>
  )
}

