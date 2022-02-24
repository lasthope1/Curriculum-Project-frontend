
import {useQuery} from '@apollo/client';
import '../../styles/course.css';

import {COURSE_QUERY} from '../queryData';
import {Inf_Course} from '../interfaces/Interfaces';

function IsPassed(grade: string): string{
    if(grade === 'F' || grade === 'U'|| grade === ''){
        return 'black';
    }else if (grade === 'Processing'){
        return 'orangered';
    }else{
        return 'green';
    }
}

function CourseItem(param: {key: any, props: Inf_Course, parentRefs: string[], modeSelected: string[]}){
    var course: boolean = false;
    var Status: string = IsPassed(param.props.grade);
    var isDis: string = filterSub() ? '' : 'none'

    function filterSub(){
        console.log(`${param.modeSelected}`);
        if(Status === 'green'){
           return param.modeSelected.includes('Completed');
        }else if(Status === 'orangered'){
           return param.modeSelected.includes('InProcess');
        }else if(Status === 'black'){
           return param.modeSelected.includes('Pending')
        }
    }

    for(let i:number = 0; i < param.parentRefs.length; i++){
       if(param.parentRefs[i] === param.props.id){
           course = true;
           break;
        }
    }

    return (course) ? 
        <div className='accordion-course-item' style={{color: Status, display: isDis}}>
            <div className="inline-course">
                <span>{param.props.course_number}&emsp;</span>
                <span>{param.props.name}</span>
            </div>
            <div className='inline-course'>
                <span>{param.props.grade}&emsp;&emsp;</span>
                <span>{param.props.credit}</span>
            </div>
        </div>
        :null;
}

export default function Course(param: {parentCLRefs: string[], modeSelected: string[]}) {
    const {loading, error, data} = useQuery(COURSE_QUERY);

    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <div className='accordion-course'>
            {
                data.course.map((course: Inf_Course) => 
                   (<CourseItem key={course.id} props={course} parentRefs={param.parentCLRefs} 
                        modeSelected={param.modeSelected}/>)
                )
            }
        </div>
    )
}

