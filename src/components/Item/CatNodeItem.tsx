import React from 'react';

interface CatNode{
    id: string 
    name: string 
    credits: number
}

export default function CatNodeItem(param: {props:CatNode}) {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>ID : {param.props.id}</h4>
                    <h4>Name : {param.props.name}</h4>
                    <h4>Course : {param.props.credits}</h4>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-secondary"> Details </button>
                </div>
                <p>------------------------------------------------------</p>
            </div>
        </div>
    )
}
