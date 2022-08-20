
import {Fragment, useState}  from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/courseList.css';

import Course from './Course';
import {StudentData_QUERY} from '../queryGraphQL/queryData';
import {Inf_CourseList, Inf_Course} from '../interfaces/Interfaces';
import {ModeInf} from '../../pages/Student';


// function CourseListItem(param: {prop: Inf_CourseList, children: JSX.Element}) {
//     const [Toggle, setToggle] = useState(false);
//     const rotate = Toggle ? "rotate(90deg)":"rotate(0)";

//     // var group: string | any;
//     // for(let i:number = 0; i < param.refs.length; i++){
//     //    if(param.refs[i] === param.props.id){
//     //        group = param.props.name;
//     //        break;
//     //     }
//     // }

//     return  (
//         <>
//             <div className="accordion-courseList-item" onClick={() => setToggle(!Toggle)}>
//                 <div className="inline-courseList">
//                     <span>
//                         <i className="gg-play-button"
//                             style={{transform: rotate, transition: "all 0.2s linear"}}/>
//                     </span>
//                     &nbsp;&nbsp;
//                     <span>{param.prop.name}</span>
//                     </div>
//                         <span className='inline-courseList'>{param.prop.id}</span>
//                     </div>
//                 <div>
//                 {
//                     Toggle && param.children
//                 }
//             </div>
//         </>
//     )
// }

export default function CourseList(param: {prop: Inf_CourseList}) {
    // const {loading, error, data} = useQuery(COURSELISTNODE_QUERY);
    
    // if(loading) return <p>Loading...</p> ;
    // if(error) return <p>{error.message}</p>;

    return (
        <Fragment>
            <div className='accordion-courseList'>
                    {/* <CourseListItem key={param.prop.id} prop={param.prop}>
                        <>
                            {
                                param.prop.courses.map((course: Inf_Course) => (
                                    <Course prop={course}/>
                                    ))
                            }
                        </>
                    </CourseListItem>  */}
            </div>
        </Fragment>
    )
}

