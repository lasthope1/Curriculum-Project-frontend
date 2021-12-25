//import React, { Component } from 'react';
import {LeafNode} from '../interfaces/Interfaces';

export default function FormItem (param : {props:LeafNode}) {
    console.log(param)
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>ID : {param.props.id}</h4>
                    <h4>Name : {param.props.name}</h4>
                    <h4>Course : {param.props.course}</h4>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-secondary"> Details </button>
                </div>
                <p>------------------------------------------------------</p>
            </div>
        </div>
    )
}

