import {useState} from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/course.css'

import {COURSE_QUERY} from '../queryData';
import {Inf_Course} from '../interfaces/Interfaces';

function IsPassed(grade: string): string{
    var Status: string = "";
    if(grade == 'F'){
        Status = 'black';
    }else{
        Status = 'green';
    }
    return Status;
}

function CourseItem(param: {key: any, props: Inf_Course, parentRefs: string[]}){

    var course: any;
    for(let i:number = 0; i < param.parentRefs.length; i++){
       if(param.parentRefs[i] == param.props.id){
           course = param.props.name;
           break;
        }
    }

    return (course) ? 
        <div className='accordion-course-item' style={{color: IsPassed(param.props.grade)}}>
            <div className="inline-course">
                <span>{param.props.course_number}&emsp;</span>
                <span>{course}</span>
            </div>
            <div className='inline-course'>
                <span>{param.props.grade}&emsp;&emsp;</span>
                <span>{param.props.credit}</span>
            </div>
        </div>
        :null;
}

export default function Course(param: {parentCLRefs: string[]}) {
    const {loading, error, data} = useQuery(COURSE_QUERY);

    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <div className='accordion-course'>
            {
                data.course.map((course: Inf_Course) => 
                   (<CourseItem key={course.id} props={course} parentRefs={param.parentCLRefs}></CourseItem>)
                )
            }
        </div>
    )
}

