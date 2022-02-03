
import {Fragment, useState}  from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/courseList.css';

import Course from './Course';
import {COURSELISTNODE_QUERY} from '../queryData';
import {Inf_LeafNode} from '../interfaces/Interfaces';

function CourseListItem(param: {props: Inf_LeafNode, refs: string[], children: JSX.Element}) {
    const [Toggle, setToggle] = useState(false);
    const rotate = Toggle ? "rotate(90deg)":"rotate(0)";

    var group: any;
    for(let i:number = 0; i < param.refs.length; i++){
       if(param.refs[i] == param.props.id){
           group = param.props.name;
           break;
        }
    }

    return  ( group ?
        <>
            <div className="accordion-courseList-item" onClick={() => setToggle(!Toggle)}>
                <div className="inline-courseList">
                        <span>
                            <i className="gg-play-button"
                                style={{transform: rotate, transition: "all 0.2s linear"}}/>
                        </span>
                        &nbsp;&nbsp;
                        <span>{group}</span>
                    </div>
                    <span className='inline-courseList'>{param.props.id}</span>
                </div>
            <div>
                {Toggle && param.children}
            </div>
        </>
        :null
    );
}

export default function CourseList(param: {parentCatRefs: string[]}) {
    const {loading, error, data} = useQuery(COURSELISTNODE_QUERY);
    
    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <Fragment>
            <div className='accordion-courseList'>
                {
                    data.courseListNode.map((node : Inf_LeafNode) => (
                        <CourseListItem key={node.id} props={node} refs={param.parentCatRefs}>
                            <Course parentCLRefs={node.courses}/>
                        </CourseListItem> 
                    ))
                }
            </div>
        </Fragment>
    )
}

