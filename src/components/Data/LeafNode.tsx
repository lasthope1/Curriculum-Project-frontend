
import {Fragment, useState}  from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/leafNode.css';

import Course from './Course';
import {LEAFNODE_QUERY} from '../queryData';
import {Inf_LeafNode} from '../interfaces/Interfaces';

import Dropdown_btn from '../Layout/DropdownData';

function LeafNodeItem(param: {props: Inf_LeafNode, children: JSX.Element}) {
    const [Toggle, setToggle] = useState(false);

    return (
        <div className="leafNode">
            <div className="row-leafNode">
                <span className="inline-leafNode">
                    <Dropdown_btn onChange={Toggle}>{param.children}</Dropdown_btn>
                </span>
                <a className="inline-leafNode">
                    {param.props.name}
                </a>
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

