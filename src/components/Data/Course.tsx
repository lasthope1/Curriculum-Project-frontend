import {Fragment} from 'react';
import {useQuery} from '@apollo/client';

import {COURSE_QUERY} from '../queryData';
import {Inf_Course} from '../interfaces/Interfaces';

function CourseItem(param: {key: any, props: Inf_Course}) {

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>Name : {param.props.name}</h4>
                    <h4>Course_number : {param.props.course_number}</h4>
                </div>
            </div>
        </div>
    )
}

export default function Course() {
    const {loading, error, data} = useQuery(COURSE_QUERY);

    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <div>
            {
                data.course.map((course: Inf_Course) => 
                   (<CourseItem key={course.id} props={course}></CourseItem>)
                )
            }
        </div>
    )
}


