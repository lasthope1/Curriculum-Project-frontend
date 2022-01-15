
import {Fragment}  from 'react';
import {useQuery} from '@apollo/client';

import Course from './Course';
import {LEAFNODE_QUERY} from '../queryData';
import {Inf_LeafNode} from '../interfaces/Interfaces';

import Dropdown_btn from '../Layout/DropdownData';

function LeafNodeItem(param: {props: Inf_LeafNode, children: JSX.Element}) {
    return (
        <div className="leafNode">
            <div className="row">
                <div >
                    <h4>Name : {param.props.name}</h4>
                </div>
                <div className="dropdown-btn">
                    <Dropdown_btn>{param.children}</Dropdown_btn>
                </div>
            </div>
        </div>
    )
}

export default function LeafNode() {
    const {loading, error, data} = useQuery(LEAFNODE_QUERY);
    
    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <Fragment>
            {
                data.leafNode.map((node : Inf_LeafNode) => (
                    <LeafNodeItem key={node.id} props={node}>{<Course/>}</LeafNodeItem> 
                ))
            }
        </Fragment>
    )
}

