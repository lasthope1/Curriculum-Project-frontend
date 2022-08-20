
import {useQuery} from '@apollo/client';
import '../../styles/course.css';

import {StudentData_QUERY} from '../queryGraphQL/queryData';
import {Inf_Course} from '../interfaces/Interfaces';
import {ModeInf} from '../../pages/Student';


// function IsPassed(grade: string): string{
//     if(grade === 'F' || grade === 'U'|| grade === ''){
//         return 'black';
//     }else if (grade === 'Processing'){
//         return 'orangered';
//     }else{
//         return 'green';
//     }
// }

// function CourseItem(param: {prop: Inf_Course}){
//     // var course: boolean = false;
//     // var Status: string = IsPassed(param.props.grade);
//     // var isDis: string = filterSub() ? '' : 'none'

//     // function filterSub(){
//     //     //console.log(`${param.modeSelected}`);
//     //     if(Status === 'green'){
//     //        return param.ModeSelected.modeSelected.includes('Completed');
//     //     }else if(Status === 'orangered'){
//     //        return param.ModeSelected.modeSelected.includes('InProcess');
//     //     }else if(Status === 'black'){
//     //        return param.ModeSelected.modeSelected.includes('Pending')
//     //     }
//     // }

//     // for(let i:number = 0; i < param.parentRefs.length; i++){
//     //    if(param.parentRefs[i] === param.props.id){
//     //        course = true;
//     //        break;
//     //     }
//     // }

//     return (
//         <div className='accordion-course-item' style={{display: "isDis"}}>
//             <div className="inline-course">
//                 <span>{param.prop.id}&emsp;</span>
//                 <span>{param.prop.name}</span>
//             </div>
//             {/* <div className='inline-course'>
//                 <span>{param.props.grade}&emsp;&emsp;</span>
//                 <span>{param.props.credit}</span>
//             </div> */}
//         </div>
//     )
// }

export default function Course(param: {prop: Inf_Course}) {
    // const {loading, error, data} = useQuery(COURSE_QUERY);

    // if(loading) return <p>Loading...</p> ;
    // if(error) return <p>{error.message}</p>;

    return (
        <div className='accordion-course'>
            {/* <CourseItem key={param.prop.id} prop={param.prop}/> */}
        </div>
    )
}

